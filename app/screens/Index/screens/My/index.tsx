import React, { FC ,useCallback} from 'react'
import { StatusBar } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { useTypedSelector } from '../../../../store/reducer'
import Header from './Header'

const My: FC = () => {

    const state = useTypedSelector(state => state.User)

    useFocusEffect(
        useCallback(()=>{
            StatusBar.setBackgroundColor('#158dfe')
            return () => StatusBar.setBackgroundColor('#ebeff2')
        },[])
    )


    return (
        <>
            <Header state={state} />
        </>
    )
}

export default My
