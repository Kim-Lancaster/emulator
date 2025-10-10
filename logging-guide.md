### OpenCode.ai Logging Workflow Guide

**Purpose:** This guide ensures consistent, detailed logging of all actions during app development. Logs track successes/failures, tie to commit hashes for rollbacks, and provide context for future sessions or chat compression.

**Key Expectations:**
- **Aggressive Logging:** Log after every attempt/change (e.g., library add, code tweak). Use format: Timestamp | Commit Hash | Action | Details | Outcome | Notes | Context | Dependencies | Issues | Failures | Next Steps.
- **Commit Integration:** Commit changes first, then update log with the hash (use `git log --oneline -1` post-commit).
- **Session Summaries:** End each session with a summary for OpenCode.ai: Current state, completed tasks, pending items, conventions, and next steps.
- **File Location:** Maintain `development-log.md` in repo root. Reference it at session start for context.
- **Failure Tracking:** Use "Failures" column to log incompatible dependencies, failed attempts, root causes, and lessons learned to avoid repeating mistakes.

**Workflow Steps:**
1. **Start Session:** Read `development-log.md` to understand prior work and current state.
2. **Make Changes:** Attempt tasks (e.g., modify code, add features).
3. **Log Immediately:** After each attempt, append to `development-log.md` with outcome (Success/Failure) and notes.
4. **Commit:** Stage changes, commit (exclude log if not ready), get hash, update log.
5. **End Session:** Add summary section for OpenCode.ai continuity.

**Example Entry:**
- 2025-10-06 14:30 | abc1234 | Setup project structure | Created directories for server CLI and Flutter app | Success | Initial setup complete | Starting from empty repo | Git, Flutter SDK | None | None | Begin server CLI development.

**Tips:** Keep entries concise (1-2 lines); include rationale for failures in "Failures" column; use Git tags for milestones. If chat compresses, logs preserve full history.
