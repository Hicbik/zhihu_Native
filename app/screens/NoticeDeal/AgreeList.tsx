import React, { FC, useCallback } from 'react'
import { Badge } from 'react-native-paper'
import styled from 'styled-components/native'
import AvararPeople from '../../components/AvararPeople'
import ListBase from '../../components/ListBase'
import { UserRequest } from '../../utils/request'
import { DiffTime } from '../../utils/time'
import { useTypedSelector } from '../../store/reducer'
import { LinkToPeople, LinkToQuestion } from '../../utils/LinkTo'
import { NoticeIo } from '../../utils/io'
import ContentBox from './ContentBox'

const AgreeList: FC = () => {

    const state = useTypedSelector(state => state.User)

    const Request = useCallback(({page}) => {
        return UserRequest.getNotice({page, type: '赞同'})
    }, [])

    const _LinkToPeople = (_id: string, item_id: string) => () => {
        NoticeIo.HaveRead({_id: item_id})
        LinkToPeople({_id})
    }

    const _LinkToQuestion = (_id: string, reply_id: string, item_id: string) => () => {
        NoticeIo.HaveRead({_id: item_id})
        LinkToQuestion({_id, reply_id})()
    }

    const _renderItem = ({item}: { item: any }) => {
        return (
            <Wrapper>
                <Badge visible={!item.see} size={10} style={{position: 'absolute', top: 10, right: 15}} />
                <AvararPeople
                    nickname={`${item.res_user_id.nickname} ${item.text}`}
                    avatar={item.res_user_id.avatar}
                    text={DiffTime(item.create_time)}
                    onPress={_LinkToPeople(item.res_user_id._id, item._id)}
                />
                <ContentBox
                    content={`${state.nickname}：${item.text === '赞同了你的回答' ? item.reply_id.content : item.comment_id.content}`}
                    minorText={item.question_id.title}
                    onPress={_LinkToQuestion(item.question_id._id, item.reply_id._id, item._id)}
                />
            </Wrapper>
        )
    }

    return (
        <ListBase
            Request={Request}
            renderItem={_renderItem}
            TipsTitle='赞同已更新'
            footStyle={{ marginTop: 0}}
        />
    )
}

const Wrapper = styled.View`
padding: 15px;
border-bottom-width: 0.5px;
border-bottom-color:#ebebeb;
background-color: #fff;
position: relative;
`


export default AgreeList
