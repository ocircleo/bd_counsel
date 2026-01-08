"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { APP_CONFIG } from "@/config/app.config";

export const AuthContext = createContext(null);
export const AuthActionContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true);
      const req = await fetch(APP_CONFIG.apiUrl + "/authv2/userInfo", {
        method: "GET",
        credentials: "include",
      });
      const res = await req.json();
      if (res.success) setUser(res?.data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }, []);
  const logOut = useCallback(async () => {
    try {
      setLoading(true);
      const req = await fetch(APP_CONFIG.apiUrl + "/authv2/logout", {
        method: "GET",
        credentials: "include",
      });
      const res = await req.json();
      if (res.success) setUser(null);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const data = useMemo(() => ({ user, loading }), [user, loading]);
  const actions = { setUser, fetchUserData, logOut };

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <AuthContext.Provider value={data}>
      <AuthActionContext value={actions}>{children}</AuthActionContext>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
