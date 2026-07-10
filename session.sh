#!/bin/bash

SESSION="etRipper"
BASE_DIR="$(cd "$(dirname "$0")" && pwd)"

tmux kill-session -t "$SESSION" 2>/dev/null

# editor window (shell first, then start nvim)
tmux new-session -d -s "$SESSION" -n "editor" -c "$BASE_DIR"
tmux send-keys -t "$SESSION:editor" "nvim" C-m

# shell window
tmux new-window -t "$SESSION" -n "shell" -c "$BASE_DIR"
tmux send-keys -t "$SESSION:shell" "clear" C-m
tmux split-window -h -t "$SESSION:shell" -p 50 -c "$BASE_DIR"
tmux send-keys -t "$SESSION:shell.2" "clear" C-m

# lazygit window
tmux new-window -t "$SESSION" -n "lazygit" -c "$BASE_DIR"
tmux send-keys -t "$SESSION:lazygit" "lazygit" C-m

# spf window
tmux new-window -t "$SESSION" -n "superfile" -c "$BASE_DIR"
tmux send-keys -t "$SESSION:superfile" "spf" C-m

# devServer 
tmux new-window -t "$SESSION" -n "dev_server" -c "$BASE_DIR"
tmux send-keys -t "$SESSION:dev_server" "clear && npm run dev" C-m

tmux select-window -t "$SESSION:editor"
tmux attach-session -t "$SESSION"
