import React, { FC } from 'react'
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native'
import DynamicList from './DynamicList'
import ReplyList from './ReplyList'
import RecommendList from '../Index/screens/Home/RecommendList'


const PeopleDeal: FC = () => {

    const navigation = useNavigation()
    const params = useRoute<any>().params

    useFocusEffect(() => {
        navigation.setOptions({title: params.title})
    })


    return (
        <>
            {params.type === '回答' && <ReplyList user_id={params.user_id} />}
            {params.type === '关注' && <RecommendList />}

        </>
    )
}

export default PeopleDeal
