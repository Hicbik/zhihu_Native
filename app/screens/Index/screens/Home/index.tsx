import React, { FC, Fragment } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useNavigation } from '@react-navigation/native'
import { View, Text, Button } from 'react-native'
import List from './List'

const Tab = createMaterialTopTabNavigator()


const Demo = () => {
    const navigation = useNavigation()


    return (
        <View>
            <Text>asd</Text>
            <Button title='home1' onPress={() => navigation.navigate('Home222')} />
        </View>
    )
}

const Home: FC = () => {
    return (
        <Fragment>
            <View style={{backgroundColor:'#fff'}}>
                <Text>搜索框</Text>
            </View>
            <Tab.Navigator
                tabBarOptions={{
                    pressColor:'#fff',
                    activeTintColor: '#1a1a1a',
                    inactiveTintColor: '#999999',
                    indicatorStyle: {backgroundColor: '#1a1a1a' },
                    labelStyle:{fontSize:14},
                }}
            >
                <Tab.Screen
                    name='Attention'
                    component={Demo}
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
                    component={Demo}
                    options={{
                        title: '热榜'
                    }}
                />
            </Tab.Navigator>
        </Fragment>
    )
}

export default Home
