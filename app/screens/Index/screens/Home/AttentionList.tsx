import React, { FC, useCallback, useEffect, useState } from 'react'
import { TouchableOpacity, TouchableNativeFeedback, View, FlatList, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
import ListBase, { ItemWrapper, Image } from '../../../../components/ListBase'
import { QuestionRequest, UserRequest } from '../../../../utils/request'
import IconGengduo from '../../../../components/iconfont/IconGengduo'
import IconXiangshangsanjiaoxing from '../../../../components/iconfont/IconXiangshangsanjiaoxing'
import IconPinglun from '../../../../components/iconfont/IconPinglun'
import AvararPeople from '../../../../components/AvararPeople'
import QuestionTitle from '../../../../components/QuestionTitle'
import ReplyContent from '../../../../components/ReplyContent'
import { useTypedSelector } from '../../../../store/reducer'
import { DiffTime } from '../../../../utils/time'
import { LinkToPeople, LinkToQuestion } from '../../../../utils/LinkTo'


const AttentionList: FC = () => {

    const state = useTypedSelector(state => state.User)
    const [attentionPeople, setAttentionPeople] = useState<any[]>([])

    useEffect(() => {
        ;(async () => {
            const res = await UserRequest.getAttentionPeople({_id: state._id!,page:1, type: 'all'})
            setAttentionPeople([...res.data])
        })()
    }, [state.isLogin])



    const Request = useCallback(({page}: { page: number }) => {
        return QuestionRequest.PeopleAttentionReply({page, attentionList: state.attention!})
    }, [state.isLogin])

    const LinkTo = (_id: string) => () => {
        LinkToPeople({_id})
    }

    const _renderItem = ({item}: { item: any }) => {
        return (
            <TouchableNativeFeedback onPress={LinkToQuestion({_id: item.question_id._id, reply_id: item._id})}>
                <ItemWrapper style={{elevation: 1}}>
                    <View>
                        <AvararPeople
                            avatar={item.user_id.avatar}
                            nickname={item.user_id.nickname}
                            text={`${DiffTime(item.create_time)}·回答了`}
                            style={{marginBottom: 10}}
                        />
                        <QuestionTitle>{item.question_id.title}</QuestionTitle>
                        <ContentWrapper>
                            <ReplyContent numberOfLines={3} style={{flex: 1}}>{item.content}</ReplyContent>
                            {!!item.image_field.length && <Image source={{uri: item.image_field[0]}} />}
                        </ContentWrapper>
                    </View>
                    <TipsWrapper>
                        <Tips>
                            <IconXiangshangsanjiaoxing color='#999' />
                            <TipsText>{item.like_count}</TipsText>
                        </Tips>
                        <Tips>
                            <IconPinglun color='#999' />
                            <TipsText>{item.comment_count}</TipsText>
                        </Tips>
                        <IconGengduo style={{marginLeft: 'auto'}} color='#e1e1e1' />
                    </TipsWrapper>
                </ItemWrapper>
            </TouchableNativeFeedback>
        )
    }


    const _headerItem = ({item, index}: { item: any, index: number }) => {
        return (
            <TouchableOpacity onPress={LinkTo(item._id)}>
                <HeaderWrapper style={{marginRight: index === attentionPeople.length - 1 ? 15 : 3}}>
                    <HeaderAvatar source={{uri: item.avatar}} />
                    <HeaderText ellipsizeMode='tail' numberOfLines={1}>{item.nickname}</HeaderText>
                </HeaderWrapper>
            </TouchableOpacity>
        )
    }

    const _headerComponent = () => {
        return (
            <>
                <Text style={{fontSize: 12, marginLeft: 15, color: '#808080', marginTop: 10}}>我的关注</Text>
                <FlatList
                    data={attentionPeople}
                    renderItem={_headerItem}
                    keyExtractor={((item) => item._id)}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </>
        )
    }

    return (
        <ListBase
            renderItem={_renderItem}
            Request={Request}
            TipsColor='#0084ff'
            TipsTitle='关注已更新'
            ListHeaderComponent={_headerComponent}
        />
    )
}

const HeaderWrapper = styled.View`
width: 50px;
margin-top: 10px;
margin-left: 15px;
`

const HeaderAvatar = styled.Image`
width: 45px;
height: 45px;
border-radius: 25px;
margin-bottom: 5px;
`

const HeaderText = styled.Text`
color: #646464;
font-size: 10px;
text-align:center;
`

const ContentWrapper = styled.View`
flex-direction: row;
margin-bottom: 10px;
`

const TipsWrapper = styled.View`
flex-direction: row;
align-items: center;
`

const Tips = styled.View`
flex-direction: row;
align-items: center;
margin-right: 20px;
`

const TipsText = styled.Text`
color: #999;
font-size: 14px;
margin-left: 5px;
`

export default AttentionList
