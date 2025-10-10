# Tasks: A Cross-Platform Mobile Application

**Input**: Design documents from `/specs/001-mobile-terminal-access/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Tests are optional and not requested in the spec, so none generated.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions
- Mobile: `mobile/src/`, `mobile/tests/`
- Server: `server/scripts/`, `server/config/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create mobile project structure per implementation plan
- [ ] T002 [P] Create server scripts directory and config files
- [ ] T003 Initialize React Native project with Expo CLI
- [ ] T004 [P] Install mobile dependencies (React Native, webview, navigation, etc.)
- [ ] T005 [P] Install server dependencies (ttyd, tmux, qrencode, mkcert)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T006 Set up AsyncStorage for app data persistence
- [ ] T007 Configure Redux Toolkit store for state management
- [ ] T008 Create base terminal session entity in mobile/src/models/
- [ ] T009 Set up WebSocket connection service in mobile/src/services/
- [ ] T010 Create server startup script with ttyd and tmux integration
- [ ] T011 [P] Add logging to connection service per Logging-Driven principle

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Connect to Host Terminal (Priority: P1) 🎯 MVP

**Goal**: Enable users to establish connections to host terminals

**Independent Test**: Can be tested by verifying connection establishment and basic status display

### Implementation for User Story 1

- [ ] T011 [US1] Create connection screen in mobile/src/screens/ConnectionScreen.js
- [ ] T012 [US1] Implement QR scanner component using react-native-vision-camera in mobile/src/components/QRScanner.js
- [ ] T013 [US1] Add mDNS discovery service in mobile/src/services/DiscoveryService.js
- [ ] T014 [US1] Create host machine model in mobile/src/models/HostMachine.js
- [ ] T015 [US1] Implement connection logic in mobile/src/services/ConnectionService.js
- [ ] T016 [US1] Add TLS certificate handling for secure connections

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Run Commands and View Output (Priority: P1)

**Goal**: Allow command execution and output display

**Independent Test**: Can be tested by running commands and verifying output rendering

### Implementation for User Story 2

- [ ] T017 [US2] Create terminal screen in mobile/src/screens/TerminalScreen.js
- [ ] T018 [US2] Implement webview component for ttyd embedding in mobile/src/components/TerminalWebView.js
- [ ] T019 [US2] Add command input handling in mobile/src/services/TerminalService.js
- [ ] T020 [US2] Implement ANSI output rendering in mobile/src/utils/AnsiRenderer.js

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Maintain Persistent Sessions (Priority: P1)

**Goal**: Ensure sessions persist across app closures

**Independent Test**: Can be tested by closing/reopening app and checking session restoration

### Implementation for User Story 3

- [ ] T021 [US3] Add session persistence logic in mobile/src/services/SessionService.js
- [ ] T022 [US3] Implement reconnection with backoff in mobile/src/utils/ReconnectionHandler.js
- [ ] T023 [US3] Create session state management in mobile/src/store/sessionSlice.js
- [ ] T024 [US3] Update server script to handle tmux session persistence

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently

---

## Phase 6: User Story 4 - Use Virtual Keyboard Controls (Priority: P2)

**Goal**: Provide virtual keys for terminal operations

**Independent Test**: Can be tested by tapping virtual keys and verifying input

### Implementation for User Story 4

- [ ] T025 [US4] Create virtual keyboard overlay in mobile/src/components/VirtualKeyboard.js
- [ ] T026 [US4] Implement key mapping for Esc, Ctrl+C, Tab, arrows in mobile/src/utils/KeyMapper.js
- [ ] T027 [US4] Add keyboard UI controls in mobile/src/screens/TerminalScreen.js

**Checkpoint**: At this point, User Stories 1-4 should work independently

---

## Phase 7: User Story 5 - Scroll Through Terminal History (Priority: P2)

**Goal**: Enable scrolling through terminal output

**Independent Test**: Can be tested by generating output and scrolling

### Implementation for User Story 5

- [ ] T028 [US5] Add scroll handling to webview in mobile/src/components/TerminalWebView.js
- [ ] T029 [US5] Implement history buffer management in mobile/src/services/TerminalService.js

**Checkpoint**: All user stories should now be independently functional

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T030 [P] Add error handling and user feedback across screens
- [ ] T031 Code cleanup and ESLint fixes
- [ ] T032 [P] Performance optimization for large outputs
- [ ] T033 Security hardening (certificate pinning, input validation)
- [ ] T034 Update quickstart.md with final setup instructions
- [ ] T035 Test cross-platform compatibility on iOS and Android

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P1 → P1 → P2 → P2)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Depends on US1 for connection
- **User Story 3 (P1)**: Can start after Foundational (Phase 2) - Depends on US1 for connection
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - Depends on US2 for terminal screen
- **User Story 5 (P2)**: Can start after Foundational (Phase 2) - Depends on US2 for terminal screen

### Within Each User Story

- Models before services
- Services before screens/components
- Core implementation before integration

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Different user stories can be worked on in parallel by different team members

---

## Implementation Strategy

### MVP First (User Stories 1-3 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. Complete Phase 4: User Story 2
5. Complete Phase 5: User Story 3
6. **STOP and VALIDATE**: Test User Stories 1-3 independently
7. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (Basic connection)
3. Add User Story 2 → Test independently → Deploy/Demo (Command execution)
4. Add User Story 3 → Test independently → Deploy/Demo (Session persistence)
5. Add User Story 4 → Test independently → Deploy/Demo (Virtual keys)
6. Add User Story 5 → Test independently → Deploy/Demo (Scrolling)
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Connection)
   - Developer B: User Story 2 (Commands) + User Story 4 (Keys)
   - Developer C: User Story 3 (Persistence) + User Story 5 (Scrolling)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence