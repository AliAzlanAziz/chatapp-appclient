import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from '../screen/signup'
import Signin from '../screen/signin'
import ChatList from '../screen/chatlist'
import Chat from '../screen/chat'
import { AuthContext } from '../context/authContext'

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const { token } = React.useContext(AuthContext)

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {token === '' ?
                    <>
                    <Stack.Screen 
                        name="Signup"
                        component={Signup} 
                        options={{
                            title: 'Sign Up', 
                            headerShown:true, 
                            headerStyle: {
                                backgroundColor: '#5B1B9B',
                            },
                            headerTitleStyle: {
                                color: 'white',
                                fontFamily: 'Nunito-Regular',
                            },
                            headerTintColor: 'white',
                        }}/>
                    <Stack.Screen 
                        name="Signin"
                        component={Signin} 
                        options={{
                            title: 'Sign In', 
                            headerShown:true, 
                            headerStyle: {
                                backgroundColor: '#5B1B9B',
                            },
                            headerTitleStyle: {
                                color: 'white',
                                fontFamily: 'Nunito-Regular',
                            },
                            headerTintColor: 'white',
                        }}/>
                    </>
                        :
                    <>
                    <Stack.Screen 
                        name="ChatList"
                        component={ChatList} 
                        options={{
                            title: 'Chats', 
                            headerShown:true, 
                            headerStyle: {
                                backgroundColor: '#5B1B9B',
                            },
                            headerTitleStyle: {
                                color: 'white',
                                fontFamily: 'Nunito-Regular',
                            },
                            headerTintColor: 'white',
                        }}/>
                    <Stack.Screen 
                        name="Chat"
                        component={Chat} 
                        options={{
                            title: 'Chat', 
                            headerShown:true, 
                            headerStyle: {
                                backgroundColor: '#5B1B9B',
                            },
                            headerTitleStyle: {
                                color: 'white',
                                fontFamily: 'Nunito-Regular',
                            },
                            headerTintColor: 'white',
                        }}/>
                    </>
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackNavigator