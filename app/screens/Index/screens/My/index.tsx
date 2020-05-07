import React, { FC } from 'react'
import { StatusBar } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { useLocalStore, useObserver } from 'mobx-react-lite'
import store from '../../../../store'
import Header from './Header'

const My: FC = () => {

    const state = useLocalStore(() => store.User.store)

    useFocusEffect(() => {
        StatusBar.setBackgroundColor('#158dfe')
        return () => {
            StatusBar.setBackgroundColor('#ebeff2')
        }
    })


    return useObserver(() => (
        <>
            <Header state={state}  />
        </>
    ))
}

export default My
