import React, { FC, useState, useEffect, createContext } from 'react'
import styled from 'styled-components/native'
import { TextInput, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import HotView from './HotView'
import IconZuoxia from '../../components/iconfont/IconZuoxia'
import HotTavView from './HotTavView'


const QueryContext = createContext('')

const Search: FC = () => {

    const navigation = useNavigation()
    const [query, setQuery] = useState('')
    const [history, setHistory] = useState<string[]>([])
    const [show,setShow] = useState(false)

    useEffect(() => {
        ;(async () => {
            const historySearch = await AsyncStorage.getItem('historySearch')
            if (historySearch) setHistory(JSON.parse(historySearch))
        })()
    }, [])

    useEffect(()=>{
        if (query.length === 0) setShow(false)
    },[query])

    const _onSearch = async () => {
        const new_history = Array.from(new Set([...history, query]))
        setHistory(new_history)
        setShow(true)
        await AsyncStorage.setItem('historySearch', JSON.stringify(new_history))
    }

    const _onDelHistory = (index: number) => async () => {
        const new_history = history.filter(((value, i) => i !== index))
        setHistory(new_history)
        await AsyncStorage.setItem('historySearch', JSON.stringify(new_history))
    }

    const _onDelAllHistory = async () => {
        setHistory([])
        await AsyncStorage.removeItem('historySearch')
    }

    const _onPressHistory = (value: string) => () => {
        setQuery(value)
        setShow(true)
    }

    const _goBack = () => {
        navigation.goBack()
    }

    return (
        <Wrapper>
            <SearchView>
                <TouchableOpacity onPress={_goBack}>
                    <IconZuoxia size={20} color='#444' />
                </TouchableOpacity>
                <TextInput
                    style={{height: 35, padding: 0, marginLeft: 15, fontSize: 16, flex: 1}}
                    placeholder=' 搜索知乎'
                    value={query}
                    onChangeText={text => setQuery(text)}
                    onSubmitEditing={_onSearch}
                    returnKeyType='search'
                    autoFocus
                />
            </SearchView>
            {
                !show && (
                    <HotView
                        history={history}
                        _onDelHistory={_onDelHistory}
                        _onDelAllHistory={_onDelAllHistory}
                        _onPressHistory={_onPressHistory}
                    />
                )
            }
            {
                show && (
                    <QueryContext.Provider value={query}>
                        <HotTavView/>
                    </QueryContext.Provider>
                )
            }
        </Wrapper>
    )
}

const Wrapper = styled.View`
flex: 1;
background-color: #fff;
padding-top: 10px;
`
const SearchView = styled.View`
flex-direction: row;
border-radius: 8px;
background-color: #ebebeb;
margin: 0 10px;
padding:0 15px;
align-items: center;
`

export default Search
export { QueryContext }
