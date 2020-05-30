import React, { FC, useRef, useEffect } from 'react'
import { ScrollView, TouchableOpacity, Text, ToastAndroid } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import AutoHeightWebView from 'react-native-autoheight-webview'
import styled from 'styled-components/native'
import IconFabu from '../../components/iconfont/IconFabu'
import { QuestionRequest } from '../../utils/request'
import AsyncStorage from '@react-native-community/async-storage'


const ReplyEdit: FC = () => {
    const navigation = useNavigation()
    const params = useRoute<any>().params
    const webview = useRef<any>()


    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={_onButton}>
                    <RightView>
                        <Text style={{color: '#0084ff', marginRight: 8}}>发布</Text>
                        <IconFabu color='#0084ff' />
                    </RightView>
                </TouchableOpacity>
            )
        })
    }, [params])


    const handleMessage = async ({nativeEvent}: any) => {
        const data = JSON.parse(nativeEvent.data)
        if (data.type && data.type === 'getHtml') {

            const {content, content_html, content_length} = data

            if (content_length === 0) return ToastAndroid.show('请认真回答!', ToastAndroid.SHORT)

            const imgList: any[] = []
            content_html.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, (match: any, capture: any) => {
                imgList.push(capture)
                return match
            })

            const res = await QuestionRequest.createReplay({
                question_id: params.question_id,
                content_html,
                content,
                image_field: imgList
            })
            if (res.state === 'err') return
            ToastAndroid.show('回答成功了哦!', ToastAndroid.SHORT)
            navigation.navigate('Question', {
                _id: params.question_id,
                reply_id: res.data._id
            })
        }
    }

    const _onLoad = async () => {
        const qiniuToken = await AsyncStorage.getItem('qiniuToken')
        webview.current.postMessage(JSON.stringify({type: 'token', token: qiniuToken}))
    }

    const _onButton = () => {
        webview.current.postMessage(JSON.stringify({type: 'getHtml'}))
    }

    return (
        <ScrollView style={{flex: 1, backgroundColor: '#fff'}} contentContainerStyle={{flex: 1}}>
            <Wrapper>
                <Title>{params.title}</Title>
                <AutoHeightWebView
                    source={{uri: 'file:///android_asset/web/reply_edit.html'}}
                    style={{flex: 1}}
                    onMessage={handleMessage}
                    onLoad={_onLoad}
                    allowFileAccess
                    javaScriptEnabled
                    ref={webview}
                />
            </Wrapper>
        </ScrollView>
    )
}

const Title = styled.Text`
font-size: 20px;
color: #1a1a1a;
padding: 15px;
border-bottom-color: #f6f6f6;
border-bottom-width: 10px;
`
const RightView = styled.View`
padding: 0 20px;
flex-direction: row;
align-items: center;
`

const Wrapper = styled.View`
flex: 1;
padding-bottom: 50px;

`

export default ReplyEdit
