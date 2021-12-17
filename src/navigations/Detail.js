import React, { useState } from 'react';
import { Alert, FlatList, Image, ScrollView, StatusBar, View } from 'react-native';
import { Text, Icon, Button, Overlay, Input } from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserCart } from '../actions';


const DetailProduct = (props) => {


    const dispatch = useDispatch()
    const { cart, idUser } = useSelector((state) => {
        return {
            cart: state.userReducer.cart,
            idUser: state.userReducer.id
        }
    })

    const { nama, kategori, deskripsi, harga, brand, images, stock } = props.route.params.detail

    const [visible, setVisible] = useState(false);
    const [activeType, setActiveType] = useState({});
    const [qty, setQty] = useState("1");

    const printType = () => {
        return stock.map((value, index) => {
            return activeType.type == value.type ?
                <Button
                    title={value.type}
                    type="clear"
                    containerStyle={{
                        marginLeft: 5,
                        backgroundColor: "#00a8ff",
                        borderRadius: 25,
                        paddingHorizontal: 25
                    }}
                    titleStyle={{
                        color: "white"
                    }}
                    onPress={() => setActiveType(value)} />
                :
                <Button
                    title={value.type}
                    type="clear"
                    containerStyle={{
                        marginLeft: 5,
                        borderRadius: 25,
                        paddingHorizontal: 25,
                        borderWidth: 1,
                        borderColor: "gray"
                    }}
                    onPress={() => setActiveType(value)} />


        })
    }

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const onBtAddToCart = async () => {
        if (activeType.type) {
            toggleOverlay()

        } else
            Alert.alert("Attention!", "Choose product type first.")
    }

    const onBtSubmit = async () => {
        /***
            * 1. mengambil data cart sebelumnya
            * 2. menambahkan data cart yang baru kedalam data cart sebelumnya
            * 3. mengirim data cart yang telah diperbarui ke json-server/api
            * 4. alert success add to cart
            */

        let dataCart = {
            image: images,
            nama: nama,
            brand: brand,
            harga: harga,
            type: activeType.type,
            qty: parseInt(qty)
        }

        let temp = [...cart]
        temp.push(dataCart);

        if (parseInt(qty) > 0 && idUser) {
            let res = await dispatch(updateUserCart(temp, idUser));
            if (res.success) {
                Alert.alert("Success", "Check your cart",
                [
                    {
                        text: "Ok",
                        onPress: toggleOverlay
                    }
                ])
                
            }
        } else {
            Alert.alert("Attention!", "min 1 qty")
        }
    }

    // console.log(props.route.params)

    return (
        <View style={{ paddingTop: hp(8), backgroundColor: "white", paddingHorizontal: wp(5) }}>
            <StatusBar backgroundColor={"#f1f2f6"} />
            <ScrollView>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", paddingTop: hp(2) }}>
                    <Icon
                        containerStyle={{ position: 'relative' }}
                        raised
                        name='arrow-left'
                        type='font-awesome'
                        size={16}
                        onPress={() => props.navigation.goBack()}
                    />
                    <Icon
                        containerStyle={{ position: 'relative', color: 'grey' }}
                        raised
                        name='heart'
                        type='font-awesome'
                        color='#ecf0f1'
                        size={16}

                    />
                </View>
                <FlatList
                    data={images}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item }}
                            style={{
                                width: wp(60),
                                height: hp(30),
                                marginHorizontal: wp(20)
                            }} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
                <View style={{ marginTop: 25 }}>
                    <Text style={{ color: "gray" }}>{brand} | {kategori}</Text>
                    <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between" }}>
                        <Text h4 style={{ color: "#1b1464" }} >{nama}</Text>
                        <Text h3 style={{ color: "#1b1464" }}>Rp. {harga}</Text>
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ color: "#1b1464", fontWeight: "800" }}>
                        Choose type: <Text style={{ color: "gray" }}>{stock.length} type</Text>,{activeType.qty ? `${activeType.qty} stock` : " stock"}
                    </Text>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        {printType()}
                    </View>
                    <Text style={{ color: "#1B1464", fontWeight: "800", marginTop: 10 }}>
                        Description
                    </Text>
                    <Text style={{ textAlign: "justify", marginTop: 10 }}>
                        {deskripsi}
                    </Text>
                </View>
            </ScrollView>
            <Button
                title="Add to Cart"
                type="clear"
                containerStyle={{
                    marginTop: 10,
                    marginBottom: 10,
                    borderRadius: 25,
                    backgroundColor: "yellow"
                }}
                titleStyle={{
                    color: "black"
                }}
                onPress={onBtAddToCart}
            />
            <View>
                <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                    <Input
                        placeholder="Input Stock"
                        keyboardType="numeric"
                        containerStyle={{ width: wp(80) }}
                        value={qty.toString()}
                        onChangeText={value => setQty(value)}
                    />
                    <Button title="Submit" type='clear' titleStyle={{ color: '#f1c40f' }} onPress={onBtSubmit} />
                </Overlay>
            </View>


        </View>
    )
}

export default DetailProduct;