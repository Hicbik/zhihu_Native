import React, { FC } from 'react'
import {
    ScrollView,
    View,
    Text,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native'
import styled from 'styled-components/native'
import IconArrowRight from '../../components/iconfont/IconArrowRight'
import IconShijian from '../../components/iconfont/IconShijian'
import IconClose from '../../components/iconfont/IconClose'


interface Props {
    history: string[],
    _onDelHistory: (index: number) => any,
    _onDelAllHistory: () => any,
    _onPressHistory: (value: string) => any
}

const HotView: FC<Props> = ({history, _onDelHistory, _onDelAllHistory,_onPressHistory}) => {


    return (
        <ScrollView style={{marginTop: 30}}>
            <Title>热搜</Title>
            <HotListView>
                {
                    [1, 2, 3, 4, 5, 6, 7, 8].map((value, index) => (
                        <TouchableNativeFeedback key={value}>
                            <View style={{flexDirection: 'row', width: '50%', padding: 5, marginBottom: 5}}>
                                <IndexText index={index + 1}>{index + 1}</IndexText>
                                <View>
                                    <Text style={{color: '#333', fontSize: 14, marginBottom: 5}}>南信大排查航班信息</Text>
                                    <Text style={{color: '#999', fontSize: 12}}>具体发生了什么？</Text>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                    ))
                }
            </HotListView>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomColor: '#f6f6f6',
                borderBottomWidth: 1,
                padding: 15,
                margin: 15
            }}>
                <Text style={{color: '#0084ff', fontSize: 14}}>更多热搜内容</Text>
                <IconArrowRight color='#0084ff' size={14} />
            </View>
            {
                !!history.length && (
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Title style={{marginBottom: 0}}>搜索历史</Title>
                        <TouchableOpacity style={{marginRight: 20}} onPress={_onDelAllHistory}>
                            <Text style={{color: '#999', fontSize: 12}}>清空</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
            {
                history.map((value, index) => (
                    <TouchableNativeFeedback key={value} onPress={_onPressHistory(value)}>
                        <SearchItem>
                            <IconShijian color='#D3D3D3' size={14} />
                            <Text style={{marginLeft: 10, color: '#666', fontSize: 14}}>{value}</Text>
                            <TouchableWithoutFeedback onPress={_onDelHistory(index)}>
                                <IconClose color='#D3D3D3' style={{marginLeft: 'auto'}} />
                            </TouchableWithoutFeedback>
                        </SearchItem>
                    </TouchableNativeFeedback>
                ))
            }
        </ScrollView>
    )
}


const Title = styled.Text`
color: #1a1a1a;
margin-bottom: 5px;
font-size: 16px;
font-weight: bold;
padding-left: 20px;
`
const HotListView = styled.View`
flex-direction: row;
flex-wrap: wrap;
padding: 10px 20px;
`
const IndexText = styled.Text`
font-size: 14px;
color: ${(props: { index: number }) => props.index < 4 ? '#ff942d' : '#bfbfbf'};
margin-right: 10px;
`
const SearchItem = styled.View`
margin: 0 20px;
flex-direction: row;
align-items: center;
padding: 10px 0 10px 10px;
border-bottom-width: 1px;
border-bottom-color: #f6f6f6;
`

export default React.memo(HotView)
