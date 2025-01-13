import { createContext, useContext } from "react";
import { avatar, getCurrentUser } from './appwrite';
import { useAppwrite } from "./useAppwrite";

interface User{
    $id: string;
    name: string;
    email: string;
    avatar: string;
}

interface GlobalContextType {
    isLoggedIn: boolean;
    user: User | null;
    loading: boolean;
    refetch: (newParams?: Record<string,string | number>) =>Promise< void>;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);


const GlobalProvider = ({children}: {children: React.ReactNode}) => {
    const {data:user, loading, refetch} = useAppwrite({
        fn: getCurrentUser,
    });

    const isLoggedIn = !!user;
    console.log(JSON.stringify(user, null, 2));
    return (
        <GlobalContext.Provider value={{isLoggedIn, user, loading, refetch}}>
            {children}
        </GlobalContext.Provider>)}

export default GlobalProvider;

export const useGlobalContext = ():GlobalContextType => {
    const context = useContext(GlobalContext);
    if(!context) {
        throw new Error('useGlobalContext must be used within GlobalProvider');
    }
    return context;
}















