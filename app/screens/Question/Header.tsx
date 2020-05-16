import React, { FC } from 'react'
import { Dimensions } from 'react-native'
import styled from 'styled-components/native'
import IconArrowRight from '../../components/iconfont/IconArrowRight'

const screenWidth = Math.round(Dimensions.get('window').width)


interface Props {
    title:string,
    reply_count:number
}

const Header: FC<Props> = ({title,reply_count}) => {
    return (
        <Wrapper>
            <Title ellipsizeMode='tail' numberOfLines={1}>
                {title}
            </Title>
            <View>
                <Tips>知乎·全部 {reply_count} 个回答 </Tips>
                <IconArrowRight color='#999' size={14} />
            </View>
        </Wrapper>
    )
}

const Right: FC = () => {
    return (
        <RightText>
            写回答
        </RightText>
    )
}

const Wrapper = styled.View`
max-width: ${screenWidth * 0.7}px;
margin-left: -20px;
`
const Title = styled.Text`
color: #1a1a1a;
font-size: 16px;
font-weight: bold;
`

const View = styled.View`
flex-direction: row;
align-items: center;
`

const Tips = styled.Text`
font-size: 12px;
color: #999;
`

const RightText = styled.Text`
color: #0084ff;
padding-right: 15px;
`

export { Header, Right }
