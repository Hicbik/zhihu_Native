import React, { FC } from 'react'
import { View, Text } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { useTypedSelector } from '../../store/reducer'
import IconWenzhang from '../../components/iconfont/IconWenzhang'
import IconFaxian from '../../components/iconfont/IconFaxian'
import IconTongzhi from '../../components/iconfont/IconTongzhi'
import IconHuabanfuben from '../../components/iconfont/IconHuabanfuben'

import Home from './screens/Home'
import My from './screens/My'
import Notice from './screens/Notice'

const Tab = createMaterialBottomTabNavigator()

const Demo = () => {
    return (
        <View>
            <Text>adas</Text>
        </View>
    )
}

const Index: FC = () => {

    const state = useTypedSelector(state => state.User.isLogin)

    return (
        <Tab.Navigator
            barStyle={{backgroundColor: '#fff', height: 'auto'}}
            activeColor='#0084ff'
            inactiveColor='#444'
            shifting={false}
        >
            <Tab.Screen
                name='Home'
                options={{
                    title: '首页',
                    tabBarIcon: ({color}) => <IconWenzhang color={color} />,
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
                name='Notice'
                options={{
                    title: '消息',
                    tabBarIcon: ({color}) => <IconTongzhi color={color} />
                }}
                component={Notice}
            />
            <Tab.Screen
                name='My'
                options={{
                    title: state ? '我的' : '未登录',
                    tabBarIcon: ({color}) => <IconHuabanfuben color={color} />
                }}
                component={My}
            />
        </Tab.Navigator>
    )
}

export default Index
