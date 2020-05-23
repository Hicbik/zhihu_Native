import React, { FC, useState, useImperativeHandle } from 'react'
import Modal from 'react-native-modal'
import HomeModalMain from './HomeModalMain'
import { BlurView } from '@react-native-community/blur'


interface Props {
    cRef: any
}

const HomeModal: FC<Props> = ({cRef}) => {

    const [visible, setVisible] = useState(false)

    useImperativeHandle(cRef, () => ({
        openModal () {
            setVisible(true)
        }
    }))

    return (
        <Modal
            isVisible={visible}
            style={{margin: 0}}
            propagateSwipe
            backdropOpacity={1}
            onBackButtonPress={()=>setVisible(false)}
            // @ts-ignore
            statusBarTranslucent
            customBackdrop={
                <BlurView
                    style={{flex: 1}}
                    blurType="light"
                    blurAmount={20}
                    reducedTransparencyFallbackColor="white"
                />
            }
        >
            <HomeModalMain setVisible={setVisible} visible={visible}/>
        </Modal>
    )
}


export default HomeModal
