import React, { FC } from 'react'
import { FlatList } from 'react-native'
import styled from 'styled-components/native'

interface Props {
    data: {
        user_id: string,
        nickname: string,
        avatar: string
        messageList: any[]
    },
    user: any
}

const List: FC<Props> = ({data,user}) => {

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

    const _renderItem = ({item}: { item: any }) => {
        return (
            <>
                {item.type === 'he' && <HeMessage message={'asd'} />}
                {item.type === 'my' && <MyMessage message={'阿萨大'} />}
            </>
        )
    }

    const _keyExtractor = (item: any, index: number) => `${index}`

    return (
        <FlatList
            data={data.messageList}
            renderItem={_renderItem}
            style={{padding: 15}}
            keyExtractor={_keyExtractor}
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
margin-bottom: 10px;
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
text-align:left;
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

export default List
