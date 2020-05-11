import React, { FC, useCallback } from 'react'
import { TouchableNativeFeedback,View } from 'react-native'
import styled from 'styled-components/native'
import ListBase, { ItemWrapper } from '../../components/ListBase'
import AvararPeople from '../../components/AvararPeople'
import IconGengduo from '../../components/iconfont/IconGengduo'
import { UserRequest } from '../../utils/request'


interface Props {
    user_id: string
}

const DynamicList: FC<Props> = ({user_id}) => {


    const Request = useCallback(({page}: { page: number }) => {
        return UserRequest.getDynamicApp({page, user_id})
    }, [])

    const ReplyItem = ({value}: { value: any }) => {
        return (
            <TouchableNativeFeedback>
                <ItemWrapper style={{elevation: 1}}>
                    <AvararPeople
                        avatar={value.user_id.avatar}
                        nickname={value.user_id.nickname}
                        text={`3分钟前·${value.type}`}
                    />
                    <Title>{value.reply_id.question_id.title}</Title>
                    <Content ellipsizeMode='tail' numberOfLines={3}>{value.reply_id.content}</Content>
                    <TipsWrapper>
                        <TipsText>{value.reply_id.like_count} 赞同</TipsText>
                        <TipsText style={{marginRight: 3, marginLeft: 3}}>·</TipsText>
                        <TipsText>{value.reply_id.comment_count} 评论</TipsText>
                        <IconGengduo style={{marginLeft: 'auto'}} color='#e1e1e1' />
                    </TipsWrapper>
                </ItemWrapper>
            </TouchableNativeFeedback>
        )
    }

    const _renderItem = ({item}: { item: any }) => {
        if (item.type === '回答了问题') return <ReplyItem value={item} />
        else return <Title>adas</Title>
    }

    return (
           <ListBase
               Request={Request}
               renderItem={_renderItem}
               TipsTitle='动态已更新!'
           />
    )
}


const Title = styled.Text`
font-size: 16px;
color: #1a1a1a;
margin-bottom: 5px;
`

const Content = styled.Text`
color: #444;
font-size: 14px;
margin-bottom: 5px;
flex: 1;
`

const TipsWrapper = styled.View`
flex-direction: row;
align-items: center;
`

const TipsText = styled.Text`
color: #999;
font-size: 14px;
`

export default DynamicList
