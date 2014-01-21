#!/bin/bash
python -c "import Adafruit_BBIO.UART as UART; UART.setup(\"UART1\")"
node /home/root/src/app.js
