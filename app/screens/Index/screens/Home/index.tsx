import React, { FC, Fragment, useRef } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useIsFocused } from '@react-navigation/native'
import RecommendList from './RecommendList'
import Search from './Search'
import HotList from './HotList'
import AttentionList from './AttentionList'
import HomeModal from './HomeModal'
import { Dimensions } from 'react-native'

const Tab = createMaterialTopTabNavigator()


const Home: FC = () => {
    const isFocused = useIsFocused()
    const modalRef = useRef<any>()


    return (
        <Fragment>
            <Search modalRef={modalRef} />
            <Tab.Navigator
                tabBarOptions={{
                    pressColor: '#fff',
                    activeTintColor: '#1a1a1a',
                    inactiveTintColor: '#999999',
                    indicatorStyle: {backgroundColor: '#1a1a1a'},
                    labelStyle: {fontSize: 14},
                    tabStyle: {height: 45}
                }}
                initialRouteName='Recommend'
                initialLayout={{width: Dimensions.get('window').width}}
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
            {isFocused && <HomeModal cRef={modalRef} />}
        </Fragment>
    )
}

export default Home
