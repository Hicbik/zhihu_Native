import React, { FC, useState } from 'react'
import { Dimensions, View } from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import QuestionList from './QuestionList'
import PeopleList from './PeopleList'

const initialLayout = {width: Dimensions.get('window').width}

const HotTavView: FC = () => {

    const [index, setIndex] = useState(0)
    const [routes] = React.useState([
        {key: 'first', title: '综合'},
        {key: 'second', title: '用户'},
    ])

    const renderScene = SceneMap({
        first: QuestionList,
        second: PeopleList,
    })

    const renderTabBar = (props: any) => (
        <TabBar
            {...props}
            indicatorStyle={{backgroundColor: 'transparent'}}
            style={{backgroundColor: '#fff', elevation: 0, borderBottomColor: '#ebebeb', borderBottomWidth: 1}}
            activeColor='#1a1a1a'
            inactiveColor='#999'
            tabStyle={{width: 60, height: 45}}
            labelStyle={{fontSize: 14}}
        />
    )

    return (
        <View style={{flex:1,backgroundColor:'#f6f6f6'}}>
            <TabView
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                renderTabBar={renderTabBar}
                style={{marginTop: 5}}
                lazy
            />
        </View>
    )
}

export default HotTavView
