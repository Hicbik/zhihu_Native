import React, { FC, useState, useEffect } from 'react'
import { useRoute,useFocusEffect } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import { UserRequest } from '../../utils/request'
import Header from './Header'

const People: FC = () => {

    const route = useRoute<any>()
    const [data, setData] = useState({})


    useFocusEffect(() => {
        StatusBar.setBackgroundColor('#b8c0d7')
        return () => StatusBar.setBackgroundColor('#ebeff2')
    })

    useEffect(() => {
        ;(async () => {
            const res = await UserRequest.people({_id: route.params._id})
            setData({...res.data})
        })()
    }, [])

    console.log(data)

    return (
        <>
            <Header data={data}/>
        </>
    )
}

export default People
