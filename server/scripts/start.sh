#!/bin/bash

# Server startup script for mobile terminal app
# Starts ttyd with tmux session

SESSION_NAME="mobile-terminal"
PORT=7681

# Create tmux session if not exists
tmux has-session -t $SESSION_NAME 2>/dev/null
if [ $? != 0 ]; then
  tmux new-session -d -s $SESSION_NAME
fi

# Start ttyd
ttyd -p $PORT tmux attach -t $SESSION_NAME &

echo "Server started on port $PORT"
echo "QR Code for connection:"
qrencode -t ansi "ws://localhost:$PORT"

# Log startup
echo "$(date): Server started" >> server/logs/startup.log