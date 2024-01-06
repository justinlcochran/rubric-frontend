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

    const fetchUserAttributes = async () => {
        try {
            const currentUser = await Auth.currentAuthenticatedUser();
            const attributes = currentUser.attributes;
            setUserAttributes(attributes);
        } catch (error) {
            console.error('Error fetching user attributes:', error);
        }
    };

    useEffect(() => {
        const checkUserAuth = async () => {
            try {
                await Auth.currentAuthenticatedUser();
                // If the user is authenticated, fetch user attributes
                fetchUserAttributes();
            } catch (error) {
                console.error('Error checking user authentication:', error);
            }
        };

        // Check user authentication on component mount
        checkUserAuth();

        // Listen for Hub events for authentication changes
        const hubListener = Hub.listen('auth', ({ payload: { event } }) => {
            if (event === 'signIn') {
                // Trigger fetching user attributes when signed in
                fetchUserAttributes();
            }
        });

        // Clean up the Hub listener on component unmount
        return () => hubListener();
    }, []);


    let contextData = {
        userAttributes: userAttributes,
    }

    return (
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    );
}
