import React, { useEffect, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { Badge, Button, Text } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { API_URL } from '../helper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import axios from 'axios';


const HistoryPage = (props) => {

    const [transaksi, setTransaksi] = useState([])
    const [statusIdx, setStatusIdx] = useState(0)

    const { iduser } = useSelector((state) => {
        return {
            iduser: state.userReducer.id
        }
    })

    useEffect(() => {
        getData()
    }, [])

    const [status, setStatus] = useState([
        "Semua", "Menunggu Konfirmasi", "Terima Pesanan", "Pesanan Batal"
    ])

    const getTransaksiFilter = (status, statusActive) => {
        axios.get(`${API_URL}/userTransactions${statusActive > 0 ? `?status=${status}` : ""}`)
            .then((res) => {
                setTransaksi(res.data)
                setStatusIdx(statusActive)
            })
    }

    const btConfirm = (id, confirm) => {
        axios.patch(`${API_URL}/userTransactions/${id}`, { status: confirm })
            .then((res) => {
                getData()
            }).catch((err) => {
                console.log(err)
            })
    }

    const getData = async () => {
        try {
            let res = await axios.get(`${API_URL}/userTransactions?iduser=${iduser}`)
            console.log("ini data transaksi", res.data)
            setTransaksi(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const printTransaksi = () => {
        return transaksi.map((value, index) => {
            let badgeColor = value.status.includes("Batal") ? "error" : value.status.includes("Terima") ? "success" : "warning"
            return (
                <View style={{ marginVertical: hp(2), borderWidth: 1, borderRadius: 20, borderColor: '#ecf0f1' }}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        backgroundColor: "#1b1464",
                        paddingHorizontal: wp(2),
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10
                    }}>
                        <View>
                            <Text style={{ color: 'white' }}>{value.invoice}</Text>
                            <Text style={{ color: 'white' }}>{value.date} </Text>
                        </View>
                        <View style={{ marginVertical: hp(2) }}>
                            <Badge value={value.status} status={badgeColor} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", marginVertical: hp(2), marginRight: wp(5) }}>
                        <Image source={{ uri: value.detail[0].image }} style={{ width: wp(20), height: hp(10) }} />
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: '800' }}>{value.detail[0].nama}</Text>
                            <Text style={{ color: 'grey', marginVertical: hp(1) }}>{value.detail[0].qty} x Rp. {value.detail[0].harga}</Text>
                            {
                                value.detail.length > 1 ?
                                    <Text style={{ color: "grey" }}>+{value.detail.length - 1} Produk Lainnya</Text> : null
                            }
                        </View>
                        <View>
                            <Text style={{ color: "grey" }}>Total</Text>
                            <Text style={{ fontSize: 20, fontWeight: '800', marginTop: hp(2) }}>Rp. {value.totalPayment}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row-reverse" }}>
                        <Button
                            title="Lihat Detail"
                            type='outline'
                            buttonStyle={{ padding: 3 }}
                            titleStyle={{ fontSize: 12 }}
                            containerStyle={{ margin: 5 }}
                            onPress={() => props.navigation.navigate("Detail Transaction", { detail: value })}
                        />
                        <Button
                            title="Batalkan Pesanan"
                            disabled={badgeColor == "warning" ? false : true}
                            buttonStyle={{ padding: 3, backgroundColor: "red" }}
                            titleStyle={{ fontSize: 12 }}
                            containerStyle={{ margin: 5 }}
                        />
                    </View>
                </View>


            )
        })
    }

    return (
        <View style={{ paddingHorizontal: wp(2), paddingVertical: hp(4), backgroundColor: "white", flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                {status.map((value, index) => {
                    return <View style={{ marginHorizontal: wp(2), flex: 1 }}>
                        <Text onPress={() => getTransaksiFilter(value, index)}
                            style={{
                                textAlign: 'center',
                                color: 'blue',
                                borderBottomWidth: statusIdx == index ? 1 : null,
                                borderColor: statusIdx == index ? "#0984e3" : 'black',
                                fontSize: 12,
                                paddingBottom: hp(1)
                            }}
                        >{value}
                        </Text>
                    </View>
                })}
            </View>
            <View style={{ height: hp(85) }}>
                <ScrollView>
                    {printTransaksi()}
                </ScrollView>
            </View>

        </View>
    )
}

export default HistoryPage;