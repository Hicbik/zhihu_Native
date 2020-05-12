import React, { FC, useCallback } from 'react'
import { TouchableNativeFeedback, Text } from 'react-native'
import styled from 'styled-components/native'
import ListBase, { ItemWrapper } from '../../components/ListBase'
import AvararPeople from '../../components/AvararPeople'
import IconGengduo from '../../components/iconfont/IconGengduo'
import { UserRequest } from '../../utils/request'
import QuestionTitle from '../../components/QuestionTitle'
import ReplyContent from '../../components/ReplyContent'


interface Props {
    user_id: string
}

const DynamicList: FC<Props> = ({user_id}) => {


    const Request = useCallback(({page}: { page: number }) => {
        return UserRequest.getDynamicApp({page, user_id})
    }, [])


    const Top = ({value}: { value: any }) => {
        return (
            <AvararPeople
                avatar={value.user_id.avatar}
                nickname={value.user_id.nickname}
                text={`3分钟前·${value.type}`}
                style={{marginBottom: 10}}
            />
        )
    }

    const ReplyItem = ({value}: { value: any }) => {
        return (
            <TouchableNativeFeedback>
                <ItemWrapper style={{elevation: 1}}>
                    <Top value={value} />
                    <QuestionTitle>{value.reply_id.question_id.title}</QuestionTitle>
                    <ReplyContent>{value.reply_id.content}</ReplyContent>
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

    const QuestionItem = ({value}: { value: any }) => {
        return (
            <TouchableNativeFeedback>
                <ItemWrapper style={{elevation: 1}}>
                    <Top value={value} />
                    <QuestionTitle>{value.question_id.title}</QuestionTitle>
                    <ReplyContent>{value.question_id.content}</ReplyContent>
                    <TipsWrapper>
                        <TipsText>{value.question_id.reply_count} 回答</TipsText>
                        <TipsText style={{marginRight: 3, marginLeft: 3}}>·</TipsText>
                        <TipsText>{value.question_id.focus_problem_count} 关注</TipsText>
                        <IconGengduo style={{marginLeft: 'auto'}} color='#e1e1e1' />
                    </TipsWrapper>
                </ItemWrapper>
            </TouchableNativeFeedback>
        )
    }

    const LikeReplyItem = ({value}: { value: any }) => {
        return (
            <TouchableNativeFeedback>
                <ItemWrapper style={{elevation: 1}}>
                    <Top value={value} />
                    <QuestionTitle>{value.reply_id.question_id.title}</QuestionTitle>
                    <ReplyContent>
                        <Text style={{fontWeight: 'bold', fontSize: 14, color: '#444'}}>
                            {value.reply_id.user_id.nickname}：
                        </Text>
                        {value.reply_id.content}
                    </ReplyContent>
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
        if (item.type === '回答了问题') return ReplyItem({value: item})
        if (item.type === '关注了问题') return QuestionItem({value: item})
        if (item.type === '赞同了回答') return LikeReplyItem({value: item})
        if (item.type === '提出了问题') return QuestionItem({value: item})
        else return null
    }

    return (
        <ListBase
            Request={Request}
            renderItem={_renderItem}
            TipsTitle='动态已更新!'
        />
    )
}


const TipsWrapper = styled.View`
flex-direction: row;
align-items: center;
`

const TipsText = styled.Text`
color: #999;
font-size: 14px;
`

export default DynamicList
