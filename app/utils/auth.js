/**
 * This file defines/implements the user authentication context using Context API
 * It includes an AuthProvider component and a useAuth custom hook for easy access to authentication state.
*/
"use client"

import { createContext, useContext, useState } from "react";

// Create context
const UserAuthContext = createContext();

// AuthProvider manages user authentication state consuming Context API
const AuthProvider = ({children}) => {
    // State to hold user information
    const [user, setUser] = useState(null);

    return (
        // UserAuthContext.Provider provides user state to its components
        <UserAuthContext.Provider value={ { user, setUser } }>
            { children }
        </UserAuthContext.Provider>
    )
};

// useAuth provides easy access to user authentication state
const useAuth =  () => {
    // Retrieve user state from context 
    const context = useContext(UserAuthContext);

    // Throw an error if context is not availble
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    };

    return context;
};

export { AuthProvider, useAuth};