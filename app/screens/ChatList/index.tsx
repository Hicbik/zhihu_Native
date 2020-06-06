import React, { FC, useCallback } from 'react'
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/native'
import { useTypedSelector } from '../../store/reducer'
import { NoticeIo } from '../../utils/io'
import List from './List'
import Input from './Input'

const ChatList: FC = () => {

    const navigation = useNavigation()
    const params = useRoute<any>().params
    const dispatch = useDispatch()
    const state = useTypedSelector(state => state.User)
    const chatList = useTypedSelector(state => state.Notice.chatList)

    const index = chatList.findIndex(value => value.user_id === params.user_id)



    useFocusEffect(
        useCallback(() => {
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
                NoticeIo.SaveChat()
            }
        }, [])
    )


    return (
        <Wrapper>
            <List data={chatList[index]} user={state} />
            <Input people_id={chatList[index].user_id} user={state} />
        </Wrapper>
    )
}

const Wrapper = styled.View`
flex: 1;
`

export default ChatList
