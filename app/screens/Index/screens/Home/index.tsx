import React, { FC, Fragment } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import List from './List'
import Search from './Search'

const Tab = createMaterialTopTabNavigator()


const Home: FC = () => {
    return (
        <Fragment>
            <Search />
            <Tab.Navigator
                tabBarOptions={{
                    pressColor: '#fff',
                    activeTintColor: '#1a1a1a',
                    inactiveTintColor: '#999999',
                    indicatorStyle: {backgroundColor: '#1a1a1a'},
                    labelStyle: {fontSize: 14},
                    tabStyle:{height: 45}
                }}
                initialRouteName='Recommend'
            >
                <Tab.Screen
                    name='Attention'
                    component={List}
                    options={{
                        title: '关注'
                    }}
                />
                <Tab.Screen
                    name='Recommend'
                    component={List}
                    options={{
                        title: '推荐'
                    }}
                />
                <Tab.Screen
                    name='HotList'
                    component={List}
                    options={{
                        title: '热榜'
                    }}
                />
            </Tab.Navigator>
        </Fragment>
    )
}

export default Home
