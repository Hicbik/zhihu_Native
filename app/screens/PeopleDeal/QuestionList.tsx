import React, { FC, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { QuestionRequest } from '../../utils/request'
import { TouchableNativeFeedback } from 'react-native'
import ListBase, { ItemWrapper } from '../../components/ListBase'
import QuestionTitle from '../../components/QuestionTitle'
import { DiffTime } from '../../utils/time'
import TipsText from '../../components/TipsText'

interface Props {
    user_id: string
}


const QuestionList:FC<Props> = ({user_id}) => {
    const navigation = useNavigation()

    const Request = useCallback(({page}: { page: number }) => {
        return QuestionRequest.PeopleQuestion({_id: user_id, page})
    }, [])


    const LinkTo = (_id: string) => () => {
        navigation.navigate('Home', {_id})
    }

    const _renderItem = ({item}: { item: any }) => {
        return (
            <TouchableNativeFeedback onPress={LinkTo(item._id)}>
                <ItemWrapper style={{elevation: 1}}>
                    <QuestionTitle style={{fontWeight:'bold'}}>{item.title}</QuestionTitle>
                    <TipsText>{DiffTime(item.create_time)}</TipsText>
                </ItemWrapper>
            </TouchableNativeFeedback>
        )
    }

    return (
        <ListBase
            Request={Request}
            renderItem={_renderItem}
            TipsTitle='提问已更新!'
            TipsColor='#0084ff'
        />
    )
}

export default QuestionList
