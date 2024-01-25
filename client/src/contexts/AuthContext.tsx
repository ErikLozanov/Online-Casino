import { ReactNode, createContext, useContext, useState } from "react";
import useSessionStorage from "../hooks/useSessionStorage";
import { login, logout, register } from "../services/requester";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContextProps {
    onLoginSubmit: (email: string, password: string) => Promise<void>;
    onRegisterSubmit: (username: string, email: string, password: string, repeatPassword: string) => Promise<void>;
    onLogout: () => Promise<void>;
    userId: string;
    token: string;
    userEmail: string;
    username: string;
    isAuthenticated: boolean;
    loginError: string;
    setLoginError: (error: string) => void;
    registerError: string;
    setRegisterError: (error: string) => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export default function AuthProvider({ children }: AuthProviderProps) {
    const [loginError, setLoginError] = useState<string>("");
    const [registerError, setRegisterError] = useState<string>("");
    const [auth, setAuth] = useSessionStorage("auth", {});
    const navigate = useNavigate();

    const onLoginSubmit = async (email: string, password: string): Promise<void> => {
        try {
            const result = await login(email, password);

            setAuth(result);

            navigate("/");
        } catch (error: unknown) {
            if (error instanceof Error) {
                setLoginError(error.message);
            } else {
                setLoginError("An unknown error occurred");
            }
        }
    };

    const onRegisterSubmit = async (
        username: string,
        email: string,
        password: string,
        repeatPassword: string
    ): Promise<void> => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValidEmail = emailRegex.test(email);

        if (!isValidEmail) {
            setRegisterError("Invalid email!");
            return;
        }

        if (repeatPassword !== password) {
            setRegisterError("Passwords mismatch!");
            return;
        }

        try {
            const result = await register(username, email, password);

            setAuth(result);

            navigate("/");
        } catch (error) {
            if (error instanceof Error) {
                setLoginError(error.message);
            } else {
                setLoginError("An unknown error occurred");
            }
        }
    };

    const onLogout = async (): Promise<void> => {
        await logout();

        setAuth({});
    };

    const contextValues: AuthContextProps = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        userId: auth._id || '', 
        token: auth.accessToken || '', 
        userEmail: auth.email || '', 
        username: auth.username || '', 
        isAuthenticated: !!auth.accessToken,
        loginError,
        setLoginError,
        registerError,
        setRegisterError,
    };

    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = (): AuthContextProps => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }

    return context;
};
