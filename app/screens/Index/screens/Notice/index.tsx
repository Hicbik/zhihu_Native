import React, { FC } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Dimensions } from 'react-native'
import Message from './Message'

const Tab = createMaterialTopTabNavigator()

const Demo = () => {
    return null
}

const Notice: FC = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                pressColor: '#fff',
                activeTintColor: '#1a1a1a',
                inactiveTintColor: '#999999',
                labelStyle: {fontSize: 16,paddingLeft:20,paddingRight:20},
                indicatorStyle:{backgroundColor:'#1a1a1a'},
                tabStyle:{width:'auto'},
                style:{height:55,justifyContent: 'center'}
            }}
            initialLayout={{ width: Dimensions.get('window').width }}
        >
            <Tab.Screen
                name='Dynamic'
                component={Demo}
                options={{
                    title: '动态'
                }}
            />
            <Tab.Screen
                name='Message'
                component={Message}
                options={{
                    title: '消息'
                }}
            />
        </Tab.Navigator>
    )
}

export default Notice
