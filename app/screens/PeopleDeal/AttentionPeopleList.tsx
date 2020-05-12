import React, { FC, useCallback } from 'react'
import PeopleList from './PeopleList'
import { UserRequest } from '../../utils/request'

interface Props {
    user_id: string
}


const AttentionPeopleList: FC<Props> = ({user_id}) => {

    const Request = useCallback(({page}: { page: number }) => {
        return UserRequest.getAttentionPeople({_id: user_id, page})
    }, [])


    return (
        <PeopleList user_id={user_id} Request={Request} TipsTitle='关注已更新!' />
    )
}


export default AttentionPeopleList
