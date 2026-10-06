import {createContext} from "react";
import type { User } from 'firebase/auth';

export interface AuthContextType{
    user:null | User,
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
})