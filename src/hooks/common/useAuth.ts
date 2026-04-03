'use client'

import { useEffect, useState } from "react";
import { getAccessToken } from "@/lib/localStorage";

export const useAuth = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getAccessToken();
        setIsLogin(!!token);
        setLoading(false);
    }, []);

    return { isLogin, loading };
};