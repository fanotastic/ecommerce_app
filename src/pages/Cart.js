import axios from 'axios';
import React, { useState } from 'react';
import { View, Image, ScrollView, Alert } from 'react-native';
import { Icon, Text, Button } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserCart } from '../actions';
import { API_URL } from '../helper';


const dataCart = [
    {
        "nama": "IDALINNEA D",
        "deskripsi": " Ritsleting yang tersembunyi membuat sarung mudah dilepas.  Sarung bantal dengan tampilan cermin karena memiliki pola yang sama di kedua sisi.  Katun adalah bahan alami lembut dan mudah dirawat yang dapat Anda cuci dengan mesin.",
        "brand": "IKEA",
        "type": "M",
        "harga": 79000,
        "qty": 7,
        "images": [
            "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/107/0810720_PE771385_S4.jpg",
            "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/107/0810719_PE771386_S4.jpg"
        ],
        "id": 1
    },
    {
        "nama": "HAUGA V.2",
        "brand": "Mr. DYI",
        "deskripsi": "Mudah untuk menyembunyikan kabel dan stopkontak tapi tetap dapat dijangkau dengan jalur kabel di bagian belakang.",
        "type": "Putih",
        "harga": 1200000,
        "qty": 5,
        "images": [
            "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/557/0955765_PE804101_S4.jpg",
            "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/594/0959497_PE806037_S4.jpg",
            "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/727/0972709_PE811745_S4.jpg",
            "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/557/0955706_PE803970_S4.jpg"
        ],
        "id": 2
    },
    {
        "nama": "LINNEBÄCK",
        "deskripsi": "Lebar:\t55 cm Kedalaman:\t69,5 cm Tinggi:\t72,4 cm Lebar dudukan:\t57 cm Kedalaman dudukan:\t50 cm Tinggi dudukan:\t42,4 cm Berat total:\t6,50 kg",
        "brand": "IKEA",
        "type": "Kursi",
        "harga": 995000,
        "qty": 2,
        "images": [
            "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/334/0933452_PE791908_S4.jpg",
            "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/407/0940712_PE795127_S4.jpg"
        ],
        "id": 3
    },
    {
        "nama": "IDANÄS",
        "deskripsi": " Anda dapat dengan mudah menyedot debu di bawah rangka tempat tidur untuk menjaga ruang tetap bersih dan bebas debu.  Ada banyak ruang di bawah tempat tidur untuk kotak penyimpanan sehingga sempurna untuk menyimpan selimut dan bantal tambahan.  Sisi tempat tidur dapat disesuaikan memungkinkan Anda untuk menggunakan kasur dengan ketebalan yang berbeda.  Veneer kayu memberi Anda tampilan, rasa dan keindahan yang sama seperti kayu solid dengan variasi unik dalam serat, warna, dan tekstur.",
        "brand": "IKEA",
        "type": "Cokelat",
        "harga": 5499000,
        "qty": 9,
        "images": [
            "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/160/0916066_PE784942_S4.jpg",
            "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/323/0932344_PE791460_S4.jpg",
            "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/391/0939185_PE794439_S4.jpg"
        ],
        "id": 4
    },
    {
        "nama": "RUDSTA",
        "deskripsi": " Anda dapat dengan mudah menyedot debu di bawah rangka tempat tidur untuk menjaga ruang tetap bersih dan bebas debu.  Ada banyak ruang di bawah tempat tidur untuk kotak penyimpanan sehingga sempurna untuk menyimpan selimut dan bantal tambahan.  Sisi tempat tidur dapat disesuaikan memungkinkan Anda untuk menggunakan kasur dengan ketebalan yang berbeda.  Veneer kayu memberi Anda tampilan, rasa dan keindahan yang sama seperti kayu solid dengan variasi unik dalam serat, warna, dan tekstur.",
        "brand": "IKEA",
        "type": "Hitam",
        "harga": 2499000,
        "qty": 2,
        "images": [
            "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/390/0939002_PE794384_S4.jpg",
            "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/388/0938824_PE794380_S4.jpg",
            "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/741/0974172_PE812299_S4.jpg"
        ],
        "id": 5
    },
    {
        "nama": "VARDAGEN",
        "deskripsi": "M",
        "brand": "IKEA",
        "type": "Biru",
        "harga": 599000,
        "qty": 4,
        "images": [
            "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/771/0677106_PE718920_S4.jpg",
            "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/938/0893875_PE718921_S4.jpg",
            "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/938/0893878_PE718922_S4.jpg"
        ],
        "id": 6
    },
    {
        "nama": "VITLÖK",
        "deskripsi": "Pot tanaman digalvanis agar terlindung dari karat.",
        "brand": "IKEA",
        "type": "Putih",
        "harga": 299000,
        "qty": 8,
        "images": [
            "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/541/0954177_PE804200_S4.jpg",
            "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/541/0954178_PE804201_S4.jpg",
            "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/541/0954179_PE804202_S4.jpg"
        ],
        "id": 7
    },
    {
        "nama": "IDALINNEA E",
        "deskripsi": " Ritsleting yang tersembunyi membuat sarung mudah dilepas.  Sarung bantal dengan tampilan cermin karena memiliki pola yang sama di kedua sisi.  Katun adalah bahan alami lembut dan mudah dirawat yang dapat Anda cuci dengan mesin.",
        "brand": "IKEA",
        "type": "L",
        "harga": 79000,
        "qty": 2,
        "images": [
            "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/107/0810719_PE771386_S4.jpg",
            "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/107/0810720_PE771385_S4.jpg"
        ],
        "id": 8
    }
]

