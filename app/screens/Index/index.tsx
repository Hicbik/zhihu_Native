import React, { FC } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { useTypedSelector } from '../../store/reducer'
import Home from './screens/Home'
import My from './screens/My'
import Notice from './screens/Notice'
import Find from './screens/Find'
import IconWenzhang from '../../components/iconfont/IconWenzhang'
import IconFaxian from '../../components/iconfont/IconFaxian'
import IconTongzhi from '../../components/iconfont/IconTongzhi'
import IconHuabanfuben from '../../components/iconfont/IconHuabanfuben'

const Tab = createMaterialBottomTabNavigator()


const Index: FC = () => {
    const state = useTypedSelector(state => state.User.isLogin)
    const NoticeState = useTypedSelector(state => state.Notice)

    const showBadge = !!(NoticeState.unread + NoticeState.chat)


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
                    tabBarIcon: ({color}) => <IconFaxian color={color} />,
                }}
                component={Find}
            />
            <Tab.Screen
                name='Notice'
                options={{
                    title: '消息',
                    tabBarIcon: ({color}) => <IconTongzhi color={color} />,
                    tabBarBadge: showBadge,
                }}
                component={Notice}
                listeners={({navigation}) => ({
                    tabPress: e => {
                        e.preventDefault()
                        if (!state) return navigation.navigate('SignIn')
                        navigation.navigate('Notice')
                    }
                })}
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
