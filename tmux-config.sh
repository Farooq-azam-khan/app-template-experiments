#!/bin/bash

# Define the tmux session name
SESSION_NAME="project-name"

# Check if the session already exists
if tmux has-session -t $SESSION_NAME 2>/dev/null; then
  echo "Session $SESSION_NAME already exists. Attaching..."
  tmux attach-session -t $SESSION_NAME
  exit 0
fi

# Create a new tmux session and start in the first window for git commands
tmux new-session -d -s $SESSION_NAME -n "git"

# Create the second window for running servers
tmux new-window -t $SESSION_NAME -n "servers"

# Split the second window horizontally
tmux split-window -h -t $SESSION_NAME:2

# Run pnpm dev in the left split of the second window
tmux send-keys -t $SESSION_NAME:2.1 "pnpm dev" C-m

# Attach to the newly created session
tmux attach-session -t $SESSION_NAME
