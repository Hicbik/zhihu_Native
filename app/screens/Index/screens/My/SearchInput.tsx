import React, { FC } from 'react'
import {  TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
import Icon from '../../../../components/iconfont/Icon'

const SearchInput: FC = () => {
    const navigation = useNavigation()

    const LinkTo = () => {
        navigation.navigate('Search')
    }

    return (
        <Wrapper>
            <TouchableWithoutFeedback onPress={LinkTo}>
                <Input>
                    <Icon size={22} color='#83c3ff' />
                    <Text ellipsizeMode='tail' numberOfLines={1}>欢迎来到知乎</Text>
                </Input>
            </TouchableWithoutFeedback>
        </Wrapper>
    )
}

const Wrapper = styled.View`
flex-direction: row;
align-items: center;
`

const Input = styled.View`
flex: 1;
height: 40px;
background-color: #0788ff;
border-radius: 8px;
flex-direction: row;
align-items: center;
justify-content: center;
padding: 0 25px;
`
const Text = styled.Text`
font-size: 16px;
color: #83c3ff;
margin-left: 10px;
`

export default SearchInput
