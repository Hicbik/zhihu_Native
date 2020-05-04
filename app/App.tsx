import 'react-native-gesture-handler'
import React, { FC } from 'react'
import { View, StatusBar, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import Index from './screens/Index'

const Demo = () => {
    return (
        <View>
            <Text>Homeasdasd23123</Text>
        </View>
    )
}

const Stack = createStackNavigator()

const App: FC = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <StatusBar barStyle='dark-content' backgroundColor='white' />
                <SafeAreaView style={{flex:1,backgroundColor:'#f6f6f6'}}>
                    <Stack.Navigator>
                        <Stack.Screen name='Index' component={Index} options={{headerShown: false}} />
                        <Stack.Screen name='Home222' component={Demo} />
                    </Stack.Navigator>
                </SafeAreaView>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default App
