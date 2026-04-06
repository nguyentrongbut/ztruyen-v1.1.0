'use client'

// ** Reeact
import { useEffect, useState } from "react";

// ** Lib
import { getAccessToken } from "@/lib/localStorage";

export const AUTH_CHANGE_EVENT = 'auth-change'

export const useAuth = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkAuth = () => {
        const token = getAccessToken();
        setIsLogin(!!token);
        setLoading(false);
    }

    useEffect(() => {
        checkAuth();

        // Listener when login/logout trigger event
        window.addEventListener(AUTH_CHANGE_EVENT, checkAuth);
        return () => window.removeEventListener(AUTH_CHANGE_EVENT, checkAuth);
    }, []);

    return { isLogin, loading };
};