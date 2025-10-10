import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TerminalSession } from '../models/TerminalSession';

interface SessionState {
  sessions: TerminalSession[];
  activeSessionId: string | null;
}

const initialState: SessionState = {
  sessions: [],
  activeSessionId: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSessions: (state, action: PayloadAction<TerminalSession[]>) => {
      state.sessions = action.payload;
    },
    addSession: (state, action: PayloadAction<TerminalSession>) => {
      state.sessions.push(action.payload);
    },
    updateSession: (state, action: PayloadAction<TerminalSession>) => {
      const index = state.sessions.findIndex(s => s.id === action.payload.id);
      if (index >= 0) {
        state.sessions[index] = action.payload;
      }
    },
    removeSession: (state, action: PayloadAction<string>) => {
      state.sessions = state.sessions.filter(s => s.id !== action.payload);
    },
    setActiveSession: (state, action: PayloadAction<string | null>) => {
      state.activeSessionId = action.payload;
    },
  },
});

export const { setSessions, addSession, updateSession, removeSession, setActiveSession } = sessionSlice.actions;
export default sessionSlice.reducer;