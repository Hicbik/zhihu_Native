import React, { FC, useCallback } from 'react'
import { Badge } from 'react-native-paper'
import { TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components/native'
import AvararPeople from '../../components/AvararPeople'
import ListBase from '../../components/ListBase'
import { UserRequest } from '../../utils/request'
import { DiffTime } from '../../utils/time'
import { useTypedSelector } from '../../store/reducer'
import { LinkToPeople, LinkToQuestion } from '../../utils/LinkTo'
import { NoticeIo } from '../../utils/io'
import ContentBox from './ContentBox'

const NewsList: FC = () => {

    const state = useTypedSelector(state => state.User)

    const Request = useCallback(({page}) => {
        return UserRequest.getNotice({page, type: '消息'})
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

        const content = item.text === '回答了你的问题' ? '' : `${state.nickname}：` + (
            item.text === '回复了你的评论' ? item.comment_id.content : item.reply_id.content
        )


        return (
            <Wrapper>
                <Badge visible={!item.see} size={10} style={{position: 'absolute', top: 10, right: 15}} />
                <AvararPeople
                    nickname={`${item.res_user_id.nickname} ${item.text}`}
                    avatar={item.res_user_id.avatar}
                    text={DiffTime(item.create_time)}
                    onPress={_LinkToPeople(item.res_user_id._id, item._id)}
                />
                <TouchableWithoutFeedback
                    onPress={_LinkToQuestion(
                        item.question_id._id,
                        item.reply_id ? item.reply_id._id : item.res_reply_id._id,
                        item._id
                    )}
                >
                    <Text>
                        {item.text === '回答了你的问题' ? item.res_reply_id.content : item.res_comment_id.content}
                    </Text>
                </TouchableWithoutFeedback>
                <ContentBox
                    content={content}
                    minorText={item.question_id.title}
                    onPress={_LinkToQuestion(
                        item.question_id._id,
                        item.reply_id ? item.reply_id._id : item.res_reply_id._id,
                        item._id
                    )}
                />
            </Wrapper>
        )
    }

    return (
        <ListBase
            Request={Request}
            renderItem={_renderItem}
            TipsTitle='消息已更新'
            footStyle={{marginTop: 0}}
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
const Text = styled.Text`
color: #646464;
font-size: 14px;
padding-top: 10px;
`

export default NewsList
