import React, { FC, useState, useEffect, Fragment, useImperativeHandle } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import styled from 'styled-components/native'
import Skeleton from '../../../../components/Skeleton'
import FadeView from '../../../../components/FadeView'


interface Props {
    Request: ({page}: { page: number }) => any,
    renderItem: ({item, index}: { item: any, index: number }) => any,
    TipsColor: string,
    TipsTitle: string,
    HeaderComponet?: () => React.ReactNode,
    ListHeaderComponent?: any,
    cRef?: any
}

const ListBase: FC<Props> = ({
    Request,
    renderItem,
    TipsColor,
    TipsTitle,
    HeaderComponet,
    ListHeaderComponent,
    cRef
}) => {

    const [data, setData] = useState<any[]>([])
    const [page, setPage] = useState(1)
    const [refreshing, setRefreshing] = useState(false)
    const [showTips, setShowTips] = useState(false)
    const [isLoad, setIsLoad] = useState(true)

    useImperativeHandle(cRef, () => ({
        _onRefresh
    }))

    useEffect(() => {
        ;(async () => {
            await _getData({pageNum: page})
        })()
    }, [])

    const _getData = async ({pageNum}: { pageNum: number }) => {
        const res = await Request({page: pageNum})
        setPage(pageNum + 1)
        if (pageNum === 1) setData([...res.data])
        else setData([...data, ...res.data])

        if (res.data.length < 8) setIsLoad(false)

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

    return (
        <Fragment>
            {HeaderComponet && HeaderComponet()}
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
                            <Tips color={TipsColor}>{TipsTitle}</Tips>
                        </FadeView>
                    )
                }
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    initialNumToRender={5}
                    onEndReachedThreshold={0.1}
                    ListHeaderComponent={ListHeaderComponent}
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
                    renderItem={renderItem}
                    keyExtractor={(item: any) => item._id}
                />
            </Wrapper>
        </Fragment>
    )
}

const Wrapper = styled.View`
position: relative;
`
const Tips = styled.Text`
text-align:center;
color: ${props => props.color};
`
export const ItemWrapper = styled.View`
background-color: #fff;
margin-top: 10px;
padding: 15px;
`

export const Image = styled.Image`
width: 90px;
height: 60px;
border-radius: 5px;
margin-left: 5px;
`


export default ListBase
