import React, { FC } from 'react'
import { TouchableNativeFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
import IconArrowRight from '../../components/iconfont/IconArrowRight'

interface Props {
    data: any,
    isMy:boolean
}

const PeopleTab: FC<Props> = ({data,isMy}) => {

    const navigation = useNavigation()

    const LinkTo = ({title, type}: { title: string, type: string }) => () => {
        navigation.navigate('PeopleDeal', {title: `${data.nickname}${title}`, user_id: data._id, type})
    }

    return (
        <Wrapper>
            <TouchableNativeFeedback onPress={LinkTo({title: '的动态', type: '动态'})}>
                <ItemWrapper>
                    <Text>{isMy ? '我' : 'Ta'}的动态</Text>
                    <View>
                        <IconArrowRight />
                    </View>
                </ItemWrapper>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={LinkTo({title: '的回答', type: '回答'})}>
                <ItemWrapper>
                    <Text>{isMy ? '我' : 'Ta'}的回答</Text>
                    <View>
                        <IconArrowRight />
                    </View>
                </ItemWrapper>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={LinkTo({title: '的提问', type: '提问'})}>
                <ItemWrapper>
                    <Text>{isMy ? '我' : 'Ta'}的提问</Text>
                    <View>
                        <IconArrowRight />
                    </View>
                </ItemWrapper>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={LinkTo({title: '关注的人', type: '关注'})}>
                <ItemWrapper>
                    <Text>{isMy ? '我' : 'Ta'}关注的人</Text>
                    <View>
                        <IconArrowRight />
                    </View>
                </ItemWrapper>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={LinkTo({title: '的粉丝', type: '粉丝'})}>
                <ItemWrapper>
                    <Text>{isMy ? '我' : 'Ta'}的粉丝</Text>
                    <View>
                        <IconArrowRight />
                    </View>
                </ItemWrapper>
            </TouchableNativeFeedback>
        </Wrapper>
    )
}

const Wrapper = styled.View`

`

const ItemWrapper = styled.View`
padding: 15px;
border-bottom-width: 1px;
border-bottom-color: #f6f6f6;
flex-direction: row;
justify-content: space-between;
align-items: center;
`

const View = styled.View`
flex-direction: row;
align-items: center;
`

const Text = styled.Text`
color: #1a1a1a;
font-size: 16px;
`


export default PeopleTab
