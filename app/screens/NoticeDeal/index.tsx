import React, { FC, useEffect } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import AgreeList from './AgreeList'
import AttentionList from './AttentionList'
import NewsList from './NewsList'


const NoticeDeal: FC = () => {
    const navigation = useNavigation()
    const params = useRoute<any>().params

    useEffect(() => {
        navigation.setOptions({title: params.type})
    }, [params.type])

    return (
        <>
            {params.type === '赞同' && <AgreeList />}
            {params.type === '关注' && <AttentionList />}
            {params.type === '消息' && <NewsList />}
        </>
    )
}

export default NoticeDeal
