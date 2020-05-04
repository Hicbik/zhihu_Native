import React, { FC } from 'react'
import { View, Text } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import IconWenzhang from '../../components/iconfont/IconWenzhang'
import IconFaxian from '../../components/iconfont/IconFaxian'
import IconTongzhi from '../../components/iconfont/IconTongzhi'
import IconHuabanfuben from '../../components/iconfont/IconHuabanfuben'

import Home from './screens/Home'

const Tab = createMaterialBottomTabNavigator()

const Demo = () => {
    return (
        <View>
            <Text>adas</Text>
        </View>
    )
}

const Index: FC = () => {

    return (
        <Tab.Navigator
            barStyle={{backgroundColor: '#fff'}}
            activeColor='#0084ff'
            inactiveColor='#444'
            shifting={false}
        >
            <Tab.Screen
                name='Home'
                options={{
                    title: '首页',
                    tabBarIcon: ({color}) => <IconWenzhang color={color} />
                }}
                component={Home}
            />
            <Tab.Screen
                name='Find'
                options={{
                    title: '发现',
                    tabBarIcon: ({color}) => <IconFaxian color={color} />
                }}
                component={Demo}

            />
            <Tab.Screen
                name='Home2'
                options={{
                    title: '消息',
                    tabBarIcon: ({color}) => <IconTongzhi color={color} />
                }}
                component={Demo}
            />
            <Tab.Screen
                name='My'
                options={{
                    title: '我的',
                    tabBarIcon: ({color}) => <IconHuabanfuben color={color} />
                }}
                component={Demo}
            />
        </Tab.Navigator>
    )
}

export default Index
