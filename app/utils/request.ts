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


}


export class QuestionRequest {
    static url = 'question/'


    static RecommendListData ({page}: { page: number }) {
        return axios.get(this.url + 'RecommendListData', {params: {page}})
    }

    static PeopleReply ({_id, page}: { _id: string, page: number }) {
        return axios.get(this.url + 'PeopleReply', {params: {_id, page}})
    }


}


