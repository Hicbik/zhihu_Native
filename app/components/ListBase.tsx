import React, { FC, useState, useEffect, Fragment, useImperativeHandle } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import styled from 'styled-components/native'
import Skeleton from './Skeleton'
import FadeView from './FadeView'


interface Props {
    Request: ({page}: { page: number }) => any,
    renderItem: ({item, index}: { item: any, index: number }) => any,
    TipsColor?: string,
    TipsTitle?: string,
    ListHeaderComponent?: any,
    cRef?: any,
    Refresh?: boolean,
}


const useList = ({Request}: { Request: ({page}: { page: number }) => any }) => {
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


    return {
        data, refreshing, showTips, isLoad, _onEndReached, _onRefresh, _close,
    }

}

const ListBase: FC<Props> = ({
    Request,
    renderItem,
    TipsColor = '#0084ff',
    TipsTitle,
    ListHeaderComponent,
    cRef,
    Refresh = true,
}) => {
    const {data, refreshing, showTips, isLoad, _onEndReached, _onRefresh, _close} = useList({Request})


    useImperativeHandle(cRef, () => ({
        _onRefresh
    }))


    const _refreshControl = () => {
        return Refresh ? (
            <RefreshControl
                refreshing={refreshing}
                onRefresh={_onRefresh}
                colors={['#0084ff']}
                enabled={true}
            />
        ) : undefined
    }

    const _ListFooterComponent = () => {
        if (isLoad && !!data.length) {
            return (
                <ItemWrapper style={{elevation: 1, paddingTop: 25, marginBottom: 10}}>
                    <Skeleton />
                </ItemWrapper>
            )
        }
        if (!isLoad) {
            return <EndText>没有更多内容</EndText>
        }
        return null
    }

    const _keyExtractor = (item: any, index: number) => {
        return index.toString()
    }


    return (
        <Fragment>
            <Wrapper>
                {
                    Refresh && showTips && (
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
                            <Tips color={TipsColor!}>{TipsTitle}</Tips>
                        </FadeView>
                    )
                }
                <FlatList
                    style={{flex: 1}}
                    data={data}
                    showsVerticalScrollIndicator={false}
                    initialNumToRender={8}
                    maxToRenderPerBatch={10}
                    onEndReachedThreshold={0.2}
                    ListHeaderComponent={ListHeaderComponent}
                    refreshControl={_refreshControl()}
                    ListFooterComponent={_ListFooterComponent}
                    onEndReached={_onEndReached}
                    renderItem={renderItem}
                    keyExtractor={_keyExtractor}
                    removeClippedSubviews={false}
                />
            </Wrapper>
        </Fragment>
    )
}

const Wrapper = styled.View`
position: relative;
flex: 1;
`
const Tips = styled.Text`
text-align:center;
color: ${(props: { color: string }) => props.color};
`

const EndText = styled.Text`
color: #bfbfbf;
text-align:center;
margin: 20px 0;
font-weight:bold;
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


export { useList }
export default React.memo(ListBase)
