import React, { FC, useCallback } from 'react'
import { TouchableNativeFeedback, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
import ListBase, { ItemWrapper, Image } from '../../../../components/ListBase'
import { QuestionRequest } from '../../../../utils/request'
import IconGengduo from '../../../../components/iconfont/IconGengduo'
import QuestionTitle from '../../../../components/QuestionTitle'
import ReplyContent from '../../../../components/ReplyContent'


const RecommendList: FC = () => {

    const navigation = useNavigation()

    const Request = useCallback(({page}: { page: number }) => {
        return QuestionRequest.RecommendListData({page})
    }, [])

    const LinkTo = (props: { _id: string, title: string, reply_count: number, reply_id: string }) => () => {
        navigation.navigate('Question', {
            _id: props._id,
            title: props.title,
            reply_count: props.reply_count,
            reply_id: props.reply_id
        })
    }

    const _renderItem = ({item}: { item: any }) => {
        return (
            <TouchableNativeFeedback
                onPress={LinkTo({
                    _id: item.question_id._id,
                    title: item.question_id.title,
                    reply_count: item.question_id.reply_count,
                    reply_id: item._id
                })}
            >
                <ItemWrapper style={{elevation: 1}}>
                    <QuestionTitle style={{fontWeight: 'bold', marginBottom: 0}}>
                        {item.question_id.title}
                    </QuestionTitle>
                    <ContentWrapper>
                        <View style={{flex: 1}}>
                            <AuthorWrapper>
                                <Avatar source={{uri: item.user_id.avatar}} />
                                <AuthorText style={{color: '#646464'}}>{item.user_id.nickname}</AuthorText>
                                <AuthorText style={{color: '#999'}}>
                                    {item.user_id.one_sentence_introduction}
                                </AuthorText>
                            </AuthorWrapper>
                            <ReplyContent>{item.content}</ReplyContent>
                        </View>
                        {!!item.image_field.length && <Image source={{uri: item.image_field[0]}} />}
                    </ContentWrapper>

                    <TipsWrapper>
                        <TipsText>{item.like_count} 赞同</TipsText>
                        <TipsText style={{marginRight: 3, marginLeft: 3}}>·</TipsText>
                        <TipsText>{item.comment_count} 评论</TipsText>
                        <IconGengduo style={{marginLeft: 'auto'}} color='#e1e1e1' />
                    </TipsWrapper>
                </ItemWrapper>
            </TouchableNativeFeedback>
        )
    }

    return (
        <ListBase
            renderItem={_renderItem}
            Request={Request}
            TipsColor='#0084ff'
            TipsTitle='推荐已更新'
        />
    )
}


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

const ContentWrapper = styled.View`
flex-direction: row;
align-items: center;
`

const TipsWrapper = styled.View`
flex-direction: row;
align-items: center;
`

const TipsText = styled.Text`
color: #999;
font-size: 14px;
`

export default RecommendList
