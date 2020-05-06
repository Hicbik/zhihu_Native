import React, { FC, useCallback, useState } from 'react'
import { TouchableOpacity, TouchableWithoutFeedback, View, FlatList ,Text} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
import ListBase, { ItemWrapper, Image } from './ListBase'
import { QuestionRequest } from '../../../../utils/request'
import IconGengduo from '../../../../components/iconfont/IconGengduo'
import IconXiangshangsanjiaoxing from '../../../../components/iconfont/IconXiangshangsanjiaoxing'
import IconPinglun from '../../../../components/iconfont/IconPinglun'


const AttentionList: FC = () => {

    const navigation = useNavigation()
    const [attentionPeople, setAttentionPeople] = useState<any[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

    const Request = useCallback(({page}: { page: number }) => {
        return QuestionRequest.RecommendListData({page})
    }, [])

    const LinkTo = (_id: string) => () => {
        navigation.navigate('Question', {_id})
    }

    const _renderItem = ({item}: { item: any }) => {
        return (
            <View>
                <ItemWrapper style={{elevation: 1}}>
                    <TouchableWithoutFeedback onPress={LinkTo(item._id)}>
                        <View>
                            <AuthorWrapper>
                                <Avatar
                                    source={{uri: 'https://pic1.zhimg.com/v2-031a80f0cd3b48c659220726d950ec2e_l.jpg'}}
                                />
                                <View style={{justifyContent: 'center'}}>
                                    <AuthorText>{item.user_id.nickname}</AuthorText>
                                    <AuthorText style={{color: '#b0b0b0', fontSize: 12}}>3分钟前·赞同了回答</AuthorText>
                                </View>
                            </AuthorWrapper>
                            <Title>宇宙的终极秘密有没有可能被人类知晓？</Title>
                            <ContentWrapper>
                                <Content ellipsizeMode='tail' numberOfLines={3}>
                                    朝闻道夕死可矣，人类知晓的那一刻，
                                </Content>
                                <Image
                                    source={{uri: 'https://pic4.zhimg.com/50/v2-43ecd9604db459d8cd3a4fcf39fbc6eb_400x224.jpg'}}
                                />
                            </ContentWrapper>
                        </View>
                    </TouchableWithoutFeedback>
                    <TipsWrapper>
                        <Tips>
                            <IconXiangshangsanjiaoxing color='#0084ff' />
                            <TipsText>1</TipsText>
                        </Tips>
                        <Tips>
                            <IconPinglun color='#999' />
                            <TipsText>1</TipsText>
                        </Tips>
                        <IconGengduo style={{marginLeft: 'auto'}} color='#e1e1e1' />
                    </TipsWrapper>
                </ItemWrapper>
            </View>
        )
    }


    const _headerItem = ({item, index}: { item: any, index: number }) => {
        return (
            <TouchableOpacity>
                <HeaderWrapper style={{marginRight: index === attentionPeople.length - 1 ? 15 : 3}}>
                    <HeaderAvatar
                        source={{uri: 'https://pic1.zhimg.com/v2-031a80f0cd3b48c659220726d950ec2e_l.jpg'}}
                    />
                    <HeaderText ellipsizeMode='tail' numberOfLines={1}>阿库娅</HeaderText>
                </HeaderWrapper>
            </TouchableOpacity>
        )
    }

    const _headerComponet = () => {
        return (
            <>
                <Text style={{fontSize:12,marginLeft:15,color:'#808080',marginTop:10}}>我的关注</Text>
                <FlatList
                    data={attentionPeople}
                    renderItem={_headerItem}
                    keyExtractor={((item) => item.toString())}
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
            ListHeaderComponent={_headerComponet}
        />
    )
}

const HeaderWrapper = styled.View`
width: 45px;
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
font-size: 12px;
text-align:center;
`

const Title = styled.Text`
font-size: 16px;
color: #1a1a1a;
margin-bottom: 5px;
`

const AuthorWrapper = styled.View`
margin-bottom: 10px;
flex-direction: row;
`

const Avatar = styled.Image`
width: 35px;
height: 35px;
border-radius: 20px;
`

const AuthorText = styled.Text`
font-size: 14px;
margin-left: 5px;
color: #1a1a1a;
`

const ContentWrapper = styled.View`
flex-direction: row;
margin-bottom: 10px;
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
