#!/bin/sh
# SessionStart hook: if the current folder is a Teach Me Claude workspace,
# surface the learner's progress so the companion can greet them in context.
# Outside a workspace this prints nothing and costs nothing.

if [ -f ".teach-me/progress.json" ]; then
  echo "<teach-me-claude>"
  echo "This folder is the user's Teach Me Claude workspace. You are their learning companion."
  echo "Current progress (.teach-me/progress.json):"
  cat ".teach-me/progress.json"
  echo ""
  echo "Greet them by name, mention where they left off, and offer to continue."
  echo "Follow the companion contract in the teach-me-claude plugin CLAUDE.md."
  echo "The /teach-me-claude:teach-me skill resumes the journey."
  echo "</teach-me-claude>"
fi
