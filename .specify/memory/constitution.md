<!--
Sync Impact Report:
- Version change: N/A → 1.0.0
- List of modified principles: N/A (all new)
- Added sections: Core Principles (5), Additional Constraints, Development Workflow, Governance
- Removed sections: N/A
- Templates requiring updates: plan-template.md (Constitution Check alignment - ✅ updated), spec-template.md (requirements alignment - ✅ updated), tasks-template.md (task categorization - ✅ updated), agent-file-template.md (no changes needed - ✅ updated)
- Follow-up TODOs: None
-->

# Mobile Terminal App Constitution

## Core Principles

### I. Tool-First Design
Every component starts with tool selection and documentation in tools-decided.md; Tools must align with project goals, be well-documented, and avoid unnecessary complexity.

### II. Logging-Driven Development
All development actions are logged aggressively in development-log.md; Logs track successes/failures to prevent repetition.

### III. Test-First Implementation
TDD mandatory: Tests written → Approved → Fail → Implement; Red-Green-Refactor cycle enforced for reliability.

### IV. Integration and Compatibility Testing
Focus on testing tool integrations (e.g., React Native + ttyd, tmux persistence); Ensure cross-platform compatibility and security.

### V. Simplicity and Observability
Start simple, follow YAGNI; Use structured logging and clear error handling for debuggability.

## Additional Constraints
Technology stack: Stick to tools-decided.md; No unapproved libraries. Security: TLS for connections, no hardcoded secrets. Performance: Optimize for mobile and remote use.

## Development Workflow
Follow logging-guide.md for all logging. Commit changes with descriptive messages; Update development-log.md post-commit. Review against constitution before merges.

## Governance
Constitution supersedes all practices; Amendments require documentation and approval. After each chat compression, reference logging-guide.md and development-log.md for continuity. Use development-log.md for runtime guidance; Complexity must be justified.

**Version**: 1.0.0 | **Ratified**: 2025-10-09 | **Last Amended**: 2025-10-09