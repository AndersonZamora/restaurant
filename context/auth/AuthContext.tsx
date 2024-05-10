import { IUser } from '../../interface';
import { createContext } from 'react';

interface ContextProps {
    isLoggedIn: boolean;
    user?: IUser;
    loginUser: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);