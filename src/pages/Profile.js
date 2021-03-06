import AsyncStorageLib from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Avatar, Badge, ButtonGroup, Text, Icon, ListItem } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector, useDispatch } from 'react-redux';
import { logOutAction } from '../actions';

const Profile = (props) => {

    const dispatch = useDispatch();
    const { iduser, username, email, status, photo } = useSelector((state) => {
        return {
            iduser: state.userReducer.id,
            username: state.userReducer.username,
            email: state.userReducer.email,
            status: state.userReducer.status,
            photo: state.userReducer.photo
        }
    })

    useEffect(() => {
        if (!iduser) {
            props.navigation.reset({
                index: 0, //utk mendelete seluruh history tombol back page
                routes: [{ name: "Login" }]
            })
        }
    })

    const [saldo, setSaldo] = useState([
        {
            nameIcon: "credit-card",
            title: "Promo",
            qty: 7
        },
        {
            nameIcon: "award",
            title: "Reward",
            qty: 7
        },
        {
            nameIcon: "dollar-sign",
            title: "Saldo",
            qty: 700
        },
    ])

    const [listMenu, setListMenu] = useState([
        {
            title: "Transactions",
            icon: "cart",
            press: () => props.navigation.navigate("History")
        },
        {
            title: "My Promo",
            icon: "card-bulleted-outline",
            press: () => { }
        },
        {
            title: "Address List",
            icon: "map",
            press: () => { }
        },
    ])

    const [menuSettings, setMenuSettings] = useState([
        {
            title: "Settings",
            icon: "cog-outline",
            press: () => { }
        },
        {
            title: "Privacy and Policy",
            icon: "shield-account",
            press: () => { }
        },
        {
            title: "Logout",
            icon: "logout",
            press: () => {
                dispatch(logOutAction());
            }
        },
    ])

    const printListMenu = () => {
        return listMenu.map((value, index) => {
            return <ListItem key={index.toString()} onPress={value.press}>
                <Icon name={value.icon} size={25} type='material-community' color="#1b1464" />
                <ListItem.Content>
                    <ListItem.Title>{value.title}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        })
    }
    const printMenuSettings = () => {
        return menuSettings.map((value, index) => {
            return <ListItem key={index.toString()} onPress={value.press}>
                <Icon name={value.icon} size={25} type='material-community' color="#1b1464" />
                <ListItem.Content>
                    <ListItem.Title>{value.title}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        })
    }

    const printSaldo = () => {
        return saldo.map((value, index) => {
            return <View style={{ flex: 1, borderWidth: 0.7, borderColor: "gray", padding: 10, borderRadius: 10, backgroundColor: "white" }}>
                <Icon
                    size={32}
                    type="feather"
                    name={value.nameIcon}
                />
                <Text style={{ fontWeight: "bold", fontSize: 16, textAlign: "center" }}>{value.title}</Text>
                <Text style={{ textAlign: "center" }}>{value.title == "Saldo" && "$"}{value.qty}</Text>
            </View>
        })
    }

    return (
        <View style={{ flex: 1, paddingTop: hp(7), backgroundColor: "white" }}>
            <View style={{
                backgroundColor: "#1B1464",
                paddingHorizontal: wp(3),
                paddingVertical: hp(4)
            }}>
                <View style={{ flexDirection: "row" }}>
                    <Avatar
                        rounded
                        size="large"
                        source={{ uri: photo }}
                    />
                    <View style={{ marginLeft: wp(5) }}>
                        <Text style={{ color: "yellow" }} h4>{username} <Badge value={status} status="success" /></Text>
                        <Text style={{ color: "white" }}>{email}</Text>
                    </View>
                    <Icon
                        size={28}
                        type='material-community'
                        name="account-edit"
                        color="white"
                        onPress = {()=> props.navigation.navigate("Account Detail")}
                    />
                </View>
                <View style={{ flexDirection: "row", marginTop: hp(4) }}>
                    {printSaldo()}
                </View>
            </View>
            <View style={{
                paddingHorizontal: wp(3),
                backgroundColor: "white",
                paddingTop: hp(3),
                marginTop: hp(-3),
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20
            }}>
                <View>
                    <Text h4 style={{ color: "#1b1464" }}>Account</Text>
                    {printListMenu()}
                </View>
                <View>
                    <Text h4 style={{ color: "#1b1464" }}>Settings</Text>
                    {printMenuSettings()}
                </View>
            </View>
        </View>
    )
}

export default Profile