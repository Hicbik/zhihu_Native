import React, { FC, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
import IconClose from '../../components/iconfont/IconClose'
import Button from '../../components/Button'
import { UserRequest } from '../../utils/request'
import {useLocalStore} from 'mobx-react-lite'
import store from '../../store'

const SignIn: FC = () => {
    const state = useLocalStore(()=>store.User)
    const navigation = useNavigation()
    const [user, setUser] = useState({
        phone: '',
        password: '',
        verifyPassword: ''
    })
    const [type, setType] = useState('登录')
    const [focus, setFocus] = useState('')

    const isDisabled = () => {
        if (type === '登录') return user.password.length > 5 && (/^1[3456789]\d{9}$/.test(user.phone))
        if (type === '注册') {
            return user.password.length > 5 && (/^1[3456789]\d{9}$/.test(user.phone)) && user.verifyPassword === user.password
        }
    }

    const goBack = () => {
        navigation.goBack()
    }

    const _handleFocus = (name: string) => () => {
        setFocus(name)
    }

    const _haddleType = () => {
        setType(type === '登录' ? '注册' : '登录')
        setUser({
            phone: '',
            password: '',
            verifyPassword: ''
        })
    }

    const _onButton = async () => {
        const {phone, password} = user
        let res: any
        if (type === '注册') res = await UserRequest.signUp({phone, password})
        if (type === '登录') res = await UserRequest.signIn({phone, password})
        state.SignIn(res.data)
    }

    return (
        <Wrapper>
            <Header>
                <TouchableOpacity onPress={goBack}>
                    <IconClose size={24} color='#808080' />
                </TouchableOpacity>
            </Header>
            <Title>{type === '登录' ? '登录知乎，体验更多功能!' : '注册知乎，发现更大世界!'}</Title>
            <Box>
                <Input
                    placeholder=' 输入手机号'
                    value={user.phone}
                    onChangeText={(phone: any) => setUser({...user, phone})}
                    keyboardType='numeric'
                    maxLength={15}
                    placeholderTextColor='#bfbfbf'
                    focus={focus === 'phone'}
                    onFocus={_handleFocus('phone')}
                    onBlur={_handleFocus('')}
                />
                <Input
                    placeholder=' 输入密码'
                    value={user.password}
                    onChangeText={(password: any) => setUser({...user, password})}
                    maxLength={20}
                    placeholderTextColor='#bfbfbf'
                    focus={focus === 'password'}
                    onFocus={_handleFocus('password')}
                    onBlur={_handleFocus('')}
                    secureTextEntry
                />
                {
                    type === '注册' && (
                        <Input
                            placeholder=' 确认密码'
                            value={user.verifyPassword}
                            onChangeText={(verifyPassword: any) => setUser({...user, verifyPassword})}
                            keyboardType='numeric'
                            maxLength={15}
                            placeholderTextColor='#bfbfbf'
                            focus={focus === 'verifyPassword'}
                            onFocus={_handleFocus('verifyPassword')}
                            onBlur={_handleFocus('')}
                            secureTextEntry
                        />
                    )
                }
                <View style={{marginTop: 10}}><
                    Button onPress={_onButton} disabled={!isDisabled()}>{type}</Button>
                </View>
                <View style={{marginTop: 15}}>
                    <TouchableOpacity onPress={_haddleType}>
                        <Tips> {type === '登录' ? '没有账号?去注册' : '已有账号?去登录'}</Tips>
                    </TouchableOpacity>
                </View>
            </Box>
        </Wrapper>
    )
}

const Wrapper = styled.View`
padding: 25px 20px;
background-color: #fff;
flex: 1;
`
const Header = styled.View`
flex-direction: row;
align-items: center;
`
const Title = styled.Text`
color: #1a1a1a;
font-size: 22px;
text-align:center;
margin: 25px 0;
`
const Box = styled.View`
padding: 15px;
`
const Input = styled.TextInput`
border-bottom-width: 2px;
border-bottom-color: ${props => props.focus ? '#0084ff' : '#d3d3d3'};
font-size: 18px;
margin-bottom: 10px;
`
const Tips = styled.Text`
color: #8590a6;
font-size: 14px;
`

export default SignIn
