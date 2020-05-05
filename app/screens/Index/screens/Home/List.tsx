import React, { FC, useState, useEffect, Fragment } from 'react'
import { FlatList, TouchableNativeFeedback, RefreshControl, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
import IconGengduo from '../../../../components/iconfont/IconGengduo'
import { QuestionRequest } from '../../../../utils/request'
import Skeleton from '../../../../components/Skeleton'
import FadeView from '../../../../components/FadeView'

const List: FC = () => {

    const navigation = useNavigation()
    const [data, setData] = useState<any[]>([])
    const [page, setPage] = useState(1)
    const [refreshing, setRefreshing] = useState(false)
    const [showTips, setShowTips] = useState(false)
    const [isLoad, setIsLoad] = useState(true)

    useEffect(() => {
        ;(async () => {
            await _getData({pageNum: page})
        })()
    }, [])

    const _getData = async ({pageNum}: { pageNum: number }) => {
        const res = await QuestionRequest.RecommendListData({page: pageNum})
        console.log(pageNum)
        setPage(pageNum + 1)
        if (pageNum === 1) setData([...res.data])
        else setData([...data, ...res.data])

        if (res.data.length < 8) setIsLoad(false)

    }

    const LinkTo = (_id: string) => () => {
        navigation.navigate('Question', {_id})
    }

    const _onEndReached = async () => {
        if (!isLoad) return
        await _getData({pageNum: page})
    }

    const _onRefresh = async () => {
        setRefreshing(true)
        await _getData({pageNum: 1})
        setRefreshing(false)
        setShowTips(true)
        setIsLoad(true)
    }

    const _close = () => {
        setShowTips(false)
    }

    const _renderItem = ({item}: { item: any }) => {
        return (
            <TouchableNativeFeedback onPress={LinkTo(item._id)}>
                <ItemWrapper style={{elevation: 1}}>
                    <Title>{item.question_id.title}</Title>
                    <ContentWrapper>
                        <View style={{flex: 1}}>
                            <AuthorWrapper>
                                <Avatar source={{uri: item.user_id.avatar}} />
                                <AuthorText style={{color: '#646464'}}>{item.user_id.nickname}</AuthorText>
                                <AuthorText
                                    style={{color: '#999'}}>{item.user_id.one_sentence_introduction}</AuthorText>
                            </AuthorWrapper>
                            <Content ellipsizeMode='tail' numberOfLines={2}>
                                {item.content}
                            </Content>
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
        <Wrapper>
            {
                showTips && (
                    <FadeView
                        style={{
                            width: '100%',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            backgroundColor: '#f6f6f6',
                            zIndex: 66,
                            padding: 5,
                            elevation: 2
                        }}
                        close={_close}
                    >
                        <Tips>推荐已更新</Tips>
                    </FadeView>
                )
            }
            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                initialNumToRender={5}
                onEndReachedThreshold={0.1}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={_onRefresh}
                        colors={['#0084ff']}
                        enabled={true}
                    />
                }
                ListFooterComponent={
                    <Fragment>
                        {
                            isLoad && (
                                <ItemWrapper style={{elevation: 1, paddingTop: 25, marginBottom: 10}}>
                                    <Skeleton />
                                </ItemWrapper>
                            )
                        }
                    </Fragment>
                }
                onEndReached={_onEndReached}
                renderItem={_renderItem}
                keyExtractor={(item: any) => item._id}
            />
        </Wrapper>
    )
}

const Wrapper = styled.View`
position: relative;
`
const Tips = styled.Text`
text-align:center;
color: #0084ff;
`

const ItemWrapper = styled.View`
background-color: #fff;
margin-top: 10px;
padding: 15px;
`

const Title = styled.Text`
font-size: 16px;
font-weight:bold;
color: #1a1a1a;
`

const AuthorWrapper = styled.View`
margin-top: 5px;
margin-bottom: 5px;
display:flex;
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
display:flex;
flex-direction: row;
align-items: center;
`

const Image = styled.Image`
width: 90px;
height: 60px;
border-radius: 5px;
margin-left: 5px;
`

const Content = styled.Text`
color: #444;
font-size: 14px;
margin-bottom: 5px;
`

const TipsWrapper = styled.View`
display:flex;
flex-direction: row;
align-items: center;
`

const TipsText = styled.Text`
color: #999;
font-size: 14px;
`

export default List
