import React, { FC } from 'react'
import { View, Text, StatusBar } from 'react-native'
import { useRoute, useFocusEffect } from '@react-navigation/native'


const Question: FC = () => {

    const params = useRoute<any>().params

    useFocusEffect(() => {
        StatusBar.setBackgroundColor('#fff')
        return () => StatusBar.setBackgroundColor('#ebeff2')
    })


    return (
        <View>
            <Text>question deal page</Text>
            <Text>{params._id}</Text>
        </View>
    )
}

export default Question
