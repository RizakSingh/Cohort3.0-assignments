import { createContext, useContext, useEffect, useState } from "react";

const USERS_KEY = "havn_users";
const SESSION_KEY = "havn_session";

const AuthContext = createContext(null);

function readUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function readSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readSession());
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    else localStorage.removeItem(SESSION_KEY);
  }, [user]);

  function register(name, email, password) {
    setAuthError("");
    const users = readUsers();
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      setAuthError("An account with that email already exists.");
      return false;
    }
    const newUser = { name: name.trim(), email: email.trim().toLowerCase(), password };
    writeUsers([...users, newUser]);
    setUser({ name: newUser.name, email: newUser.email });
    return true;
  }

  function login(email, password) {
    setAuthError("");
    const users = readUsers();
    const match = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );
    if (!match) {
      setAuthError("Email or password is incorrect.");
      return false;
    }
    setUser({ name: match.name, email: match.email });
    return true;
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, authError, register, login, logout, setAuthError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
