import React, { FC, useState } from 'react'
import Modal from 'react-native-modal'
import { TextInput, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components/native'
import { LeaveMessageRequest } from '../../../../utils/request'

interface Props {
    visible: boolean,
    onSetModal: (type: boolean) => any,
    listRef: any
}

const InputModal: FC<Props> = ({visible, onSetModal, listRef}) => {

    const [value, setValue] = useState('')

    const _onButton = async () => {
        await LeaveMessageRequest.create({content: value})
        listRef._onRefresh()
        onSetModal(false)()
        setValue('')
    }

    return (
        <Modal
            isVisible={visible}
            backdropOpacity={0.6}
            avoidKeyboard
            onBackdropPress={onSetModal(false)}
            backdropTransitionOutTiming={0}
            onSwipeComplete={onSetModal(false)}
            swipeDirection='down'
            onBackButtonPress={onSetModal(false)}
            // @ts-ignore
            statusBarTranslucent
        >
            <ModalView>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingLeft: 15,
                        paddingRight: 15,
                        paddingTop: 10,
                        paddingBottom: 10
                    }}
                >
                    <TouchableOpacity onPress={onSetModal(false)}>
                        <Text>取消</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={_onButton} disabled={value.length < 3}
                        style={{opacity: value.length < 3 ? 0.4 : 1}}
                    >
                        <Text>提交</Text>
                    </TouchableOpacity>
                </View>
                <View style={{borderTopWidth: 1, borderTopColor: '#f6f6f6', height: 180}}>
                    <TextInput
                        multiline
                        style={{maxHeight: 180, padding: 15, fontSize: 16, color: '#1a1a1a'}}
                        placeholder=' 请畅所欲言...'
                        value={value}
                        onChangeText={text => setValue(text)}
                    />
                </View>
            </ModalView>
        </Modal>
    )
}

const ModalView = styled.View`
background-color: #fff;
border-radius: 5px;
margin-bottom: auto;
margin-top: 60px;
padding-bottom: 5px;
`
const Text = styled.Text`
color: #175199;
font-size: 16px;
`

export default InputModal
