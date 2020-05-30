import React, { FC, useCallback } from 'react'
import { Dimensions, TouchableNativeFeedback } from 'react-native'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import ListBase, { ItemWrapper, Image } from '../../components/ListBase'
import { QuestionRequest } from '../../utils/request'
import ReplyContent from '../../components/ReplyContent'
import { DiffTime } from '../../utils/time'
import Header from './Header'
import { LinkToQuestion } from '../../utils/LinkTo'

interface Props {
    question_id: string,
    data: any
}

const screenWidth = Math.round(Dimensions.get('window').width)


const ReplyList: FC<Props> = ({question_id, data}) => {
    const navigation = useNavigation()
    const Request = useCallback(({page}: { page: number }) => {
        return QuestionRequest.getReply({question_id, page})
    }, [question_id])


    const _renderItem = ({item}: { item: any }) => {
        return (
            <TouchableNativeFeedback
                onPress={LinkToQuestion({
                    _id: item.question_id,
                    reply_id: item._id
                })}
            >
                <ItemWrapper style={{elevation: 1}}>
                    <AuthorWrapper>
                        <Avatar source={{uri: item.user_id.avatar}} />
                        <AuthorText style={{color: '#646464'}}>{item.user_id.nickname}</AuthorText>
                    </AuthorWrapper>
                    <ContentWrapper>
                        <ReplyContent style={{flex: 1}}>{item.content}</ReplyContent>
                        {!!item.image_field.length && <Image source={{uri: item.image_field[0]}} />}
                    </ContentWrapper>
                    <TipsWrapper>
                        <TipsText>{item.like_count} 赞同</TipsText>
                        <TipsText style={{marginRight: 3, marginLeft: 3}}>·</TipsText>
                        <TipsText>{item.comment_count} 评论</TipsText>
                        <TipsText style={{marginRight: 3, marginLeft: 3}}>·</TipsText>
                        <TipsText>{DiffTime(item.create_time)}</TipsText>
                    </TipsWrapper>
                </ItemWrapper>
            </TouchableNativeFeedback>
        )
    }

    const _ListHeaderComponent = () => <Header data={data} />

    const _onScroll = ({nativeEvent}: { nativeEvent: any }) => {
        const {y} = nativeEvent.contentOffset
        if (y > 60) {
            navigation.setOptions({
                headerTitle: () => (
                    <Title numberOfLines={1}>{data.title}</Title>
                )
            })
        } else {
            navigation.setOptions({
                headerTitle: () => null
            })
        }
    }

    return (
        <ListBase
            renderItem={_renderItem}
            Request={Request}
            TipsColor='#0084ff'
            TipsTitle='回答已更新'
            ListHeaderComponent={_ListHeaderComponent}
            onScroll={_onScroll}
        />
    )
}

const Title = styled.Text`
font-size: 18px;
color: #1a1a1a;
margin-left: -20px;
width: ${screenWidth * 0.8}px;
`
const ContentWrapper = styled.View`
flex-direction: row;
margin-bottom: 10px;
`
const TipsWrapper = styled.View`
flex-direction: row;
align-items: center;
`
const TipsText = styled.Text`
color: #999;
font-size: 14px;
margin-left: 5px;
`
const AuthorWrapper = styled.View`
margin-top: 5px;
margin-bottom: 5px;
flex-direction: row;
align-items: center;
`
const Avatar = styled.Image`
width: 22px;
height: 22px;
border-radius: 11px;
`
const AuthorText = styled.Text`
font-size: 14px;
margin-left: 5px;
`
export default ReplyList
