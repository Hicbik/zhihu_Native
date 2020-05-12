import React, { FC } from 'react'
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native'
import ReplyList from './ReplyList'
import QuestionList from './QuestionList'
import AttentionPeopleList from './AttentionPeopleList'
import FansPeopleList from './FansPeopleList'
import DynamicList from './DynamicList'


const PeopleDeal: FC = () => {

    const navigation = useNavigation()
    const params = useRoute<any>().params

    useFocusEffect(() => {
        navigation.setOptions({title: params.title})
    })


    return (
        <>
            {params.type === '动态' && <DynamicList user_id={params.user_id} />}
            {params.type === '回答' && <ReplyList user_id={params.user_id} />}
            {params.type === '关注' && <AttentionPeopleList user_id={params.user_id} />}
            {params.type === '提问' && <QuestionList user_id={params.user_id} />}
            {params.type === '粉丝' && <FansPeopleList user_id={params.user_id} />}
        </>
    )
}

export default PeopleDeal
