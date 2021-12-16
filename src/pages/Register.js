import axios from 'axios';
import React, { useState } from 'react';
import { View, Image, StatusBar, KeyboardAvoidingView, Alert } from 'react-native';
import { Button, Input, Text, Icon, SocialIcon } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { Register } from '../actions';
import { API_URL } from '../helper';



const RegisterPage = (props) => {

    const dispatch = useDispatch();

    const [email, setInEmail] = useState("")
    const [username, setInUsername] = useState("")
    const [password, setInPassword] = useState("")
    const [onPassword, setInOnPassword] = useState(true)

    const ShowPassword = (status) => {
        setInOnPassword(status)
    }

    const onBtRegister = async () => {

        let res = await dispatch(Register(username, email, password));

        if(res.success > 0){
            console.log("Register berhasil", res)
            Alert.alert("Register berhasil silahkan login :)")
        }else{
            Alert.alert("Lengkapi semua data")
        }
        

        // try {
        //     let res = await axios.post((`${API_URL}/users`), {
        //         username: username,
        //         email: email,
        //         password: password,
        //         role: "user",
        //         status: "Active",
        //         cart: []
        //     })
        //     console.log("Register Berhasil", res.data)
        // } catch (error) {
        //     console.log(err)
        // }
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 20, height: hp(100) }}>
            <StatusBar backgroundColor={"white"} barStyle='dark-content' />
            <KeyboardAvoidingView behavior="position">
                <Icon
                    containerStyle={{ position: "absolute", zIndex: 10 }}
                    // raised
                    name='arrow-left'
                    type='font-awesome'
                    color='#2d3436'
                    onPress={() => props.navigation.goBack()}
                />
                <Image source={require('../assets/register_asset.png')}
                    style={{ height: hp(35), width: wp(100) }}
                />
                <Text h2 style={{ color: "#1b1464" }}>Register</Text>
                <View style={{ marginTop: hp(3) }}>
                    <Input placeholder="Username"
                        onChangeText={(val) => setInUsername(val)}
                        leftIcon={
                            <Icon name="user" type="feather" color="#bdc3c7" />
                        }
                    />
                    <Input placeholder="Email"
                        onChangeText={(val) => setInEmail(val)}
                        leftIcon={
                            <Icon name="mail" type="feather" color="#bdc3c7" />
                        }
                    />
                    <Input placeholder="Password"
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
                <Text style={{ marginBottom: hp(2) }}>
                    By signing up, you're agree to our
                    <Text style={{ fontWeight: "bold", color: "#00a8ff" }}> Terms & Conditions </Text>
                    and
                    <Text style={{ fontWeight: "bold", color: "#00a8ff" }}> Privacy Policy</Text>
                </Text>
                <Button
                    title="Register"
                    containerStyle={{ borderRadius: 10 }}
                    buttonStyle={{ backgroundColor: "#00a8ff" }}
                    onPress={onBtRegister}
                />
                <View style={{ marginTop: hp(4) }}>
                    <Text style={{ textAlign: "center" }}>
                        Joined us before?
                        <Text style={{ fontWeight: "bold", color: "#00a8ff" }} onPress={() => props.navigation.navigate("Login")}> Login</Text>
                    </Text>
                </View>
            </KeyboardAvoidingView>

        </View>
    )
}

export default RegisterPage;