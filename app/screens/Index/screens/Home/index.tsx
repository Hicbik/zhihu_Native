import React, { FC, Fragment } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import RecommendList from './RecommendList'
import Search from './Search'
import HotList from './HotList'
import AttentionList from './AttentionList'

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
                    component={AttentionList}
                    options={{
                        title: '关注'
                    }}
                />
                <Tab.Screen
                    name='Recommend'
                    component={RecommendList}
                    options={{
                        title: '推荐'
                    }}
                />
                <Tab.Screen
                    name='HotList'
                    component={HotList}
                    options={{
                        title: '热榜'
                    }}
                />
            </Tab.Navigator>
        </Fragment>
    )
}

export default Home
