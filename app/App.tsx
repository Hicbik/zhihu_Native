import 'react-native-gesture-handler'
import React, { FC, useEffect } from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Provider } from 'mobx-react'
import RNBootSplash from 'react-native-bootsplash'
import store from './store'

import Index from './screens/Index'
import Question from './screens/Question'
import Search from './screens/Search'

const Stack = createStackNavigator()

const App: FC = () => {

    useEffect(() => {
        RNBootSplash.hide({duration: 250})
    }, [])

    return (
        <Provider {...store}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <StatusBar barStyle='dark-content' backgroundColor='#ebeff2' />
                    <SafeAreaView style={{flex: 1, backgroundColor: '#f6f6f6'}}>

                        <Stack.Navigator
                            screenOptions={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}
                        >

                            <Stack.Screen
                                name='Index'
                                component={Index}
                                options={{headerShown: false}}
                            />

                            <Stack.Screen
                                name='Question'
                                component={Question}
                            />

                            <Stack.Screen
                                name='Search'
                                component={Search}
                                options={{
                                    headerShown: false,
                                    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
                                }}
                            />

                        </Stack.Navigator>

                    </SafeAreaView>
                </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    )
}

export default App
