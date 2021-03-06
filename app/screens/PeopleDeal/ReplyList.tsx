import React, { FC, useCallback } from 'react'
import { TouchableNativeFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ListBase, {  ItemWrapper } from '../../components/ListBase'
import { QuestionRequest } from '../../utils/request'
import {DiffTime} from '../../utils/time'
import QuestionTitle from '../../components/QuestionTitle'
import ReplyContent from '../../components/ReplyContent'
import TipsText from '../../components/TipsText'

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
                    <QuestionTitle style={{marginBottom:0,fontWeight:'bold'}}>{item.question_id.title}</QuestionTitle>
                    <ReplyContent>{item.content}</ReplyContent>
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





export default ReplyList
