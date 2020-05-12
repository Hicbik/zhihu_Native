import dayjs from 'dayjs'

const nowDate = dayjs()

export const DiffTime = (time: any) => {
    const ptime = dayjs(time)
    let dateDiff
    if (!nowDate.isSame(time, 'year')) return ptime.format('YYYY年 MM月DD日')

    dateDiff = nowDate.diff(ptime, 'minute')
    if (dateDiff < 60) return dateDiff < 5 ? '刚刚' : dateDiff + ' 分钟前'

    dateDiff = nowDate.diff(ptime, 'hour')
    if (dateDiff < 24) return dateDiff + ' 小时前'

    dateDiff = nowDate.diff(ptime, 'day')
    if (dateDiff < 8) return dateDiff + ' 天前'

    return ptime.format('MM月DD日')
}

export const ChatTime = (time: any) => {
    const ptime = dayjs(time)
    let dateDiff
    if (!nowDate.isSame(time, 'year')) return ptime.format('YYYY年 MM月DD日 HH:m')


    dateDiff = nowDate.diff(ptime, 'day')
    if (dateDiff === 1) return ptime.format('昨天 HH:m')
    if (dateDiff > 1) return ptime.format('MM月DD日 HH:m')

    return ptime.format('HH:m')
}

export const messageTime = (prevTime: any, time: any) => {
    const diff = dayjs(prevTime).diff(dayjs(time), 'minute')
    return diff < -30
}