#!/bin/bash

# Server startup script for mobile terminal app
# Starts ttyd with tmux session

PORT=3000

# Start ttyd with bash over HTTP (temporarily disabled TLS for testing)
echo "$(date): Starting ttyd on port $PORT with bash over HTTP" >> ../logs/startup.log
ttyd -i wlp59s0 -p $PORT bash &
TTYD_PID=$!

echo "Server started on port $PORT"
echo "Connect to: http://10.222.3.71:$PORT"
# QR code generation requires qrencode (not installed)
# qrencode -t ansi "http://10.222.3.71:$PORT"

# Log startup
echo "$(date): Server started with ttyd PID $!" >> ../logs/startup.log