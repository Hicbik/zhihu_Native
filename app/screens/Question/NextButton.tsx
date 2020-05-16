import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import IconXiayige from '../../components/iconfont/IconXiayige'


interface Props {
    onPress: () => any
}

const NextButton: FC<Props> = ({onPress}) => {

    return (
        <Wrapper style={{elevation: 3}}>
            <TouchableOpacity
                style={{width: 50, height: 50, justifyContent: 'center', alignItems: 'center'}}
                onPress={onPress}
            >
                <IconXiayige color='#1a1a1a' size={16} />
            </TouchableOpacity>
        </Wrapper>

    )
}

const Wrapper = styled.View`
position: absolute;
top: 50%;
right: 15px;
width: 50px;
height: 50px;
border-radius: 25px;
background-color: #fff;
`


export default NextButton
