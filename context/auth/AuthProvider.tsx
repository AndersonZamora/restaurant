import { FC, useEffect, useReducer } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Cookies from 'js-cookie';
import { IUser } from '../../interface';
import { AuthContext, authReducer } from '.';
import { cincout } from '../../api';

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined
}

interface Props {
    children: any
}

export const AuthProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    const { data, status } = useSession();

    useEffect(() => {
        if (status === 'authenticated') {
            dispatch({ type: '[Auth] - Login', payload: data?.user as IUser });
        }
    }, [status, data])

    const loginUser = async (email: string, password: string): Promise<boolean> => {
        try {

            const { data } = await cincout.post('/user/login', { email, password });
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user });

            return true;
        } catch (error) {
            return false;
        }
    }

    const logout = () => {
        signOut();
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            loginUser,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
};