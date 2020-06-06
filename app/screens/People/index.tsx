import React, { FC, useState, useEffect, useCallback } from 'react'
import { useRoute, useFocusEffect } from '@react-navigation/native'
import { StatusBar, View } from 'react-native'
import { UserRequest } from '../../utils/request'
import Header from './Header'
import PeopleTab from './PeopleTab'
import { useTypedSelector } from '../../store/reducer'


const People: FC = () => {

    const params = useRoute<any>().params
    const state = useTypedSelector(state => state.User)
    const [data, setData] = useState<any>({})
    const isMy = state._id === data._id

    useFocusEffect(() => {
            StatusBar.setBackgroundColor('#b8c0d7')
            return () => StatusBar.setBackgroundColor('#ebeff2')
        }
    )

    useEffect(() => {
        ;(async () => {
            const res = await UserRequest.people({_id: params._id})
            setData({...res.data})
        })()
    }, [params._id])


    if (!data._id) return null

    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Header data={data} isMy={isMy} state={state} />
            <PeopleTab data={data} isMy={isMy} />
        </View>
    )
}

export default React.memo(People)
