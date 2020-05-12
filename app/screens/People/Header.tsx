import React, { FC } from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components/native'
import Button from '../../components/Button'
import IconSanjiaoxing from '../../components/iconfont/IconSanjiaoxing'
import IconNv from '../../components/iconfont/IconNv'
import IconTubiaozhizuomoban from '../../components/iconfont/IconTubiaozhizuomoban'

interface Props {
    data: any,
    isMy: boolean
}


const Header: FC<Props> = ({data, isMy}) => {


    return (
        <Wrapper>
            <Box>
                <TopWrapper>
                    <AvatarWrapper>
                        <Avatar source={{uri: data.avatar}} />
                        <Sex>
                            {!data.gender ? <IconNv size={26} /> : <IconTubiaozhizuomoban size={26} color='#0084ff' />}
                        </Sex>
                    </AvatarWrapper>
                    <View style={{flexDirection: 'row', alignItems: 'flex-end', marginLeft: 'auto'}}>
                        <Button onPress={() => 1} style={{padding: 999}}>编辑资料</Button>
                    </View>
                </TopWrapper>
                <NickName>{data.nickname}</NickName>
                <Text style={{color: '#808080', marginTop: 10, fontSize: 14}}>{data.one_sentence_introduction}</Text>
                <RowView>
                    <Text style={{color: '#0084ff', fontSize: 18}}>
                        {data.fans_count}
                        <Text style={{color: '#999', fontSize: 14}}> 关注{isMy ? '我' : 'Ta'}的人</Text>
                    </Text>
                    <Text style={{color: '#0084ff', fontSize: 18, marginLeft: 20}}>
                        {data.fans_count}
                        <Text style={{color: '#999', fontSize: 14}}> {isMy ? '我' : 'Ta'}关注的人</Text>
                    </Text>
                </RowView>
                <RowView style={{flexDirection: 'column'}}>
                    <Text style={{color: '#444', marginBottom: 5, fontSize: 14}}>个人简介</Text>
                    <Text style={{color: '#1a1a1a', fontSize: 14}}>{data.introduction}</Text>
                </RowView>
                <RowView style={{alignItems: 'center'}}>
                    <IconSanjiaoxing color='#0084ff' size={16} />
                    <Text style={{color: '#444', marginLeft: 5}}>{data.like_count} 赞同</Text>
                </RowView>
            </Box>
        </Wrapper>
    )
}


const Wrapper = styled.View`
background-color: #b8c0d7;
padding-top: 70px;
`
const Box = styled.View`
background-color: #fff;
border-top-left-radius: 10px;
border-top-right-radius: 10px;
position: relative;
padding: 45px 15px 0;
`
const TopWrapper = styled.View`
position: absolute;
top: -43px;
flex-direction: row;
width: 100%;
`
const AvatarWrapper = styled.View`
border-radius: 50px;
border-width: 3px;
border-color: #fff;
margin-left: 15px;
`
const Avatar = styled.Image`
width: 90px;
height: 90px;
border-radius: 45px;
`
const Sex = styled.View`
position: absolute;
width: 25px;
height: 25px;
bottom: 0;
right: -5px;
background-color: #fff;
border-radius: 50px;
`
const NickName = styled.Text`
color: #1a1a1a;
font-size: 20px;
margin-top: 10px;
`
const RowView = styled.View`
flex-direction: row;
border-bottom-width: 1px;
border-bottom-color: #f6f6f6;
padding: 15px 0;
`


export default Header
