import React, { FC } from 'react'
import { View, Text, StatusBar } from 'react-native'
import { useRoute, useFocusEffect } from '@react-navigation/native'


const Question: FC = () => {


    useFocusEffect(() => {
        StatusBar.setBackgroundColor('#fff')
        return () => StatusBar.setBackgroundColor('#ebeff2')
    })

    const route = useRoute<any>()

    return (
        <View>
            <Text>question deal page</Text>
            <Text>{route.params._id}</Text>
        </View>
    )
}

export default Question
