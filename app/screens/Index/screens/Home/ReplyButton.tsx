import React, { FC, useState } from 'react'
import { Text, View, TouchableWithoutFeedback, Animated } from 'react-native'
import {useNavigation} from '@react-navigation/native'
import IconBi from '../../../../components/iconfont/IconBi'


interface Props {
    question_id:string,
    title:string,
    setVisible:(state:boolean)=>any
}

const ReplyButton: FC<Props> = ({question_id,title,setVisible}) => {

    const navigation = useNavigation()
    const [fix] = useState(new Animated.Value(1))

    const _onButton = () => {
        Animated.timing(fix, {useNativeDriver: true, toValue: 0.8, duration: 200}).start(() => {
            Animated.timing(fix, {useNativeDriver: true, toValue: 1, duration: 200}).start(() => {
                setVisible(false)
                navigation.navigate('ReplyEdit', {question_id, title})
            })
        })
    }

    return (
        <TouchableWithoutFeedback onPress={_onButton}>
            <View style={{alignItems: 'center'}}>
                <Animated.View
                    style={{
                        elevation: 5,
                        transform: [{scale: fix}],
                        backgroundColor: '#0084ff',
                        width: 65,
                        height: 65,
                        borderRadius: 32.5,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <IconBi color='#fff' size={18} style={{marginLeft: -2}} />
                </Animated.View>
                <Text style={{marginTop: 10, color: '#444', fontSize: 13}}>写回答</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ReplyButton
