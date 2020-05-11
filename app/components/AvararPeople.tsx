import React, { FC } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'

interface Props {
    avatar:string,
    nickname:string,
    text:string
}

const AvararPeople: FC<Props> = ({avatar,nickname,text}) => {
    return (
        <Wrapper>
            <Avatar source={{uri: avatar}} />
            <View style={{justifyContent: 'center'}}>
                <AuthorText>{nickname}</AuthorText>
                <AuthorText style={{color: '#b0b0b0', fontSize: 12}}>{text}</AuthorText>
            </View>
        </Wrapper>
    )
}

const Wrapper = styled.View`
margin-bottom: 10px;
flex-direction: row;
`

const Avatar = styled.Image`
width: 35px;
height: 35px;
border-radius: 20px;
`

const AuthorText = styled.Text`
font-size: 14px;
margin-left: 10px;
color: #1a1a1a;
`

export default AvararPeople
