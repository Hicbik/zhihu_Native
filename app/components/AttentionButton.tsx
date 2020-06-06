import React, { FC, useState } from 'react'
import styled from 'styled-components/native'
import { TouchableNativeFeedback, Alert, ActivityIndicator } from 'react-native'
import IconJiahao1 from './iconfont/IconJiahao1'
import { UserRequest } from '../utils/request'

interface Props {
    user_id: string,
    people_id: string,
    fans: string[],
}


const AttentionButton: FC<Props> = ({
    user_id,
    fans,
    people_id,
}) => {

    const [state, setState] = useState(() => fans.includes(user_id))
    const [loading, setLoading] = useState(false)


    const _onButton = async () => {
        const time = setTimeout(() => setLoading(true), 500)
        const res = await UserRequest.attention({_id: people_id, type: state ? 'noLike' : 'like'})
        clearTimeout(time)
        setLoading(false)
        if (res.state === 'err') {
            setState(fans.includes(user_id))
            return
        }
        setState(res.data.includes(user_id))
    }

    const _onPress = () => {
        if (people_id === user_id) return
        if (state) {
            Alert.alert(
                '',
                `确定要取消关注 阿库娅 吗?`,
                [
                    {text: '放弃'},
                    {text: '取消关注', onPress: _onButton},
                ],
                {cancelable: true}
            )
        } else {
            _onButton()
        }
    }

    if (user_id === people_id) return null

    return (
        <TouchableNativeFeedback style={{borderRadius: 4}} onPress={_onPress} disabled={loading}>
            {
                loading ? (
                    <Wrapper>
                        <ActivityIndicator />
                    </Wrapper>
                ) : (
                    state ? (
                        <StateWrapper>
                            <StateText>已关注</StateText>
                        </StateWrapper>
                    ) : (
                        <Wrapper>
                            <IconJiahao1 color='#0084ff' size={12} />
                            <Text>关注</Text>
                        </Wrapper>
                    )
                )
            }
        </TouchableNativeFeedback>
    )
}


const Wrapper = styled.View`
padding: 6px 0;
width: 65px;
border-radius: 4px;
border-width: 1px;
border-color:  #0084ff;
flex-direction: row;
justify-content: center;
align-items: center;
`

const Text = styled.Text`
color: #0084ff;
font-size: 12px;
margin-left: 5px;
`

const StateWrapper = styled(Wrapper)`
background-color: #ebebeb;
border-color: #ebebeb;
`

const StateText = styled.Text`
color: #9e9e9e;
font-size: 12px;
`

export default AttentionButton
