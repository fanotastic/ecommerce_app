import React, { useState } from 'react';
import { FlatList, Image, ScrollView, StatusBar, View } from 'react-native';
import { Text, Icon, Button, Overlay, Input } from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


const DetailProduct = (props) => {

    const { nama, kategori, deskripsi, harga, brand, images, stock } = props.route.params.detail

    const [visible, setVisible] = useState(false);
    const [activeType, setActiveType] = useState(null);
    const [qty, setQty] = useState(null);

    const printType = () => {
        return stock.map((value, index) => {
           return activeType == index ?
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
                    onPress={() => btQty(index)} />
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
                    onPress={() => btQty(index)} />

            
        })
    }

    const btQty = (index) => {
        setActiveType(index)
        setQty(stock[index].qty)
    }

    const toggleOverlay = () => {
        setVisible(!visible);
      };

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
                        Choose type: <Text style={{ color: "gray" }}>{stock.length} type,</Text>
                        <Text> {qty} stock</Text>
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
                onPress={toggleOverlay}
            />
            <View>
                <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                    <Input placeholder="Input Stock" keyboardType="numeric" containerStyle={{width: wp(80)}}/>
                    {/* <Button>
                    <Icon name="plus-square" type="feather"/>
                    <Text>Submit</Text>
                    </Button> */}
                    <Button title="Submit" type='clear' titleStyle={{color: '#f1c40f'}}/>
                </Overlay>
            </View>


        </View>
    )
}

export default DetailProduct;