export const isLoggedIn = (state) => (): boolean => {
  return !!state.user.id;
};

export const getDisplayName = (state) => (): string => {
  return state.user.email || '';
};

export default { isLoggedIn, getDisplayName };
