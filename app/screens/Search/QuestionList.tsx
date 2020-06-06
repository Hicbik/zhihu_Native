import React, { FC, useCallback, Fragment, useContext } from 'react'
import { TouchableHighlight } from 'react-native'
import styled from 'styled-components/native'
import ListBase from '../../components/ListBase'
import { QuestionRequest } from '../../utils/request'
import { DiffTime } from '../../utils/time'
import { QueryContext } from './index'
import { LinkToQuestionDeal } from '../../utils/LinkTo'


const QuestionList: FC = () => {


    const query = useContext(QueryContext)

    const Request = useCallback(({page}) => {
        return QuestionRequest.searchList({page, search: query})
    }, [query])

    const TitleWrapper = ({text}: any) => {
        let newData = text.split(query)
        return (
            <Title>
                {
                    newData.map((item: any, index: number) =>
                        <Fragment key={index}>
                            {item}{index !== newData.length - 1 && <Title style={{color: '#f1403c'}}>{query}</Title>}
                        </Fragment>
                    )
                }
            </Title>
        )
    }

    const LinkTo = (question_id: string) => () => {
        LinkToQuestionDeal({question_id})
    }

    const _renderItem = ({item}: any) => {

        return (
            <TouchableHighlight style={{marginTop: 10}} activeOpacity={0.9} onPress={LinkTo(item._id)}>
                <ItemWrapper>
                    {item.title.includes(query) ? <TitleWrapper text={item.title} /> : <Title>{item.title}</Title>}
                    <Content>
                        {!item.reply_id.length ? item.content : '阿库娅：' + item.reply_id[0].reply.content}
                    </Content>
                    <TipsWrapper>
                        <TipsText>{item.reply_count} 评论</TipsText>
                        <TipsText style={{marginRight: 3, marginLeft: 3}}>·</TipsText>
                        <TipsText>{DiffTime(item.create_time)}</TipsText>
                    </TipsWrapper>
                </ItemWrapper>
            </TouchableHighlight>
        )
    }

    if (!query.length) return null

    return (
        <ListBase Request={Request} renderItem={_renderItem} TipsTitle='综合已更新' />
    )
}

const ItemWrapper = styled.View`
padding: 15px;
background-color: #fff;
`
const Title = styled.Text`
font-size: 16px;
color: #1a1a1a;
font-weight:bold;
margin-bottom: 5px;
`
const Content = styled.Text`
font-size: 14px;
color: #444;
`
const TipsWrapper = styled.View`
flex-direction: row;
margin-top: 7px;
align-items: center;
`
const TipsText = styled.Text`
color: #999;
font-size: 12px;
`
export default QuestionList
