import React from 'react';
import StackNavigator from './src/stack/stacknavigator' 
import { AuthContextProvider } from './src/context/authContext'

const App = () => {
    return(
        <AuthContextProvider>
            <StackNavigator />
        </AuthContextProvider>
    )
};

export default App;