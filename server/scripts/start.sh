#!/bin/bash

# Server startup script for mobile terminal app
# Starts ttyd with tmux session

SESSION_NAME="mobile-terminal"
PORT=7681

# Create tmux session if not exists
tmux has-session -t $SESSION_NAME 2>/dev/null
if [ $? != 0 ]; then
  echo "$(date): Creating new tmux session $SESSION_NAME" >> server/logs/startup.log
  tmux new-session -d -s $SESSION_NAME
else
  echo "$(date): Using existing tmux session $SESSION_NAME" >> server/logs/startup.log
fi

# Start ttyd
echo "$(date): Starting ttyd on port $PORT" >> server/logs/startup.log
ttyd -p $PORT tmux attach -t $SESSION_NAME &
TTYD_PID=$!

echo "Server started on port $PORT"
echo "QR Code for connection:"
qrencode -t ansi "ws://localhost:$PORT"

# Log startup
echo "$(date): Server started with ttyd PID $TTYD_PID" >> server/logs/startup.log