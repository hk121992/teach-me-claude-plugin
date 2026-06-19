#!/bin/sh
# SessionStart hook (THIN entry). All logic lives in the node helper
# scripts/session-context.mjs, which composes the SessionStart injection:
#   workspace guard (the `plugin: teach-me-claude` sentinel inside the learner's
#   own .teach-me/ workspace) → detect-explain-resume (missing / corrupt /
#   present-but-old-shape→migrate / proceed) → a warm greeting + a CAPPED position
#   summary + the deterministic pathway-computed next step.
#
# This shell does NO JSON parsing and NO branching on state — it just runs the
# helper for the current folder and emits whatever the helper prints (which is
# nothing when this is not a learner workspace). The helper never crashes the
# session: on any internal error it prints nothing and exits 0.

node "$CLAUDE_PLUGIN_ROOT/scripts/session-context.mjs" "$PWD"