const Cart = (props) => {

    const dispatch = useDispatch()
    const [totalHarga, setTotalHarga] = useState(0)

    const { cart, idUser, username } = useSelector((state) => {
        return {
            cart: state.userReducer.cart,
            idUser: state.userReducer.id,
            username: state.userReducer.username
        }
    })

    const btInc = (index) => {
        let temp = [...cart];
        temp[index].qty += 1
        dispatch(updateUserCart(temp, idUser))
    }
    const btDec = (index) => {
        let temp = [...cart];
        if (temp[index].qty > 1) {
            temp[index].qty -= 1
        } else {
            Alert.alert("Attention!", "Are you sure want to delete?",
                [
                    {
                        text: "Yes",
                        onPress: () => btRemove(index)
                    },
                    {
                        text: "No"
                    }

                ])
        }
        dispatch(updateUserCart(temp, idUser))
    }

    const btRemove = (index) => {
        let temp = [...cart];
        temp.splice(index, 1)
        dispatch(updateUserCart(temp, idUser))

    }

    const Total = () => {
        let total = 0
        cart.forEach((value) => total += value.qty * value.harga)
        return total
    }

    const shipping = () => {
        let total = 0
        cart.forEach((value) => total += (value.qty * value.harga) * 20 / 100)
        return total
    }
    const tax = () => {
        let total = 0
        cart.forEach((value) => total += (value.qty * value.harga) * 10 / 100)
        return total
    }


    const onBtCheckOut = () => {
        const date = new Date();
        let total = Total() + shipping() + tax()
        let dataKeranjang = {
            iduser: idUser,
            username: username,
            invoice: `#INV ${date.getDate()}`,
            date: date.toLocaleString(),
            totalPayment: total,
            shipping: shipping(),
            detail: [...cart],
            status:"Menunggu Konfirmasi"
        }
        axios.post(`${API_URL}/userTransactions`, dataKeranjang)
        .then((response)=> {
            dispatch(updateUserCart([], idUser))
        }).catch((error)=>{
            console.log(error)
        })
        Alert.alert("Checkout Success!", "Continue to payment",[
            {
                text: "To home page",
                onPress: () => props.navigation.goBack()
            }
        ])
    }

    const printCart = () => {
        return cart.map((value, index) => {
            return (
                <View style={{ flexDirection: 'row', display: 'flex' }}>
                    <Image source={{ uri: value.image[0] }} style={{ width: wp(20), height: hp(10) }} />
                    <View style={{ flexDirection: 'row', marginHorizontal: 30 }}>
                        <View style={{ justifyContent: 'space-evenly' }}>
                            <Text style={{ fontWeight: '800' }}>{value.nama}</Text>
                            <Text>{value.type}</Text>
                            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                                <Button
                                    icon={
                                        <Icon type="feather" size={10} name="minus" />
                                    }
                                    type="clear"
                                    containerStyle={{
                                        backgroundColor: "#bdc3c7"
                                    }}
                                    titleStyle={{
                                        color: "black"
                                    }}
                                    onPress={() => btDec(index)}
                                />
                                <Text style={{ fontWeight: '700', fontSize: 18 }}>   {value.qty}   </Text>
                                <Button
                                    icon={
                                        <Icon type="feather" size={10} name="plus" />
                                    }

                                    type="clear"
                                    containerStyle={{
                                        backgroundColor: "#bdc3c7"
                                    }}
                                    titleStyle={{
                                        color: "black"
                                    }}
                                    onPress={() => btInc(index)}

                                />

                            </View>
                        </View>
                    </View>
                    <View style={{ alignItems: "flex-end", flex: 1 }}>
                        <Text style={{ fontSize: 20, fontWeight: '700', color: "#001378" }}>Rp. {value.harga}</Text>
                        <Text></Text>
                        <Icon type="feather" size={16} name="trash-2" onPress={() => btRemove(index)} />
                    </View>
                </View>
            )
        })
    }

    return (
        <View style={{ flex: 1, paddingTop: hp(10), backgroundColor: "white", paddingHorizontal: wp(5) }}>
            <Text h4 style={{ textAlign: 'center' }}>Cart</Text>
            <View style={{ height: hp(50), marginVertical: hp(3) }}>
                <ScrollView>
                    {printCart()}
                </ScrollView>
            </View>
            <View style={{ paddingVertical: hp(5), borderTopWidth: 1, borderColor: "#bdc3c7",  justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: hp(2) }}>
                    <Text>Shipping</Text>
                    <Text>Rp. {shipping()}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text>Tax</Text>
                    <Text>Rp. {tax()} </Text>
                </View>
                <View style={{ flexDirection: "row", marginVertical: hp(2), justifyContent: "space-between" }}>
                    <Text>Total</Text>
                    <Text>Rp.{Total()} </Text>
                </View>
                <Button
                    title={<Text style={{ fontWeight: '800', fontSize: 18 }}>Checkout Rp.{Total() + tax() + shipping()}</Text>}
                    type="clear"
                    containerStyle={{
                        marginBottom: 10,
                        borderRadius: 25,
                        backgroundColor: "yellow"
                    }}
                    titleStyle={{
                        color: "#001378"
                    }}
                    onPress={onBtCheckOut}
                />
            </View>
        </View>
    )
}

export default Cart;