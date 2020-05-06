import React, { FC } from 'react'
import { View, Text } from 'react-native'
import { useRoute } from '@react-navigation/native'


const Question: FC = () => {

    const route = useRoute<any>()

    return (
        <View>
            <Text>question deal page</Text>
            <Text>{route.params._id}</Text>
        </View>
    )
}

export default Question
