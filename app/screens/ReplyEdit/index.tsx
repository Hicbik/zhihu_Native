import React, { FC } from 'react'
import AutoHeightWebView from 'react-native-autoheight-webview'

const ReplyEdit:FC = () => {
    return (
        <AutoHeightWebView source={{uri:'file:///android_asset/web/'}}/>
    )
}

export default ReplyEdit
