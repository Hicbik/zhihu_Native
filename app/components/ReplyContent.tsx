import React, { FC } from 'react'
import styled from 'styled-components/native'

interface Props {
    children: React.ReactNode,
    ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip',
    numberOfLines?: number,
    style?: any
}

const ReplyContent: FC<Props> = ({
    children,
    ellipsizeMode = 'tail',
    numberOfLines = 2,
    style
}) => {
    return (
        <Wrapper ellipsizeMode={ellipsizeMode} numberOfLines={numberOfLines} style={style}>
            {children}
        </Wrapper>
    )
}


const Wrapper = styled.Text`
color: #444;
font-size: 14px;
margin-bottom: 5px;
`

export default ReplyContent
