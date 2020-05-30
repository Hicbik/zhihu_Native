import React, { FC } from 'react'
import { Dimensions, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components/native'
import IconArrowRight from '../../components/iconfont/IconArrowRight'
import { LinkToQuestionDeal, LinkToReplyEdit } from '../../utils/LinkTo'

const screenWidth = Math.round(Dimensions.get('window').width)

interface Props {
    title: string,
    reply_count: number,
    question_id: string
}

const Header: FC<Props> = ({title, reply_count, question_id}) => {

    const LinkTo = () => {
        LinkToQuestionDeal({question_id})
    }

    return (
        <Wrapper onPress={LinkTo}>
            <View>
                <Title ellipsizeMode='tail' numberOfLines={1}>
                    {title}
                </Title>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Tips>知乎·全部 {reply_count} 个回答 </Tips>
                    <IconArrowRight color='#999' size={14} />
                </View>
            </View>
        </Wrapper>
    )
}

interface RightProps {
    title: string,
    question_id: string,
    myReply: any,
    seeMyReply: ({reply_id}: { reply_id: string }) => any
}

const Right: FC<RightProps> = ({title, question_id, myReply, seeMyReply}) => {

    const LinkTo = () => {

        if (myReply) {
            seeMyReply({reply_id: myReply.reply})
        } else {
            LinkToReplyEdit({question_id, title})
        }
    }

    return (
        <TouchableOpacity onPress={LinkTo}>
            <RightText>{myReply ? '我的回答' : '写回答'}</RightText>
        </TouchableOpacity>
    )
}

const Wrapper = styled.TouchableOpacity`
max-width: ${screenWidth * 0.67}px;
margin-left: -20px;
`
const Title = styled.Text`
color: #1a1a1a;
font-size: 16px;
font-weight: bold;
`

const Tips = styled.Text`
font-size: 12px;
color: #999;
`

const RightText = styled.Text`
color: #0084ff;
padding-right: 15px;
`

export { Header, Right }
