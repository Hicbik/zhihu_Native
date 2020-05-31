import React, { FC, useEffect } from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import RNBootSplash from 'react-native-bootsplash'
import { UserRequest } from './utils/request'
import { navigation } from './utils/navigation'
import { useTypedSelector } from './store/reducer'
import { NoticeIo } from './utils/io'

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
import NoticeDeal from './screens/NoticeDeal'

const Stack = createStackNavigator()

const App: FC = () => {

    const isLogin = useTypedSelector(state => state.User.isLogin)

    useEffect(() => {
        ;(async () => {
            await Promise.all([
                RNBootSplash.hide({duration: 250}),
                UserRequest.Token()
            ])
        })()
    }, [])

    useEffect(() => {
        if (isLogin) NoticeIo.init()
        if (NoticeIo.socket && !isLogin) {
            console.log('close')
            NoticeIo.close()
        }
    }, [isLogin])

    return (
        <SafeAreaProvider>
            <NavigationContainer ref={navigation}>
                <StatusBar barStyle='dark-content' backgroundColor='#ebeff2' />
                <SafeAreaView style={{flex: 1, backgroundColor: '#f6f6f6'}}>

                    <Stack.Navigator
                        screenOptions={{
                            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                            headerTintColor: '#646464',
                            headerTitleStyle: {marginLeft: -20},
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

                        <Stack.Screen
                            name='NoticeDeal'
                            component={NoticeDeal}
                            options={{
                                headerTintColor: '#646464',
                                title: '',
                                headerTitleStyle: {color: '#1a1a1a', fontWeight: 'normal', fontSize: 17},
                                headerTitleAlign: 'center',
                                headerStyle: {elevation: 0, borderBottomColor: '#ebebeb', borderBottomWidth: 1}
                            }}
                        />


                    </Stack.Navigator>

                </SafeAreaView>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default App
