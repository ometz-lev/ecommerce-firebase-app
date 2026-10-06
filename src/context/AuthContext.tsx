//This component manages the app's authentication state using Firebase
//It checks whether the user is logged in and makes that information available to other components and protected pages.
import { useState, useEffect} from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, type User } from "firebase/auth";
import {AuthContext} from './AuthContextBase';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            },
            () => {
                setUser(null);
                setLoading(false);
            }
        );
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{user, loading}}>
            {children}
        </AuthContext.Provider>
    );
};

