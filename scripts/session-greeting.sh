#!/bin/sh
# SessionStart hook: if the current folder is a Learn to Claude workspace,
# surface the learner's progress so the companion can greet them in context.
# Outside a workspace this prints nothing and costs nothing.

if [ -f ".learn/progress.json" ]; then
  echo "<learn-to-claude>"
  echo "This folder is the user's Learn to Claude workspace. You are their learning companion."
  echo "Current progress (.learn/progress.json):"
  cat ".learn/progress.json"
  echo ""
  echo "Greet them by name, mention where they left off, and offer to continue."
  echo "Follow the companion contract in the learn-to-claude plugin CLAUDE.md."
  echo "The /learn-to-claude:learn skill resumes the journey."
  echo "</learn-to-claude>"
fi
