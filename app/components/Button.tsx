import React, { FC } from 'react'
import { TouchableNativeFeedback } from 'react-native'
import styled from 'styled-components/native'


interface Porps {
    children:any,
    disabled?:boolean,
    onPress:()=>any
}

const Button:FC<Porps> = ({children,disabled,onPress}) => {


    return (
        <TouchableNativeFeedback style={{borderRadius:3}} onPress={onPress} disabled={disabled}>
            <ButtonWrapper disabled={disabled}>
                <ButtonText>{children}</ButtonText>
            </ButtonWrapper>
        </TouchableNativeFeedback>
    )
}

const ButtonWrapper = styled.View`
background-color: ${props => props.disabled ? '#cee7fb' : '#0084ff'};
border-radius: 3px;
padding: 10px;
`
const ButtonText = styled.Text`
color: #fff;
font-size: 16px;
text-align:center;
`

export default Button
