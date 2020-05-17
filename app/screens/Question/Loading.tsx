import React, { FC } from 'react'
import { Fade, Placeholder, PlaceholderLine, PlaceholderMedia } from 'rn-placeholder'
import { View } from 'react-native'

const Loading: FC = () => {
    return (
        <Placeholder Animation={Fade} style={{padding: 15}} >
            <View style={{marginBottom: 20, flexDirection: 'row'}}>
                <PlaceholderMedia style={{borderRadius: 17.5, width: 35, height: 35}} />
                <View style={{flex: 1, marginLeft: 12}}>
                    <PlaceholderLine width={25} />
                    <PlaceholderLine width={15} />
                </View>
            </View>
            <PlaceholderLine />
            <PlaceholderLine />
            <PlaceholderLine />
            <PlaceholderLine width={45} />

        </Placeholder>
    )
}

export default Loading
