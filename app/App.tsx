import 'react-native-gesture-handler'
import React, { FC, useEffect } from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import RNBootSplash from 'react-native-bootsplash'
import { Provider } from 'react-redux'
import { UserRequest } from './utils/request'
import store from './store'
import { navigation } from './utils/navigation'

import Index from './screens/Index'
import Question from './screens/Question'
import Search from './screens/Search'
import SignIn from './screens/SignIn'
import People from './screens/People'
import PeopleDeal from './screens/PeopleDeal'
import ReplyEdit from './screens/ReplyEdit'
import NewQuestion from './screens/NewQuestion'
import QuestionDeal from './screens/QuestionDeal'
import ChatList from './screens/ChatList'

const Stack = createStackNavigator()


const App: FC = () => {

    useEffect(() => {
        ;(async () => {
            await Promise.all([
                RNBootSplash.hide({duration: 250}),
                UserRequest.Token()
            ])
        })()
    }, [])

    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <NavigationContainer ref={navigation}>
                    <StatusBar barStyle='dark-content' backgroundColor='#ebeff2' />
                    <SafeAreaView style={{flex: 1, backgroundColor: '#f6f6f6'}}>

                        <Stack.Navigator
                            screenOptions={{
                                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                                headerTintColor: '#646464',
                                headerTitleStyle: {marginLeft: -20}
                            }}
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
                                name='QuestionDeal'
                                component={QuestionDeal}
                                options={{
                                    headerStyle: {elevation: 0},
                                    headerTintColor: '#646464',
                                    title: ''
                                }}
                            />

                            <Stack.Screen
                                name='NewQuestion'
                                component={NewQuestion}
                                options={{
                                    headerStyle: {backgroundColor: '#fff', elevation: 0},
                                    title: '',
                                }}
                            />

                            <Stack.Screen
                                name='Search'
                                component={Search}
                                options={{
                                    headerShown: false,
                                    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
                                }}
                            />

                            <Stack.Screen
                                name='SignIn'
                                component={SignIn}
                                options={{
                                    headerShown: false,
                                }}
                            />

                            <Stack.Screen
                                name='People'
                                component={People}
                                options={{
                                    headerStyle: {backgroundColor: '#b8c0d7', elevation: 0},
                                    title: '',
                                    headerTintColor: '#fff'
                                }}

                            />

                            <Stack.Screen
                                name='PeopleDeal'
                                component={PeopleDeal}
                            />

                            <Stack.Screen
                                name='ReplyEdit'
                                component={ReplyEdit}
                                options={{
                                    headerStyle: {backgroundColor: '#fff', elevation: 0},
                                    title: '',
                                }}
                            />

                            <Stack.Screen
                                name='ChatList'
                                component={ChatList}
                                options={{
                                    headerTintColor: '#646464',
                                    title: '',
                                    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS

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
