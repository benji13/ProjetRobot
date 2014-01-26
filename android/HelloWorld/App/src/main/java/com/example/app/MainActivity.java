package com.example.app;

import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.widget.TextView;

import com.koushikdutta.async.http.AsyncHttpClient;
import com.koushikdutta.async.http.socketio.Acknowledge;
import com.koushikdutta.async.http.socketio.SocketIOClient;

import java.util.concurrent.ExecutionException;


public class MainActivity extends ActionBarActivity implements SensorEventListener {

    private SensorManager sensorManager;

    SocketIOClient client = null;

    TextView xCoor; // declare X axis object
    TextView yCoor; // declare Y axis object

    int previousX;
    int previousY;

    @Override
    public void onCreate(Bundle savedInstanceState){

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        previousX = 0;
        previousY = 0;

        xCoor=(TextView)findViewById(R.id.xcoor); // create X axis object
        yCoor=(TextView)findViewById(R.id.ycoor); // create Y axis object

        sensorManager=(SensorManager)getSystemService(SENSOR_SERVICE);
        // add listener. The listener will be HelloAndroid (this) class
        sensorManager.registerListener(this,
                sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER),
                SensorManager.SENSOR_DELAY_NORMAL);

        try {
            client = SocketIOClient.connect(AsyncHttpClient.getDefaultInstance(), "http://192.168.100.100 q:8080/", null).get();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }

		/*	More sensor speeds (taken from api docs)
		    SENSOR_DELAY_FASTEST get sensor data as fast as possible
		    SENSOR_DELAY_GAME	rate suitable for games
		 	SENSOR_DELAY_NORMAL	rate (default) suitable for screen orientation changes
		*/
    }

    public void onAccuracyChanged(Sensor sensor,int accuracy){

    }

    public void onSensorChanged(SensorEvent event){

        // check sensor type
        if(event.sensor.getType()==Sensor.TYPE_ACCELEROMETER){

            // assign directions
            int x= (int) event.values[0];
            int y= (int) event.values[1];

            xCoor.setText("X: "+x);
            yCoor.setText("Y: "+y);


            if(previousX != x || previousY != y){
                client.emit("{\"type\": \"control\",\"direction\": \"F\",\"speed\": " + x +",\"turn\": " + y + "}", (Acknowledge) null);
            }
        }
    }

}





