#!/bin/bash

# Server startup script for mobile terminal app
# Starts ttyd with tmux session

PORT=8083

# Start ttyd with bash over HTTPS (TLS enabled for security)
CERT_PATH="/home/kimdev/Documents/emulator/localhost+1.pem"
KEY_PATH="/home/kimdev/Documents/emulator/localhost+1-key.pem"
echo "$(date): Starting ttyd on port $PORT with bash over HTTPS" >> ../logs/startup.log
ttyd -S -C $CERT_PATH -K $KEY_PATH -i 0.0.0.0 -p $PORT bash &
TTYD_PID=$!

echo "Server started on port $PORT"
echo "Connect to: https://10.222.3.71:$PORT"
# QR code generation requires qrencode (not installed)
# qrencode -t ansi "http://10.222.3.71:$PORT"

# Log startup
echo "$(date): Server started with ttyd PID $!" >> ../logs/startup.log