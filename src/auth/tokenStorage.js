const TOKEN_KEY = "admin_token";

export const tokenStorage = {
  get() {
    return (
      localStorage.getItem(TOKEN_KEY) ||
      sessionStorage.getItem(TOKEN_KEY)
    );
  },

  save(token, remember = false) {
    this.clear();

    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(TOKEN_KEY, token);
  },

  clear() {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
  },
};
