import React, { FC, useState } from 'react'
import { ActivityIndicator, TouchableNativeFeedback } from 'react-native'
import styled from 'styled-components/native'


interface Porps {
    children: any,
    disabled?: boolean,
    onPress: () => any,
    style?: any
}

const Button: FC<Porps> = ({children, disabled, onPress, style}) => {
    const [loading, setLoading] = useState(false)

    const _onPress = async () => {
        const time = setTimeout(() => setLoading(true), 700)
        await onPress()
        clearTimeout(time)
        setLoading(false)
    }

    return (
        <TouchableNativeFeedback style={{borderRadius: 3}} onPress={_onPress} disabled={disabled || loading}>
            <ButtonWrapper disabled={disabled || loading} style={{...style}}>
                {loading && <ActivityIndicator color="#fff" style={{marginRight: 10}} />}
                <ButtonText>{children}</ButtonText>
            </ButtonWrapper>
        </TouchableNativeFeedback>
    )
}

const ButtonWrapper = styled.View`
background-color: ${(props: { disabled: boolean | undefined }) => props.disabled ? '#cee7fb' : '#0084ff'};
border-radius: 3px;
padding: 10px;
flex-direction: row;
justify-content: center;
align-items: center;
`
const ButtonText = styled.Text`
color: #fff;
font-size: 16px;
text-align:center;
`

export default Button
