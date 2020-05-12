import React, { FC } from 'react'
import ListBase, { ItemWrapper as ItemWrapperBase } from '../../components/ListBase'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { TouchableNativeFeedback } from 'react-native'
import AvararPeople from '../../components/AvararPeople'
import AttentionButton from '../../components/AttentionButton'

interface Props {
    user_id: string,
    Request:any,
    TipsTitle:string
}


const PeopleList: FC<Props> = ({user_id,Request,TipsTitle}) => {
    const navigation = useNavigation()


    const LinkTo = (_id: string) => () => {
        navigation.navigate('People', {_id})
    }

    const _renderItem = ({item}: { item: any }) => {

        return (
            <TouchableNativeFeedback onPress={LinkTo(item._id)}>
                <ItemWrapper style={{elevation: 1}}>
                    <AvararPeople
                        avatar={item.avatar}
                        nickname={item.nickname}
                        text={!!item.one_sentence_introduction.length ? item.one_sentence_introduction : null}
                    />
                    <AttentionButton user_id={user_id} fans={item.fans} people_id={item._id} />
                </ItemWrapper>
            </TouchableNativeFeedback>
        )
    }

    return (
        <ListBase
            Request={Request}
            renderItem={_renderItem}
            TipsTitle={TipsTitle}
            TipsColor='#0084ff'
        />
    )
}

const ItemWrapper = styled(ItemWrapperBase)`
flex-direction: row;
align-items: center;
justify-content: space-between;
margin-top: 0;
height: 60px;
border-bottom-width: 1px;
border-bottom-color: #f6f6f6;
`

export default PeopleList
