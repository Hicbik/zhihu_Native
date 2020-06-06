import React, { FC } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Dimensions } from 'react-native'
import Message from './Message'

const Tab = createMaterialTopTabNavigator()

const Notice: FC = () => {

    return (
        <Tab.Navigator
            tabBarOptions={{
                pressColor: '#fff',
                activeTintColor: '#1a1a1a',
                inactiveTintColor: '#999999',
                labelStyle: {fontSize: 16, paddingLeft: 20, paddingRight: 20},
                indicatorStyle: {backgroundColor: '#fff'},
                tabStyle: {width: 'auto'},
                style: {height: 55, justifyContent: 'center'}
            }}
            initialLayout={{width: Dimensions.get('window').width}}
            initialRouteName='Message'
        >
            <Tab.Screen
                name='Message'
                component={Message}
                options={{
                    title: '通知'
                }}
            />
        </Tab.Navigator>
    )
}

export default Notice
