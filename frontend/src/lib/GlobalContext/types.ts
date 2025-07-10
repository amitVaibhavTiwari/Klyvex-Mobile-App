export type InitialStateType = {
  theme: ThemeMode;
};

export type ThemeMode = 'light' | 'dark' | 'system';

export type ThemeAction = {
  type: 'SET_THEME';
  payload: ThemeMode;
};
