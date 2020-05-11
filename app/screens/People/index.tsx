import React, { FC, useState, useEffect } from 'react'
import { useRoute, useFocusEffect } from '@react-navigation/native'
import { StatusBar,View } from 'react-native'
import { UserRequest } from '../../utils/request'
import Header from './Header'
import PeopleTab from './PeopleTab'


const People: FC = () => {

    const params = useRoute<any>().params
    const [data, setData] = useState<any>({})


    useFocusEffect(() => {
        StatusBar.setBackgroundColor('#b8c0d7')
        return () => StatusBar.setBackgroundColor('#ebeff2')
    })

    useEffect(() => {
        ;(async () => {
            const res = await UserRequest.people({_id: params._id})
            setData({...res.data})
        })()
    }, [])


    if (!data._id) return null

    return (
        <View style={{flex:1,backgroundColor:'#fff'}}>
            <Header data={data} />
            <PeopleTab data={data}/>
        </View>
    )
}

export default People
