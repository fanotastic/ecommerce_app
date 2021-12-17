import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Image, StatusBar, KeyboardAvoidingView, Alert } from 'react-native';
import { Button, Input, Text, Icon, SocialIcon } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { API_URL } from '../helper';
import { StackActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { onLogin } from '../actions';

const LoginPage = (props) => {
    // useDispatch: digunakan utk menjalankan fungsi dari action, pengganti connect class component
    const dispatch = useDispatch();

    // useSelector: pengganti mapToProps pada class component
    const { iduser, usernameReducer } = useSelector((state) => {
        return {
            iduser: state.userReducer.id,
            usernameReducer: state.userReducer.username
        }
    })

    const [username, setInUsername] = useState("")
    const [password, setInPassword] = useState("")
    const [onPassword, setInOnPassword] = useState(true)

    useEffect(() => {
        if (iduser) {
            props.navigation.dispatch(StackActions.replace("TabNav"))
        }
    })

    const ShowPassword = (status) => {
        setInOnPassword(status)
    }

    const onBtLogin = async () => {


        let respon = await dispatch(onLogin(username, password));
        console.log(respon)

        if (respon.success > 0) {
            props.navigation.dispatch(StackActions.replace("TabNav"))
        } else {
            Alert.alert("This account is not exist!")
        }

        // try {
        //     let res = await axios.get(`${API_URL}/users?username=${username}&password=${password}`)

        //     if(res.data.length > 0) {
        //         console.log("test1", res.data)
        //         console.log("test1", res.data[0])
        //         props.navigation.dispatch(StackActions.replace("TabNav"))
        //     }else{
        //         Alert.alert("This account is not exist!")
        //     }
        //     console.log(res.data)
        // } catch (error) {
        //     console.log(error)
        // }
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 20 }}>
            <StatusBar backgroundColor={"white"} barStyle='dark-content' />
            <KeyboardAvoidingView behavior="position">
                <Image source={require('../assets/login_asset.png')}
                    style={{ height: hp(35), width: wp(100) }}
                />
                <Text h2 style={{ color: "#1b1464" }}>Login</Text>
                <View style={{ marginVertical: hp(3) }}>
                    <Input placeholder="Input Username"
                        onChangeText={(val) => setInUsername(val)}
                        leftIcon={
                            <Icon name="user" type="feather" color="#bdc3c7" />
                        }
                    />
                    <Input placeholder="Input Password"
                        onChangeText={(val) => setInPassword(val)}
                        secureTextEntry={onPassword}
                        leftIcon={
                            <Icon name="lock" type="feather" color="#bdc3c7" />
                        }
                        rightIcon={
                            onPassword == true ?
                                <Icon onPress={() => ShowPassword(false)} name="eye" type="feather" color="#bdc3c7" />
                                :
                                <Icon onPress={() => ShowPassword(true)} name="eye-off" type="feather" color="#bdc3c7" />
                        }
                    />
                </View>
                <Button
                    title="Login"
                    containerStyle={{ borderRadius: 10 }}
                    buttonStyle={{ backgroundColor: "#00a8ff" }}
                    onPress={onBtLogin}
                />
                <Text style={{ textAlign: "center", color: "gray", marginVertical: hp(3) }}>or</Text>
                <Button
                    title="Login with Google"
                    titleStyle={{ color: "black" }}
                    containerStyle={{ borderRadius: 10 }}
                    icon={<SocialIcon type="google" iconSize={10} raised={false} />}
                    buttonStyle={{ backgroundColor: "#ecf0f1" }}
                />
                <View style={{ marginTop: hp(2.5) }}>
                    <Text style={{ textAlign: "center" }}>
                        No have account?
                        <Text
                            style={{ fontWeight: "bold", color: "#00a8ff" }}
                            onPress={() => props.navigation.navigate("Register")}
                        > Register

                        </Text>
                    </Text>
                </View>
            </KeyboardAvoidingView>

        </View>

    )
}

export default LoginPage;