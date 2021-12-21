import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text, Card, Image, Button } from 'react-native-elements';

const DetailTransactions = (props) => {

    const { iduser, username, invoice, date, note, totalPayment, shipping, tax, detail, status } = props.route.params.detail

    const totalPrice = () => {
        let total = 0
        detail.forEach((value,index)=> {
            total += value.harga
        })
        return total
    }

    const printProduct = () => {
        return detail.map((value, index) => {
            return <Card containerStyle={{ padding: 10, margin: 0, marginBottom: 8 }}>
                <View style={{ flexDirection: "row" }}>
                    <Image source={{ uri: value.image }} style={{ width: 50, height: 50 }} />
                    <View style={{ marginLeft: 8 }}>
                        <Text style={{ fontWeight: "bold" }}>{value.nama}</Text>
                        <Text style={{ fontSize: 12 }}>{value.qty} x {value.harga}</Text>
                    </View>
                </View>
                <Card.Divider />
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    <View>
                        <Text style={{ fontSize: 12 }}>Price Total</Text>
                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>Rp. {value.qty * value.harga}</Text>
                    </View>
                    <Button
                        title="Beli Lagi"
                        titleStyle={{ fontSize: 12, color: "#4FA4F3" }}
                        buttonStyle={{borderColor: "#4FA4F3"}}
                        type="outline"
                    />
                </View>

            </Card>
        })
    }


    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <Card containerStyle={{ padding: 10, margin: 0 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical: 5, borderBottomWidth: 0.7 }}>{status}</Text>
                    <Text style={{ color: "grey" }}>{invoice}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 5 }}>
                        <Text style={{ color: "grey" }}>Tanggal Pembelian</Text>
                        <Text style={{ color: "grey" }}>{date}</Text>
                    </View>
                </Card>
                <Card containerStyle={{ padding: 10, margin: 0, marginTop: 10 }}>
                    <Card.Title style={{ textAlign: 'left' }}>Detail Product</Card.Title>
                    {printProduct()}
                </Card>
                <Card containerStyle={{ padding: 10, margin: 0, marginTop: 10 }}>
                    <Card.Title style={{ textAlign: 'left' }}>Detail Payment</Card.Title>
                    <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
                        <Text>Total Price</Text>
                        <Text>Rp. {totalPrice()}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
                        <Text>Tax</Text>
                        <Text>Rp. {tax}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
                        <Text>Shipping</Text>
                        <Text>Rp. {shipping}</Text>
                    </View>
                    <Card.Divider/>
                    <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
                        <Text style={{fontWeight:"bold"}}>Total Payment</Text>
                        <Text>Rp. {totalPayment}</Text>
                    </View>
                </Card>
            </ScrollView>

        </View>
    )
}

export default DetailTransactions;