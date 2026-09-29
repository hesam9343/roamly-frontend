import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

const API = "http://localhost:3000";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadUser() {
    setLoading(true);

    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 3000);

    try {
      console.log("AUTH: checking session...");

      const response = await fetch(
        `${API}/api/auth/me`,
        {
          method: "GET",
          credentials: "include",
          signal: controller.signal,
        }
      );

      console.log("AUTH: /api/auth/me status:", response.status);

      let data = null;

      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        console.log("AUTH: not logged in");
        setUser(null);
        return;
      }

      console.log("AUTH: user:", data?.user);

      setUser(data?.user || null);
    } catch (error) {
      console.log(
        "AUTH: backend unavailable, continuing as guest.",
        error
      );

      setUser(null);
    } finally {
      clearTimeout(timeout);
      setLoading(false);

      console.log("AUTH: loading finished");
    }
  }

  function setLoggedInUser(userData) {
    console.log("AUTH: setting logged-in user:", userData);

    setUser(userData || null);
    setLoading(false);
  }

  async function logout() {
    try {
      await fetch(
        `${API}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
    } catch (error) {
      console.log(
        "AUTH: logout skipped because backend is unavailable.",
        error
      );
    } finally {
      setUser(null);
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loadUser,
        setLoggedInUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
