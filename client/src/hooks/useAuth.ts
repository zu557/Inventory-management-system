"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    axios.get("/api/auth/me", { headers: { Authorization: `Bearer ${token}` }})
      .then(r => setUser(r.data.user))
      .catch(() => {
        localStorage.removeItem("token");
      })
      .finally(() => setLoading(false));
  }, []);

  return { user, loading, setUser };
}
