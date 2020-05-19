import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import store from '../store/index'

axios.defaults.baseURL = 'http://192.168.31.218:7001/'

axios.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('token')
        if (token) config.headers.Authorization = token
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

axios.interceptors.response.use(
    response => {
        return response.data
    }
)


export class UserRequest {
    static url = 'user/'

    static async Token () {

        const token = await AsyncStorage.getItem('token')
        if (!token) return
        const res: any = await axios.post(this.url + 'Token')
        if (res.state === 'err' || !res.data) return await AsyncStorage.removeItem('token')
        store.dispatch({
            type: 'user/signIn',
            value: {...res.data}
        })
    }


    static signUp ({phone, password}: { phone: string, password: string }) {
        return axios.post(this.url + 'signUp', {phone, password})
    }

    static signIn ({phone, password}: { phone: string, password: string }) {
        return axios.post(this.url + 'signIn', {phone, password})
    }

    static people ({_id}: { _id: string }): any {
        return axios.get(this.url + 'people', {params: {_id}})
    }

    static getDynamicApp ({user_id, page}: { user_id: string, page: number }) {
        return axios.get(this.url + 'getDynamicApp', {params: {user_id, page}})
    }

    static getAttentionPeople ({_id, page}: { _id: string, page: number }) {
        return axios.get(this.url + 'getAttentionPeople', {params: {_id, page}})
    }

    static getFansPeople ({_id, page}: { _id: string, page: number }) {
        return axios.get(this.url + 'getFansPeople', {params: {_id, page}})
    }

    static attention ({_id, type}: { _id: string, type: string }) {
        return axios.get(this.url + 'attention', {params: {_id, type}})
    }


}


export class QuestionRequest {
    static url = 'question/'


    static RecommendListData ({page}: { page: number }) {
        return axios.get(this.url + 'RecommendListData', {params: {page}})
    }

    static PeopleReply ({_id, page}: { _id: string, page: number }) {
        return axios.get(this.url + 'PeopleReply', {params: {_id, page}})
    }

    static PeopleQuestion ({_id, page}: { _id: string, page: number }) {
        return axios.get(this.url + 'PeopleQuestion', {params: {_id, page}})
    }

    static findOne ({_id}: { _id: string | undefined }) {
        return axios.get(this.url + 'findOne', {params: {_id}})
    }

    static getReply ({question_id, reply_id}: { question_id: string | undefined, reply_id?: string }) {
        return axios.get(this.url + 'getReply', {params: {question_id, reply_id}})
    }

    static getReplyNin ({question_id, reply_id, page}: { question_id: string, reply_id: string, page: number }) {
        return axios.get(this.url + 'getReplyNin', {params: {question_id, reply_id, page}})
    }


    static voters ({like, reply_id}: { like: { flag: string, type: string }, reply_id: string, }) {
        return axios.post(this.url + 'voters', {like, reply_id})
    }


}


export class CommentRequest {
    static url = 'comment/'

    static Like ({comment_id, type}: { comment_id: string, type: string }) {
        return axios.post(this.url + 'Like', {comment_id, type})
    }

    static featuredComment ({reply_id}: { reply_id: string }) {
        return axios.get(this.url + 'featuredComment', {params: {reply_id}})
    }

    static findComment ({reply_id}: { reply_id: string }) {
        return axios.get(this.url + 'findComment', {params: {reply_id}})
    }

    static create ({question_id, reply_id, content, type, Father_id, reply_user_id, Child_id}: { question_id: string, reply_id: string, content: string, type: string, Father_id: string, reply_user_id?: string, Child_id?: string }) {
        return axios.post(this.url + 'create', {
            question_id,
            reply_id,
            content,
            type,
            Father_id,
            reply_user_id,
            Child_id
        })

    }


}
