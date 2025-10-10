#!/bin/bash

# Server startup script for mobile terminal app
# Starts ttyd with tmux session

SESSION_NAME="mobile-terminal"
PORT=7683

# Create tmux session if not exists
tmux has-session -t $SESSION_NAME 2>/dev/null
if [ $? != 0 ]; then
  echo "$(date): Creating new tmux session $SESSION_NAME" >> ../logs/startup.log
  tmux new-session -d -s $SESSION_NAME
else
  echo "$(date): Using existing tmux session $SESSION_NAME" >> ../logs/startup.log
fi

# Start ttyd
echo "$(date): Starting ttyd on port $PORT" >> ../logs/startup.log
ttyd -p $PORT tmux attach -t $SESSION_NAME &
TTYD_PID=$!

echo "Server started on port $PORT"
echo "Connect to: ws://localhost:$PORT"
# QR code generation requires qrencode (not installed)
# qrencode -t ansi "ws://localhost:$PORT"

# Log startup
echo "$(date): Server started with ttyd PID $TTYD_PID" >> ../logs/startup.log