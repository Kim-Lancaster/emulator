# Troubleshooting Plan for ERR_CONNECTION_REFUSED

Based on analysis, the core issue is the ttyd server failing to bind to ports (e.g., 3000) with errno 98 (EADDRINUSE, "address in use"), despite `ss -tlnp` showing no active listener. This suggests a port conflict from exited processes, system services, or Gradle/Java daemons holding sockets in TIME_WAIT or similar states. The device is on the same network (user confirmed), and SSL works but self-signed certs aren't trusted by Android WebView despite CA installation. Switching to HTTP isolates the SSL trust issue.

## Step 1: Kill Java/Gradle Processes
- **Action**: Run `pkill java` to terminate all Java processes, including Gradle daemons that may be reserving ports dynamically.
- **Explanation**: Gradle (used for Android builds) often binds to random high ports for communication. Killing these frees potential conflicts without affecting the system. This is safe as daemons restart on demand.
- **Expected Outcome**: Ports become available if held by Java.

## Step 2: Retry Server Start
- **Action**: Run `./server/scripts/start.sh` (which now uses HTTP on port 3000 without -i).
- **Explanation**: Tests if killing Java resolved the binding error. The script starts ttyd in background; success means "Listening on port: 3000" in output.
- **Expected Outcome**: Server starts successfully, accessible via `curl http://10.222.3.71:3000` from host.

## Step 3: Inspect Port Usage (If Step 2 Fails)
- **Action**: Run `lsof -i :3000` to list processes using the port.
- **Explanation**: `lsof` shows detailed port usage (e.g., process name, PID), unlike `ss` which only shows active listeners. If a process is found, note its PID for killing.
- **Expected Outcome**: Identifies the conflicting process (e.g., a zombie Java daemon).

## Step 4: Kill Conflicting Process (If Found in Step 3)
- **Action**: Run `kill <PID>` for the identified process.
- **Explanation**: Terminates the specific process holding the port, freeing it for ttyd.
- **Expected Outcome**: Port available for binding.

## Step 5: Change Port if Binding Still Fails
- **Action**: Edit start.sh to use port 9999; update app files (ConnectionScreen.tsx, TerminalScreen.tsx) to use :9999.
- **Explanation**: Avoids potential system-reserved ports around 3000-8080. 9999 is arbitrary but high and unlikely reserved.
- **Expected Outcome**: Bypasses port conflict if specific to 3000.

## Step 6: Rebuild and Install APK
- **Action**: Run `npx expo run:android --device` to build and install the updated APK with HTTP URLs.
- **Explanation**: Applies the port/URL changes to the app for testing. Uses local build to avoid EAS queues.
- **Expected Outcome**: APK installed on device with HTTP config.

## Step 7: Test Connection on Device
- **Action**: Launch app, connect to 10.222.3.71:3000 (or 9999), check WebView for terminal load.
- **Explanation**: Verifies HTTP works without SSL. If succeeds, SSL trust was the blocker. If ERR_CONNECTION_REFUSED persists, network issue despite same Wi-Fi.
- **Expected Outcome**: Terminal loads, confirming server/app connectivity.

## Step 8: Diagnose Network (If Step 7 Fails)
- **Action**: User pings 10.222.3.71 from device; check device Wi-Fi settings.
- **Explanation**: Ensures device reaches host IP. Ping failure indicates network misconfig (e.g., wrong subnet).
- **Expected Outcome**: Ping works, isolating to app/server.

## Step 9: Revert to SSL (If HTTP Succeeds)
- **Action**: Re-enable SSL in start.sh and app, reinstall CA if needed.
- **Explanation**: Confirms SSL works once HTTP proves connectivity. If SSL fails again, root device for system CA install.
- **Expected Outcome**: Secure connection established.

These steps systematically isolate the binding issue (likely Java/Gradle) before testing connectivity. Each builds on the last; if binding succeeds early, skip to rebuild/test. Total time: 10-15 minutes. No risks to system stability.