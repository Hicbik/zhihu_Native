import { YellowBox } from 'react-native'
import io from 'socket.io-client'
import AsyncStorage from '@react-native-community/async-storage'
import store from '../store'

// 消除友好警告
console.ignoredYellowBox = ['Remote debugger']
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
])


// @ts-ignore
window.navigator.userAgent = 'react-native'


export class NoticeIo {
    static socket: any

    static init () {
        const {User} = store.getState()
        store.dispatch({
            type: 'notice/6666',
            time: User.create_time
        })

        this.GetChat()

        this.socket = io('ws://sujie.ink:7001/', {
            query: {
                userId: User._id
            },
            transports: ['websocket']
        })

        this.socket.emit('NOTICE', {_id: User._id})

        this.socket.emit('GETCHAT', {_id: User._id})

        this.socket.on('NOTICE', (res: any) => {

            store.dispatch({
                type: 'notice/change',
                value: {
                    unread: res.unread,
                    full: {
                        news: res.full.news,
                        agree: res.full.agree,
                        attention: res.full.attention
                    }
                }
            })
        })



        this.socket.on('ONLINE_USERS', (res: any) => {
            store.dispatch({
                type: 'notice/online_users',
                value: res.online_users
            })
        })

        this.socket.on('CHAT', (res: any) => {
            const {send_user, message, time} = res
            this.addChatMessage({type: 'he', message, send_user, time})
        })

        this.socket.on('GETCHAT', (res: any) => {
            if (!res.docs.length) return
            this.initChat(res.docs)
        })

        this.socket.on('ERR', async () => {
            store.dispatch({
                type: 'notice/changeErr',
                value: true
            })
            await AsyncStorage.removeItem('token')
            store.dispatch({
                type: 'user/dropOut'
            })
            this.close()
        })


        this.socket.on('disconnect', async () => {
            console.log('关闭了')
        })

    }


    static addChatMessage ({send_user, message, type, time}: { send_user: any, message: string, type: string, time: any }) {
        const {Notice} = store.getState()

        const userIndex = Notice.chatList.findIndex((value => value.user_id === send_user._id))

        if (userIndex === -1) {
            store.dispatch({
                type: 'notice/chat',
                value: [
                    ...Notice.chatList, {
                        user_id: send_user._id,
                        chat_id: null,
                        nickname: send_user.nickname,
                        avatar: send_user.avatar,
                        messageList: [{type, message, time}],
                        newMsg: Notice.win === send_user._id ? 0 : 1
                    }
                ],
                chat: Notice.win === send_user._id ? Notice.chat : Notice.chat + 1
            })
        } else {
            store.dispatch({
                type: 'notice/chat',
                value: Notice.chatList.map((value, index) => index === userIndex ? {
                        ...value,
                        nickname: send_user.nickname ? send_user.nickname : value.nickname,
                        chat_id: null,
                        avatar: send_user.avatar ? send_user.avatar : value.avatar,
                        messageList: [...value.messageList, {type, message, time}],
                        newMsg: Notice.win === send_user._id ? value.newMsg : value.newMsg + 1
                    } : value
                ),
                chat: Notice.win === send_user._id ? Notice.chat : Notice.chat + 1
            })
        }
        this.SaveChat()
    }

    static async SaveChat () {
        const {Notice, User} = store.getState()
        await AsyncStorage.setItem('Chat', JSON.stringify({
            user_id: User._id,
            chatList: Notice.chatList,
            chat: Notice.chat
        }))
    }

    static async GetChat () {
        const oldChat = await AsyncStorage.getItem('Chat')
        if (!oldChat) return

        const Chat = JSON.parse(oldChat)
        const {User} = store.getState()

        if (Chat.user_id === User._id) {
            store.dispatch({
                type: 'notice/chat',
                value: Chat.chatList,
                chat: Chat.chat
            })
        }

    }

    static initChat (data: any[]) {
        const {Notice} = store.getState()
        const list = [...Notice.chatList]
        data.forEach((value) => {
            const index = list.findIndex(item => item.user_id === value.send_user_id._id)
            if (index === -1) {
                list.push({
                    user_id: value.send_user_id._id,
                    avatar: value.send_user_id.avatar,
                    nickname: value.send_user_id.nickname,
                    chat_id: value._id,
                    messageList: [...value.chatList],
                    newMsg: value.chatList.length
                })
            } else {
                list[index] = {
                    ...list[index],
                    chat_id: value._id,
                    avatar: value.send_user_id.avatar,
                    nickname: value.send_user_id.nickname,
                    messageList: [...list[index].messageList, ...value.chatList],
                    newMsg: list[index].newMsg + value.chatList.length
                }
            }
        })
        store.dispatch({
            type: 'notice/chat',
            value: list,
            chat: list.reduce((pre, next) => pre + next.newMsg, 0)
        })

        this.SaveChat()
        for (let value of data) {
            this.delChat(value._id)
        }
    }

    static delChat (_id: string | null) {
        this.socket.emit('DELCHAT', {chat_id: _id})
    }


    static SendChat ({send_user, receive_user_id, message}: { send_user: any, receive_user_id: string, message: string }) {
        const time = Date.now()
        if (receive_user_id !== '666') {
            this.socket.emit('CHAT', {
                send_user: {
                    _id: send_user._id,
                    avatar: send_user.avatar,
                    nickname: send_user.nickname
                },
                receive_user_id,
                message,
                time,
            })
        }
        this.addChatMessage({type: 'my', send_user: {_id: receive_user_id}, message, time})
    }

    static HaveRead ({_id}: { _id: string }) {
        const {User} = store.getState()
        this.socket.emit('HAVEREAD', {_id, userId: User._id})
    }

    static close () {
        this.socket.close()
    }
}

