import React, { FC, useState, useEffect } from 'react'
import { FlatList, TouchableNativeFeedback } from 'react-native'
import styled from 'styled-components/native'
import IconGengduo from '../../../../components/iconfont/IconGengduo'
import { QuestionRequest } from '../../../../utils/request'

const List: FC = () => {

    const [data, setData] = useState<any[]>([])
    const [page, setPage] = useState(1)

    console.log(data)

    useEffect(() => {
        ;(async () => {
            const res = await QuestionRequest.RecommendList({page})
            setData([...res.data])
        })()
    }, [page])


    const Item = ({item}: { item: any }) => {
        return (
            <TouchableNativeFeedback>
                <ItemWrapper style={{elevation: 1}}>
                    <Title>{item.title}</Title>
                    <AuthorWrapper>
                        <Avatar source={{uri: 'https://pic4.zhimg.com/da8e974dc_s.jpg'}} />
                        <AuthorText style={{color: '#646464'}}>阿库娅</AuthorText>
                        <AuthorText style={{color: '#999'}}>水之女神</AuthorText>
                    </AuthorWrapper>
                    <Content ellipsizeMode='tail' numberOfLines={2}>
                        陈风暴烈酒： 西方的资本家有一个好，他们要玩要享受会专门搞一个“穷人免进”的圈子去玩；他们之中也有炫耀的人，但这帮人不会标榜自己是教育家；也不乏有西方
                    </Content>
                    <TipsWrapper>
                        <TipsText>204 赞同</TipsText>
                        <TipsText style={{marginRight: 3, marginLeft: 3}}>·</TipsText>
                        <TipsText>1 评论</TipsText>
                        <IconGengduo style={{marginLeft: 'auto'}} color='#e1e1e1' />
                    </TipsWrapper>
                </ItemWrapper>
            </TouchableNativeFeedback>
        )
    }

    const _onEndReached = () => {
        setPage(prevState => prevState + 1)
    }


    return (
        <FlatList
            data={data}
            initialNumToRender={5}
            onEndReached={_onEndReached}
            renderItem={({item}) => <Item item={item} />}
            keyExtractor={(item: object, index: number) => index.toString()}
        />

    )
}

const ItemWrapper = styled.View`
background-color: #fff;
margin-top: 10px;
padding: 15px;
`
const Title = styled.Text`
font-size: 15px;
font-weight:bold;
color: #1a1a1a;
`
const AuthorWrapper = styled.View`
margin-top: 5px;
margin-bottom: 5px;
display:flex;
flex-direction: row;
`
const Avatar = styled.Image`
width: 20px;
height: 20px;
border-radius: 10px;
`
const AuthorText = styled.Text`
font-size: 14px;
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
