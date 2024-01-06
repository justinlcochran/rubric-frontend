import React, { createContext, useState, useEffect } from "react";
import {Amplify, Auth} from "aws-amplify";
import awsconfig from "../aws-exports";
Amplify.configure(awsconfig)


const UserContext = createContext()

export default UserContext

export const UserContextProvider = ({children}) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [userAttributes, setUserAttributes] = useState(null)
    const [userContext, setUserContext] = useState(null)

    useEffect(() => {
        const checkAuthAndFetchAttributes = async () => {
            try {
                // Check if the user is authenticated
                await Auth.currentAuthenticatedUser();

                // If the user is authenticated, fetch user attributes
                fetchUserAttributes();
            } catch (error) {
                console.error('Error fetching user attributes:', error);
            }
        };

        // Call the function to check authentication and fetch attributes
        checkAuthAndFetchAttributes();
    }, []);

    const fetchUserAttributes = async () => {
        try {
            // Get the current authenticated user
            const currentUser = await Auth.currentAuthenticatedUser();

            // Get the user attributes
            const attributes = currentUser.attributes;

            // Store the user attributes in state
            setUserAttributes(attributes);
        } catch (error) {
            console.error('Error fetching user attributes:', error);
        }
    };


    let contextData = {
        userAttributes: userAttributes,
    }

    return (
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    );
}
