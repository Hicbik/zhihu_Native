import React, { FC } from 'react'
import { TouchableNativeFeedback } from 'react-native'
import styled from 'styled-components/native'


interface Props {
    content: string,
    minorText: string,
    onPress: () => any
}

const ContentBox: FC<Props> = ({content, minorText,onPress}) => {
    return (
        <TouchableNativeFeedback
            style={{borderRadius: 10}}
            onPress={onPress}
        >
            <ContentWrapper>
                <Content>{content}</Content>
                <MinorText>{minorText}</MinorText>
            </ContentWrapper>
        </TouchableNativeFeedback>
    )
}

const ContentWrapper = styled.View`
padding: 10px;
background-color: #f6f6f6;
border-radius: 10px;
margin-top: 10px;
`
const Content = styled.Text`
color: #646464;
`
const MinorText = styled.Text`
margin-top: 5px;
padding: 5px 10px;
background-color: #fff;
color: #646464;
border-radius: 10px;
`

export default ContentBox
