import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { authService } from "../services/authService";
import { tokenStorage } from "./tokenStorage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const clearSession = useCallback(() => {
    tokenStorage.clear();
    setAdmin(null);
  }, []);

  useEffect(() => {
    let active = true;

    const restoreSession = async () => {
      if (!tokenStorage.get()) {
        if (active) {
          setInitializing(false);
        }

        return;
      }

      try {
        const authenticatedAdmin = await authService.me();

        if (!authenticatedAdmin) {
          throw new Error("The authenticated admin response is invalid.");
        }

        if (active) {
          setAdmin(authenticatedAdmin);
        }
      } catch {
        tokenStorage.clear();

        if (active) {
          setAdmin(null);
        }
      } finally {
        if (active) {
          setInitializing(false);
        }
      }
    };

    restoreSession();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    window.addEventListener("auth:unauthorized", clearSession);

    return () => {
      window.removeEventListener("auth:unauthorized", clearSession);
    };
  }, [clearSession]);

  const login = useCallback(async (credentials, remember = false) => {
    const result = await authService.login(credentials);

    if (!result?.token || !result?.admin) {
      throw new Error("The login response did not contain a token and admin.");
    }

    tokenStorage.save(result.token, remember);
    setAdmin(result.admin);

    return result.admin;
  }, []);

  const logout = useCallback(async () => {
    try {
      if (tokenStorage.get()) {
        await authService.logout();
      }
    } finally {
      clearSession();
    }
  }, [clearSession]);

  const changePassword = useCallback(
    async (payload) => {
      const result = await authService.changePassword(payload);

      // The backend revokes every token after a successful password change.
      clearSession();

      return result;
    },
    [clearSession]
  );

  const value = useMemo(
    () => ({
      admin,
      initializing,
      isAuthenticated: Boolean(admin),
      login,
      logout,
      changePassword,
      clearSession,
    }),
    [admin, initializing, login, logout, changePassword, clearSession]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
};
