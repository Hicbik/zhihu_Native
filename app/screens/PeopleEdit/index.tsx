import React, { FC, useState, useEffect } from 'react'
import { ScrollView, View, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/native'
import { UserRequest } from '../../utils/request'
import { useTypedSelector } from '../../store/reducer'
import { RadioButton, TextInput, Avatar, Button } from 'react-native-paper'
import IconXingzhuang from '../../components/iconfont/IconXingzhuang'


const PeopleEdit: FC = () => {

    const dispatch = useDispatch()
    const state = useTypedSelector(state => state.User)
    const [user, setUser] = useState({
        nickname: '',
        one_sentence_introduction: '',
        gender: '1',
        introduction: '',
    })
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        ;(async () => {
            const res: any = await UserRequest.people({_id: state._id!})
            setUser({
                nickname: res.data.nickname,
                one_sentence_introduction: res.data.one_sentence_introduction,
                gender: res.data.gender.toString(),
                introduction: res.data.introduction,
            })
        })()
    }, [state._id])


    const _onButton = async () => {
        if (!user.nickname.length) return ToastAndroid.show('昵称不能为空哦!', ToastAndroid.SHORT)

        let i = 0
        for (let key in user) {
            // @ts-ignore
            i = state[key].toString() === user[key].toString() ? i + 1 : i
        }
        if (i === 4) return ToastAndroid.show('明明都没有编辑过', ToastAndroid.SHORT)

        setLoading(true)

        const res = await UserRequest.Edit({
            nickname: user.nickname,
            one_sentence_introduction: user.one_sentence_introduction,
            gender: user.gender,
            introduction: user.introduction,
            avatar: ''
        })
        setLoading(false)
        ToastAndroid.show('保存成功！', ToastAndroid.SHORT)
        dispatch({
            type: 'user/signIn',
            value: res.data
        })
    }

    console.log(user)

    return (
        <ScrollView style={{padding: 15, backgroundColor: '#fff'}} showsVerticalScrollIndicator={false}>
            <View style={{height: 800}}>
                <AvatarView>
                    <Avatar.Image size={80} source={{uri: state.avatar}} />
                    <IconXingzhuang color='#fff' size={26} style={{position: 'absolute', top: 27, left: 27}} />
                </AvatarView>
                <KeyboardAvoidingView behavior='position' style={{marginTop: 15}}>
                    <Title>基本资料</Title>
                    <RowView>
                        <NameText>用户名</NameText>
                        <Input
                            value={user.nickname}
                            onChangeText={nickname => setUser({...user, nickname})}
                            maxLength={10}
                        />
                    </RowView>
                    <View style={{borderBottomWidth: 1, borderBottomColor: '#f6f6f6', paddingTop: 10, height: 100}}>
                        <NameText style={{width: 'auto'}}>
                            一句话介绍 {!!user.one_sentence_introduction.length && `(${user.one_sentence_introduction.length}/30)`}
                        </NameText>
                        <Input
                            value={user.one_sentence_introduction}
                            onChangeText={one_sentence_introduction => setUser({...user, one_sentence_introduction})}
                            maxLength={30}
                            style={{flex: 1, width: '100%'}}
                            multiline
                        />
                    </View>
                    <RowView>
                        <NameText>性别</NameText>
                        <NameText style={{width: 'auto', color: '#444'}}>男</NameText>
                        <RadioButton
                            value='男'
                            status={user.gender === '1' ? 'checked' : 'unchecked'}
                            onPress={() => setUser({...user, gender: '1'})}
                            color='#0084ff'
                        />
                        <NameText style={{width: 'auto', color: '#444', marginLeft: 30}}>女</NameText>
                        <RadioButton
                            value='女'
                            status={user.gender === '0' ? 'checked' : 'unchecked'}
                            onPress={() => setUser({...user, gender: '0'})}
                            color='#0084ff'
                        />
                    </RowView>
                    <Title style={{marginTop: 50}}>个人简介</Title>
                    <TextInput
                        value={user.introduction}
                        onChangeText={introduction => setUser({...user, introduction})}
                        multiline
                        style={{backgroundColor: '#fff'}}
                        dense
                        maxLength={200}
                    />
                </KeyboardAvoidingView>
                <Button
                    mode='contained'
                    loading={loading}
                    onPress={_onButton}
                    style={{marginTop: 20}}
                    disabled={loading}
                >
                    保存
                </Button>
            </View>
        </ScrollView>
    )
}

const AvatarView = styled.View`
position: relative;
`
const RowView = styled.View`
align-items: center;
flex-direction: row;
border-bottom-width: 1px;
border-bottom-color: #f6f6f6;
padding: 10px 0;
`
const Title = styled.Text`
color: #1a1a1a;
font-size: 20px;
`
const NameText = styled.Text`
color: #808080;
font-size: 16px;
width: 80px;
`
const Input = styled.TextInput`
flex: 1;
font-size: 16px;
color: #444;
`

export default PeopleEdit
