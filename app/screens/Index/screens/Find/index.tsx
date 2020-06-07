import React, { FC, useState, useCallback, useRef } from 'react'
import styled from 'styled-components/native'
import { View, TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Card, Avatar } from 'react-native-paper'
import ListBase from '../../../../components/ListBase'
import InputModal from './InputModal'
import { LeaveMessageRequest } from '../../../../utils/request'
import { useTypedSelector } from '../../../../store/reducer'
import IconZan from '../../../../components/iconfont/IconZan'
import { DiffTime } from '../../../../utils/time'


const Find: FC = () => {

    const navigation = useNavigation()
    const state = useTypedSelector(state => state.User)
    const [visible, setVisible] = useState(false)
    const listRef = useRef<any>()

    const Request = useCallback(({page}: { page: number }) => {
        return LeaveMessageRequest.getData({page})
    }, [])

    const onSetModal = (type: boolean) => () => {
        setVisible(type)
    }

    const _onOpen = () => {
        if (!state.isLogin) return navigation.navigate('SignIn')
        setVisible(true)
    }

    const _onLike = ({_id, type, index}: any) => async () => {
        const res = await LeaveMessageRequest.like({type, _id})
        if (res.state === 'err') return
        listRef.current.setData((prevState: any[]) => prevState.map(
            (value, i) => ({
                ...value,
                like_count: index === i ? res.data.like_count : value.like_count,
                like_id: index === i ? res.data.like_id : value.like_id
            })
        ))

    }

    const _renderItem = ({item, index}: any) => {

        const type = item.like_id.includes(state._id)

        return (
            <Card style={{marginTop: 10, marginLeft: 15, marginRight: 15}}>
                <Card.Content>
                    <Content>{item.content}</Content>
                    <Time>{DiffTime(item.create_time)}</Time>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderTopColor: '#f6f6f6',
                        borderTopWidth: 1,
                        paddingTop: 10
                    }}>
                        <Avatar.Image size={24} source={{uri: item.user_id.avatar}} />
                        <NickName>{item.user_id.nickname}</NickName>
                        <TouchableOpacity
                            style={{marginLeft: 'auto'}}
                            onPress={_onLike({_id: item._id, type: type ? 'down' : 'up', index})}
                        >
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <IconZan color={type ? '#0084ff' : '#1a1a1a'} style={{marginTop: -3}} size={16} />
                                {
                                    !!item.like_count && (
                                        <NickName style={{color: type ? '#0084ff' : '#1a1a1a'}}>
                                            {item.like_count}
                                        </NickName>
                                    )
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                </Card.Content>
            </Card>
        )
    }

    return (
        <Wrapper>
            <View
                style={{
                    height: 55,
                    backgroundColor: '#fff',
                    position: 'relative',
                    elevation: 2,
                    justifyContent: 'center'
                }}
            >
                <HeaderText>发现广场</HeaderText>
                <TouchableOpacity style={{position: 'absolute', top: 17, right: 15}} onPress={_onOpen}>
                    <Text style={{color: '#0084ff'}}>留言！</Text>
                </TouchableOpacity>
            </View>
            <ListBase
                Request={Request}
                renderItem={_renderItem}
                TipsTitle='留言已更新'
                cRef={listRef}
                footStyle={{marginLeft: 15, marginRight: 15}}
            />
            <InputModal visible={visible} onSetModal={onSetModal} listRef={listRef.current} />
        </Wrapper>
    )
}

const Wrapper = styled.View`
flex: 1;
`
const HeaderText = styled.Text`
color: #1a1a1a;
font-size: 18px;
text-align:center;
`
const Content = styled.Text`
color: #1a1a1a;
font-size: 16px;
padding-bottom: 5px;
`
const Time = styled.Text`
color: #999;
font-size: 12px;
margin-bottom: 5px;
`
const NickName = styled.Text`
color: #1a1a1a;
margin-left: 5px;
`


export default Find
