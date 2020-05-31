import React, { FC, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import styled from 'styled-components/native'
import { NoticeIo } from '../../utils/io'

interface Props {
    people_id: string,
    user: any
}


const Input: FC<Props> = ({people_id,user}) => {

    const [value, setValue] = useState('')


    const _onSend = () => {
        NoticeIo.SendChat({
            send_user: {_id: user._id, avatar: user.avatar, nickname: user.nickname},
            receive_user_id: people_id,
            message: value
        })
        setValue('')
    }

    return (
        <Wrapper>
            <TextInput
                value={value}
                onChangeText={text => setValue(text)}
                placeholder=' 请输入内容'
                multiline
            />
            <SendView>
                <TouchableOpacity disabled={!value.length} onPress={_onSend}>
                    <View style={{height: 50, justifyContent: 'center', opacity: !value.length ? 0.3 : 1}}>
                        <Text>发送</Text>
                    </View>
                </TouchableOpacity>
            </SendView>
        </Wrapper>
    )
}

const Wrapper = styled.View`
margin-top: auto;
min-height: 50px;
max-height: 300px;
background-color: #fff;
padding: 0 15px;
flex-direction: row;
align-items: center;
border-top-color: #d3d3d3;
border-top-width: 0.5px;
`
const TextInput = styled.TextInput`
font-size: 16px;
flex: 1;
`
const Text = styled.Text`
color: #0084ff;
font-size: 18px;
`
const SendView = styled.View`
flex-direction: column-reverse;
height: 100%;
`

export default Input
