import React, { FC, useCallback } from 'react'
import { UserRequest } from '../../utils/request'
import { NoticeIo } from '../../utils/io'
import { LinkToPeople } from '../../utils/LinkTo'
import { Badge } from 'react-native-paper'
import styled from 'styled-components/native'
import AvararPeople from '../../components/AvararPeople'
import { DiffTime } from '../../utils/time'
import ListBase from '../../components/ListBase'


const AttentionList:FC = () => {

    const Request = useCallback(({page}) => {
        return UserRequest.getNotice({page, type: '关注'})
    }, [])

    const _LinkToPeople = (_id: string, item_id: string) => () => {
        NoticeIo.HaveRead({_id: item_id})
        LinkToPeople({_id})
    }

    const _renderItem = ({item}: { item: any }) => {
        return (
            <Wrapper>
                <Badge visible={!item.see} size={10} style={{position: 'absolute', top: 10, right: 15}} />
                <AvararPeople
                    nickname={`${item.res_user_id.nickname} ${item.text}`}
                    avatar={item.res_user_id.avatar}
                    text={DiffTime(item.create_time)}
                    onPress={_LinkToPeople(item.res_user_id._id, item._id)}
                />
            </Wrapper>
        )
    }

    return (
        <ListBase
            Request={Request}
            renderItem={_renderItem}
            TipsTitle='关注已更新'
            footStyle={{ marginTop: 0}}
        />
    )
}

const Wrapper = styled.View`
padding: 15px;
border-bottom-width: 0.5px;
border-bottom-color:#ebebeb;
background-color: #fff;
position: relative;
`

export default AttentionList
