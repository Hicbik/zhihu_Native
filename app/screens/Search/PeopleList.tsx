import React, { FC, useContext, useCallback, Fragment } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import styled from 'styled-components/native'
import { Avatar } from 'react-native-paper'
import { QueryContext } from './index'
import AttentionButton from '../../components/AttentionButton'
import ListBase from '../../components/ListBase'
import { UserRequest } from '../../utils/request'
import { useTypedSelector } from '../../store/reducer'
import { LinkToPeople } from '../../utils/LinkTo'

const PeopleList: FC = () => {
    const query = useContext(QueryContext)
    const state = useTypedSelector(state => state.User)

    const Request = useCallback(({page}) => {
        return UserRequest.search({page, search: query})
    }, [query])

    const LinkTo = (_id: string) => () => {
        LinkToPeople({_id})
    }

    const _renderItem = ({item}: any) => {

        const nickName = item.nickname.split(query)
        return (
            <TouchableHighlight activeOpacity={0.9} onPress={LinkTo(item._id)}>
                <ItemWrapper>
                    <View style={{justifyContent: 'flex-start', height: '100%'}}>
                        <Avatar.Image size={40} source={{uri: item.avatar}} />
                    </View>
                    <View style={{marginLeft: 10, flex: 1}}>
                        <NickName>
                            {
                                nickName.map((value: string, index: number) => (
                                    <Fragment key={index}>
                                        {value}
                                        {
                                            index !== nickName.length - 1 && (
                                                <NickName style={{color: '#f1403c',fontWeight:'bold'}}>{query}</NickName>
                                            )
                                        }
                                    </Fragment>
                                ))
                            }
                        </NickName>
                        {
                            !!item.one_sentence_introduction.length && (
                                <Text style={{
                                    fontSize: 14,
                                    color: '#444',
                                    marginBottom: 3
                                }}>{item.one_sentence_introduction} </Text>
                            )
                        }
                        <TipsWrapper>
                            <TipsText>{item.reply_count} 回答</TipsText>
                            <TipsText style={{marginRight: 3, marginLeft: 3}}>·</TipsText>
                            <TipsText>{item.question_count} 提问</TipsText>
                            <TipsText style={{marginRight: 3, marginLeft: 3}}>·</TipsText>
                            <TipsText>{item.fans_count} 关注</TipsText>
                        </TipsWrapper>
                    </View>
                    <View>
                        <AttentionButton fans={item.fans} people_id={item._id} user_id={state._id!} />
                    </View>
                </ItemWrapper>
            </TouchableHighlight>
        )
    }

    if (!query.length) return null

    return (
        <ListBase Request={Request} renderItem={_renderItem} TipsTitle='用户已更新' />
    )
}

const ItemWrapper = styled.View`
padding: 15px;
flex-direction: row;
background-color: #fff;
border-bottom-width: 1px;
border-bottom-color: #f6f6f6;
align-items: center;
`
const NickName = styled.Text`
font-weight: bold;
font-size: 16px;
color: #1a1a1a;
`
const TipsWrapper = styled.View`
flex-direction: row;
align-items: center;
flex: 1;
`

const TipsText = styled.Text`
color: #999;
font-size: 14px;
`
export default PeopleList
