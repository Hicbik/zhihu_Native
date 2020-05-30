import React, { FC, useEffect, useRef, useState, } from 'react'
import AutoHeightWebView from 'react-native-autoheight-webview'
import { ToastAndroid, View, TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import styled from 'styled-components/native'
import IconClose from '../../components/iconfont/IconClose'
import IconJiahao1 from '../../components/iconfont/IconJiahao1'
import { QuestionRequest } from '../../utils/request'
import { LinkToQuestionDeal } from '../../utils/LinkTo'

const NewQuestion: FC = () => {
    const navigation = useNavigation()
    const [title, setTitle] = useState('')
    const [topic, setTopic] = useState<{ list: string[], value: string, show: boolean }>({
        list: [],
        value: '',
        show: false
    })
    const webview = useRef<any>()


    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={_onButton} style={{paddingRight: 8}}>
                    <Text style={{color: '#0084ff', marginRight: 8}}>发布问题</Text>
                </TouchableOpacity>
            )
        })
    }, [])

    const handleMessage = async ({nativeEvent}: any) => {
        const data = JSON.parse(nativeEvent.data)
        if (data.type && data.type === 'getHtml') {

            if (title.length <= 3) return ToastAndroid.show('请认真填写问题!!', ToastAndroid.SHORT)
            if (!topic.list.length) return ToastAndroid.show('请添加一个话题!!', ToastAndroid.SHORT)

            const {content, content_html} = data

            const imgList: any[] = []
            content_html.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, (match: any, capture: any) => {
                imgList.push(capture)
                return match
            })
            const res = await QuestionRequest.create({
                title,
                content,
                content_html,
                topic: topic.list,
                image_field: imgList
            })
            if (res.state === 'err') return
            ToastAndroid.show('发布问题成功了哦!', ToastAndroid.SHORT)
            LinkToQuestionDeal({question_id: res.data._id})
        }
    }

    const _onLoad = async () => {
        const qiniuToken = await AsyncStorage.getItem('qiniuToken')
        webview.current.postMessage(JSON.stringify({type: 'token', token: qiniuToken}))
    }


    const _addTopicValue = () => {
        if (!topic.value.length) return
        setTopic({
            list: Array.from(new Set([...topic.list, topic.value])),
            value: '',
            show: false
        })
    }

    const _delTopicValue = (i: number) => () => {
        setTopic({
            ...topic,
            list: topic.list.filter((value, index) => index !== i)
        })
    }

    const _onButton = () => {
        webview.current.postMessage(JSON.stringify({type: 'getHtml'}))
    }

    return (
        <Wrapper>
            <Input
                placeholder=' 输入问题并以问号结尾'
                value={title}
                onChangeText={text => setTitle(text)}
                multiline
                maxLength={50}
            />
            {
                !topic.show && topic.list.length < 5 && (
                    <TouchableOpacity onPress={() => setTopic({...topic, show: true})}>
                        <View style={{flexDirection: 'row', alignItems: 'center', padding: 15}}>
                            <IconJiahao1 color='#0084ff' size={14} style={{marginRight: 4}} />
                            <TopicText>
                                {!topic.list.length ? '话题（至少添加一个话题）' : `话题（${topic.list.length}/5）`}
                            </TopicText>
                        </View>
                    </TouchableOpacity>
                )
            }
            {
                topic.show && (
                    <View style={{flexDirection: 'row', paddingLeft: 15, paddingRight: 15}}>
                        <TopicInput
                            placeholderTextColor='#0084ff'
                            underlineColorAndroid='#0084ff'
                            value={topic.value}
                            onChangeText={value => setTopic({...topic, value})}
                            autoFocus
                            onSubmitEditing={_addTopicValue}
                        />
                        <TouchableOpacity style={{padding: 8}} onPress={_addTopicValue}>
                            <TopicText>添加</TopicText>
                        </TouchableOpacity>
                    </View>
                )
            }
            <View style={{flexDirection: 'row', paddingLeft: 15, paddingRight: 15, flexWrap: 'wrap'}}>
                {
                    topic.list.map((value, index) => (
                        <TouchableOpacity
                            style={{marginRight: 10, marginBottom: 10}}
                            key={value}
                            onPress={_delTopicValue(index)}
                        >
                            <Topic>
                                <TopicText>{value}</TopicText>
                                <IconClose color='#0084ff' />
                            </Topic>
                        </TouchableOpacity>
                    ))
                }
            </View>
            <AutoHeightWebView
                source={{uri: 'file:///android_asset/web/new_question.html'}}
                style={{flex: 1}}
                onMessage={handleMessage}
                onLoad={_onLoad}
                allowFileAccess
                javaScriptEnabled
                ref={webview}
            />
        </Wrapper>
    )
}

const Wrapper = styled.View`
background-color: #fff;
flex: 1;
`

const Input = styled.TextInput`
background-color: #fff;
padding: 15px;
font-size: 18px;
`
const TopicInput = styled.TextInput`
font-size: 14px;
flex: 1;
height: 50px;
`
const Topic = styled.View`
background-color: rgba(0,132,255,.1);
padding: 0 12px;
border-radius: 100px;
height: 30px;
align-items: center;
flex-direction: row;
`
const TopicText = styled.Text`
color: #0084ff;
font-size: 14px;
margin-right: 4px;
`

export default NewQuestion
