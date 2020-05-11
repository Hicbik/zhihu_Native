import React, { FC, useCallback } from 'react'
import { TouchableNativeFeedback, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ListBase, { Image, ItemWrapper } from '../../components/ListBase'
import { QuestionRequest } from '../../utils/request'
import styled from 'styled-components/native'
import {DiffTime} from '../../utils/time'

interface Props {
    user_id: string
}


const ReplyList: FC<Props> = ({user_id}) => {

    const navigation = useNavigation()

    const Request = useCallback(({page}: { page: number }) => {
        return QuestionRequest.PeopleReply({_id: user_id, page})
    }, [])


    const LinkTo = (_id: string) => () => {
        navigation.navigate('Home', {_id})
    }

    const _renderItem = ({item}: { item: any }) => {
        return (
            <TouchableNativeFeedback onPress={LinkTo(item._id)}>
                <ItemWrapper style={{elevation: 1}}>
                    <Title>{item.question_id.title}</Title>
                    <Content ellipsizeMode='tail' numberOfLines={3}>{item.content}</Content>
                    <TipsText>{item.like_count} 赞同·{item.comment_count} 评论·{DiffTime(item.create_time)}</TipsText>
                </ItemWrapper>
            </TouchableNativeFeedback>
        )
    }

    return (
        <ListBase
            Request={Request}
            renderItem={_renderItem}
            TipsTitle='回答已更新!'
            TipsColor='#0084ff'
        />
    )
}

const Title = styled.Text`
color: #1a1a1a;
font-weight:bold;
font-size: 16px;
`
const Content = styled.Text`
color: #444;
font-size: 14px;
margin-bottom: 5px;
`

const TipsText = styled.Text`
color: #999;
font-size: 14px;
`

export default ReplyList
