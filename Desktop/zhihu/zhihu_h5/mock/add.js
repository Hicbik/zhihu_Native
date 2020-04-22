const axios = require('axios')

axios.interceptors.request.use(
    config => {
        config.headers.Authorization = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjE4MjExNDc4OTI4IiwicGFzc3dvcmQiOiJlMTBhZGMzOTQ5YmE1OWFiYmU1NmUwNTdmMjBmODgzZSIsImlhdCI6MTU4Njg1NDY4NywiZXhwIjoxNTg5NDQ2Njg3fQ.yf_yu6PpOS-z9wyHZKMiwtK184dDVkMqCYrR-zLtzRA`
        return config
    },
    err => {
        return Promise.reject(err)
    }
)


;(async () => {
    for (let i = 0; i < 50; i++) {
        const title = `第${i}位用户 前端有哪些属于解决一个问题引来新问题的行为？` + i
        const content = i + `前端的问题是太难复用，怎么理解组件就花了10年。理解到组件=f g（数据），又花了很久。而现在组件我们认为不是数据的映射，是行为的集合，组件=fg，然后依赖context。`
        const content_html = `<p>${i}前端的问题是太难复用，怎么理解组件就花了10年。理解到组件=f g（数据），又花了很久。而现在组件我们认为不是数据的映射，是行为的集合，组件=fg，然后依赖context。</p>`
        const topic = ['测试','前端']
        let res = await axios.post('http://192.168.31.218:7001/question/create',{ title,content,content_html,topic })
        console.log(res.data)
        console.log(i)
    }
})()

// ;(async () => {
//     for (let i = 0; i < 50; i++) {
//         await axios.post('http://192.168.31.218:7001/user/signUp',{ phone:'1854412384' + i,password:'123456' })
//         console.log(i)
//     }
// })()
