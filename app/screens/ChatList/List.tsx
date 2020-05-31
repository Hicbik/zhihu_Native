import React, { FC, useEffect, useRef } from 'react'
import { FlatList, View } from 'react-native'
import styled from 'styled-components/native'
import { ChatTime, messageTime } from '../../utils/time'

interface Props {
    data: {
        user_id: string,
        nickname: string,
        avatar: string
        messageList: any[]
    },
    user: any
}

const List: FC<Props> = ({data, user}) => {

    const listRef = useRef<any>()

    useEffect(() => {
        listRef.current.scrollToEnd()
    }, [data.messageList.length])

    const HeMessage = ({message}: { message: string }) => {
        return (
            <Wrapper>
                <Avatar source={{uri: data.avatar}} />
                <Massage>
                    <Tips />
                    <MsgText>{message}</MsgText>
                </Massage>
            </Wrapper>
        )
    }

    const MyMessage = ({message}: { message: string }) => {
        return (
            <Wrapper style={{flexDirection: 'row-reverse'}}>
                <Avatar source={{uri: user.avatar}} />
                <Massage style={{backgroundColor: '#0084ff'}}>
                    <MyTips />
                    <MsgText style={{color: '#fff'}}>{message}</MsgText>
                </Massage>
            </Wrapper>
        )
    }

    const _renderItem = ({item, index}: { item: any, index: number }) => {
        return (
            <>
                {
                    messageTime(data.messageList[index === 0 ? 0 : index - 1].time, item.time) && (
                        <TimeText>{ChatTime(item.time)}</TimeText>
                    )
                }
                {item.type === 'he' && <HeMessage message={item.message} />}
                {item.type === 'my' && <MyMessage message={item.message} />}
            </>
        )
    }

    const _keyExtractor = (item: any, index: number) => `${index}`

    return (
        <FlatList
            data={data.messageList}
            renderItem={_renderItem}
            style={{flex: 1, paddingLeft: 15, paddingRight: 15}}
            keyExtractor={_keyExtractor}
            ref={listRef}
            ListFooterComponent={<View style={{height: 200}} />}
        />
    )
}


const Avatar = styled.Image`
width: 40px;
height: 40px;
border-radius: 20px;
`
const Wrapper = styled.View`
flex-direction: row;
margin-top: 10px;
width: 100%;
`
const Massage = styled.View`
background-color: #fff;
border-radius: 10px;
padding: 10px 12px;
margin: 0 12px;
position: relative;
max-width: 80%;
`
const MsgText = styled.Text`
color: #1a1a1a;
font-size: 14px;
`
const Tips = styled.View`
width: 10px;
height: 10px;
position: absolute;
top: 14px;
left: -4px;
background-color: #fff;
transform: rotate(45deg);
`
const MyTips = styled.View`
width: 10px;
height: 10px;
position: absolute;
top: 14px;
right: -4px;
transform: rotate(45deg);
background-color: #0084ff;
`
const TimeText = styled.Text`
color: #999;
font-size: 12px;
text-align:center;
margin-top: 20px;
`

export default React.memo(List)
