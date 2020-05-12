import React, { FC, useState, useEffect } from 'react'
import { useRoute, useFocusEffect } from '@react-navigation/native'
import { StatusBar, View } from 'react-native'
import { UserRequest } from '../../utils/request'
import Header from './Header'
import PeopleTab from './PeopleTab'
import { useTypedSelector } from '../../store/reducer'


const People: FC = () => {

    const params = useRoute<any>().params
    const state = useTypedSelector(state => state.User._id)
    const [data, setData] = useState<any>({})
    const isMy = state === data._id

    useFocusEffect(() => {
        StatusBar.setBackgroundColor('#b8c0d7')
        return () => StatusBar.setBackgroundColor('#ebeff2')
    })

    useEffect(() => {
        ;(async () => {
            const res = await UserRequest.people({_id: params._id})
            setData({...res.data})
        })()
    }, [params._id])


    if (!data._id) return null

    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Header data={data} isMy={isMy}/>
            <PeopleTab data={data} isMy={isMy}/>
        </View>
    )
}

export default People
