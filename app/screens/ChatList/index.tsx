import React, { FC, useEffect } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/native'
import { useTypedSelector } from '../../store/reducer'
import List from './List'
import Input from './Input'

const ChatList: FC = () => {

    const navigation = useNavigation()
    const params = useRoute<any>().params
    const dispatch = useDispatch()
    const state = useTypedSelector(state => state.User)
    const chatList = useTypedSelector(state => state.Notice.chatList)

    const index = chatList.findIndex(value => value.user_id === params.user_id)

    useEffect(() => {
        navigation.setOptions({title: chatList[index].nickname})
        dispatch({
            type: 'notice/changeWin',
            value: params.user_id
        })
        dispatch({
            type: 'notice/delNewMsg',
            user_id: params.user_id
        })
        return () => {
            dispatch({
                type: 'notice/changeWin',
                value: null
            })
        }
    }, [params.user_id])


    return (
        <Wrapper>
            <List data={chatList[index]} user={state} />
            <Input />
        </Wrapper>
    )
}

const Wrapper = styled.View`
flex: 1;
`

export default ChatList
