import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Dimensions, FlatList, Image, RefreshControl, Text, View } from 'react-native'
import { IColumnsHandles } from 'react-native-waterflow-list/src/Columns'
import WaterFlow from 'react-native-waterflow-list/src/'
import { Card, Title, Paragraph ,Avatar} from 'react-native-paper'

const width = (Dimensions.get('screen').width - 30) / 2

const getItemData = (() => {
    let id = 0
    return () => {
        id++
        const height = Math.ceil(Math.random() * 600)
        return {
            id,
            text: Math.random(),
            height,
            width,
        }
    }
})()

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const itemDataFactory = () =>
    Array(10)
        .fill('')
        .map(() => getItemData())

interface IItem {
    id: number

    [index: string]: any
}

const Demo = () => {
    const [data, setData] = useState<IItem[]>([])
    const [loading, setLoading] = useState(false)
    const WaterFlowRef = useRef<any>()

    const onLoadMore = useCallback(async () => {
        setLoading(true)
        await sleep(1000)
        setLoading(false)
        return setData(data.concat(itemDataFactory()))
    }, [data])

    const loadData = useCallback(async () => {
        await sleep(1000)
        return setData(itemDataFactory())
    }, [data])

    useEffect(() => {
        setData(itemDataFactory())
    }, [])



    return (
        <WaterFlow
            ref={WaterFlowRef}
            data={data}
            keyForItem={item => item.id}
            numColumns={2}
            onEndReached={onLoadMore}
            columnFlatListProps={{style: {marginHorizontal: 5}}}
            columnsFlatListProps={{
                refreshControl: (
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={() => {
                            WaterFlowRef.current?.clear()
                            loadData()
                        }}
                        colors={['#0084ff']}
                    />
                ),
                style: {marginHorizontal: 5, paddingTop: 10},
                showsVerticalScrollIndicator: false
            }}
            renderItem={_renderItem}

        />
    )
}


export default Demo
