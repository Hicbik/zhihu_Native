import React, { FC, useCallback } from 'react'
import { View, StatusBar, TouchableNativeFeedback } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/native'
import AsyncStorage from '@react-native-community/async-storage'
import { useTypedSelector } from '../../../../store/reducer'
import Header from './Header'


const My: FC = () => {
    const dispatch = useDispatch()
    const online_users = useTypedSelector(state => state.Notice.online_users)
    const state = useTypedSelector(state => state.User)

    useFocusEffect(
        useCallback(() => {
            StatusBar.setBackgroundColor('#158dfe')
            return () => StatusBar.setBackgroundColor('#ebeff2')
        }, [])
    )

    const _onDropOut = async () => {
        await AsyncStorage.removeItem('token')
        dispatch({
            type: 'user/dropOut'
        })
    }

    return (
        <View style={{flex: 1}}>
            <Header state={state} />
            <FooterView>
                {
                    state.isLogin && (
                        <TouchableNativeFeedback onPress={_onDropOut}>
                            <View><Quit>退出账号</Quit></View>
                        </TouchableNativeFeedback>
                    )
                }
                <FooterText style={{marginTop: 20}}>由Ts+React Native+Node驱动</FooterText>
                <FooterText>
                    迷茫是什么?迷茫就是大事干不了,小事不想干,能力配不上欲望,才华配不上梦想。
                </FooterText>
                <FooterText>© 2020 知乎 v1.0</FooterText>
                {
                    state.isLogin && !!online_users && (
                        <FooterText>-- 当前在线用户 : {online_users === 1 ? '1 (没错就是你~)' : online_users} --</FooterText>
                    )
                }
            </FooterView>
        </View>
    )
}

const FooterView = styled.View`
margin-top: 60px;
padding: 15px 30px;
`

const FooterText = styled.Text`
color: #8590a6;
text-align:center;
margin-bottom: 3px;
`
const Quit = styled.Text`
color: red;
text-align:center;
font-size: 18px;
padding: 15px;
`

export default My
