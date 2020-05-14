import React, { FC } from 'react'
import { useRoute } from '@react-navigation/native'
import Reply from './Reply'
import { useTypedSelector } from '../../store/reducer'
import { View } from 'react-native'


const Question: FC = () => {


    const params = useRoute<any>().params
    const state = useTypedSelector(state => state.User)

    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Reply question_id={params._id} state={state} />
        </View>
    )
}

export default Question
