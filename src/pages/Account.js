import React, { useState } from 'react';
import { View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Avatar, Image, ListItem, Overlay, Text, Icon, Card, Input, Button } from 'react-native-elements';
import ImageCropPicker from 'react-native-image-crop-picker';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData, updateUserPhoto } from '../actions';

const Account = (props) => {

    const { iduser, username, email, password, role, status, photo } = useSelector((state) => {
        return {
            iduser: state.userReducer.id,
            username: state.userReducer.username,
            email: state.userReducer.email,
            password: state.userReducer.password,
            role: state.userReducer.role,
            status: state.userReducer.status,
            photo: state.userReducer.photo
        }
    })

    const [editable, setEditable] = useState(true)

    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)
    const [emailInput, setInEmailInput] = useState(email)
    const [usernameInput, setInUsernameInput] = useState(username)
    const [passwordInput, setInPasswordInput] = useState(password)
    const [onPassword, setInOnPassword] = useState(true)

    const ShowPassword = (status) => {
        setInOnPassword(status)
    }

    const onBtEditable = () => {
        if (editable == true) {
            setEditable(false)
        } else if (editable == false) {
            setEditable(true)
        }
    }



    const onBtImage = async (type) => {
        try {
            let image;
            if (type == "gallery") {
                let image = await ImageCropPicker.openPicker({
                    width: wp(40),
                    height: wp(40),
                    cropping: true,
                    mediaType: 'photo'
                })
            } else if (type == "camera") {
                let image = await ImageCropPicker.openCamera({
                    width: wp(40),
                    height: wp(40),
                    cropping: true,
                    mediaType: 'photo'
                })
            }

            if (image.path) {
                let res = await dispatch(updateUserPhoto(image.path, iduser))
                if (res.success) {
                    setVisible(!visible)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <Overlay isVisible={visible} onBackdropPress={() => setVisible(!visible)}>
                <ListItem containerStyle={{ width: wp(65) }} onPress={() => onBtImage("gallery")}>
                    <Icon name="folder" type="feather" />
                    <ListItem.Content>
                        <ListItem.Title>Select from Gallery</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem containerStyle={{ width: wp(65) }} onPress={() => onBtImage("camera")}>
                    <Icon name="camera" type="feather" />
                    <ListItem.Content>
                        <ListItem.Title>Open Camera</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            </Overlay>
            <ScrollView>
                <KeyboardAvoidingView behavior="position">
                    <Avatar
                        containerStyle={{ alignSelf: "center", marginTop: 16 }}
                        rounded
                        size="xlarge"
                        source={{ uri: photo }}
                    >
                        <Avatar.Accessory
                            name="edit"
                            type="feather"
                            size={40}
                            iconStyle={{ fontSize: 20 }}
                            onPress={() => setVisible(!visible)}
                        />
                    </Avatar>
                    <View>
                        <Card containerStyle={{ padding: 10, marginHorizontal: 30, marginVertical: 10 }}>
                            <Card.Title style={{ textAlign: 'left', fontSize: 12 }}>Username</Card.Title>
                            <Input placeholder="Your Username" value={editable ? username : usernameInput}
                                onChangeText={(val) => setInUsernameInput(val)}
                                disabled={editable}
                            />
                        </Card>
                        <Card containerStyle={{ padding: 10, marginHorizontal: 30 }}>
                            <Card.Title style={{ textAlign: 'left', fontSize: 12 }}>Email</Card.Title>
                            <Input placeholder="Your Email" value={editable ? email : emailInput}
                                onChangeText={(val) => setInEmailInput(val)}
                                disabled={editable}
                            />
                        </Card>
                        <Card containerStyle={{ padding: 10, marginHorizontal: 30 }}>
                            <Card.Title style={{ textAlign: 'left', fontSize: 12 }}>Password</Card.Title>
                            <Input placeholder="Password" value={editable ? password : passwordInput}
                                onChangeText={(val) => setInPasswordInput(val)}
                                secureTextEntry={onPassword}
                                rightIcon={
                                    onPassword == true ?
                                        <Icon onPress={() => ShowPassword(false)} name="eye" type="feather" color="#bdc3c7" />
                                        :
                                        <Icon onPress={() => ShowPassword(true)} name="eye-off" type="feather" color="#bdc3c7" />
                                }
                                disabled={editable}
                            />
                        </Card>
                        <View style={{ flexDirection: 'row', justifyContent: "space-around", marginVertical: 10, marginHorizontal: 30 }}>
                            <Button
                                title={editable ? "Edit" : "Cancel"}
                                titleStyle={{ fontSize: 16, color: "#4FA4F3" }}
                                buttonStyle={{ borderColor: "#4FA4F3", width: 120 }}
                                type="outline"
                                onPress={onBtEditable}
                            />
                            <Button
                                title="Save"
                                titleStyle={{ fontSize: 16, color: "#4FA4F3" }}
                                buttonStyle={{ borderColor: "#4FA4F3", width: 120 }}
                                type="outline"
                                disabled={editable}
                                onPress={() => { dispatch(updateUserData(usernameInput, emailInput, passwordInput, iduser)), setEditable(!editable) }}
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>

        </View>
    )
}

export default Account