import React, { FC, useCallback, useState, useRef } from 'react'
import { TouchableNativeFeedback, View, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
import ListBase, { ItemWrapper as ItemWrapperBase, Image } from '../../../../components/ListBase'
import { QuestionRequest } from '../../../../utils/request'
import { BlurView } from '@react-native-community/blur'
import QuestionTitle from '../../../../components/QuestionTitle'


const HotList: FC = () => {

    const navigation = useNavigation()
    const [tagActive, setTagActive] = useState(0)
    const tag = ['全站', '科学', '数码', '体育', '深度', '焦点']
    const ListRef = useRef<any>()

    const Request = useCallback(({page}: { page: number }) => {
        return QuestionRequest.RecommendListData({page})
    }, [])


    const LinkTo = (props: { _id: string, reply_id: string }) => () => {
        navigation.navigate('Question', {
            _id: props._id,
            reply_id: props.reply_id
        })
    }

    const _renderItem = ({item, index}: { item: any, index: number }) => {
        return (
            <TouchableNativeFeedback
                onPress={LinkTo({
                    _id: item.question_id._id,
                    reply_id: item._id
                })}
            >
                <ItemWrapper>
                    <Wrapper>
                        <View>
                            <IndexText index={index}>{index + 1}</IndexText>
                        </View>
                        <View style={{flex: 1}}>
                            <QuestionTitle style={{marginBottom: 0, fontWeight: 'bold'}}>
                                {item.question_id.title}
                            </QuestionTitle>
                            <TipsText>213热度</TipsText>
                        </View>
                        {!!item.image_field.length && <Image source={{uri: item.image_field[0]}} />}
                    </Wrapper>
                </ItemWrapper>
            </TouchableNativeFeedback>
        )
    }

    const handleActive = (index: number) => () => {
        if (index === tagActive) return
        setTagActive(index)
        ListRef.current._onRefresh()
    }

    const _headerComponent = () => {
        return (
            <HeaderWrapper>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{padding: 10}}>
                    {
                        tag.map((value, index) => (
                                <Tag
                                    key={value}
                                    active={index === tagActive}
                                    onPress={handleActive(index)}
                                    style={{marginRight: index === tag.length - 1 ? 50 : 10}}
                                >
                                    {value}
                                </Tag>
                            )
                        )
                    }
                </ScrollView>
                <BlurView
                    style={{position: 'absolute', top: 0, right: 0, width: 50, height: 50}}
                    blurType="light"
                    blurAmount={5}
                    reducedTransparencyFallbackColor="white"
                />
            </HeaderWrapper>
        )
    }

    return (
        <>
            {_headerComponent()}
            <ListBase
                renderItem={_renderItem}
                Request={Request}
                TipsColor='#f9970e'
                TipsTitle='热榜已更新'
                cRef={ListRef}
                footStyle={{ marginTop: 0}}
            />
        </>
    )
}


const HeaderWrapper = styled.View`
background-color: #fff;
padding-right: 15px;
position: relative;
`

const Tag = styled.Text`
background-color: ${props => props.active ? '#ebf5ff' : '#f6f6f6'};
color: ${(props: { active: boolean }) => props.active ? '#0084ff' : '#808080'};
padding:7px 15px;
border-radius: 5px;
`

const ItemWrapper = styled(ItemWrapperBase)`
margin-top: 0;
padding-top: 0;
padding-bottom: 0;
`

const Wrapper = styled.View`
border-bottom-width: 1px;
border-bottom-color: #f6f6f6;
flex-direction: row;
padding: 15px 0;
`

const IndexText = styled.Text`
color: ${(props: { index: number }) => props.index < 3 ? '#fff' : '#999'};
margin-right: 15px;
font-size: 16px;
background-color: ${(props: { index: number }) => props.index < 3 ? ['#ef4744', '#ff8604', '#f1b96e'][props.index] : 'transparent'};
width: 30px;
text-align:center;
border-radius: 4px;
`


const TipsText = styled.Text`
color: #999;
font-size: 13px;
margin-top: 15px;
`

export default HotList
