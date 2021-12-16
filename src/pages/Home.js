import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Header, Icon, SearchBar, Text } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { API_URL } from '../helper';

const HomePage = (props) => {

    const [promo, setPromo] = useState(["Offer's", "What's New?", "Inspirations"])
    const [category, setCategory] = useState(["Office", "Kitchen Set", "Living Room"])
    const [selectedPromo, setSelectedPromo] = useState(0)
    const [selectedKategori, setSelectedKategori] = useState(0)
    const [product, setProduct] = useState([])

    const printPromo = () => {
        return promo.map((value, index) => {
            return <Text style={selectedPromo == index ? desain.activePromo : desain.promo} key={index.toString()}>{value}</Text>
        })
    }
    const printCategory = () => {
        return category.map((value, index) => {
            return <Text style={selectedKategori == index ? desain.activeKategori : desain.kategori} key={index.toString()}>{value}</Text>
        })
    }

    useEffect(() => {
        getProduct()
    }, [])

    const getProduct = async () => {
        try {
            let res = await axios.get(`${API_URL}/products`)
            // console.log(res.data)
            setProduct(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const printProduct = () => {
        // console.log("ini produk", product)
        return product.map((value, index) => {
            return (
            <TouchableWithoutFeedback key={index.toString()} onPress={() => props.navigation.navigate("Detail", { detail: value })}>
                <View style={desain.card}>
                    <Image source={{ uri: value.images[0] }} style={{ width: wp(40), height: hp(20), marginVertical: 20 }}/>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: "#001378" }}>{value.nama}</Text>
                    <Text style={{ fontSize: 13, color: 'grey' }}>{value.brand}, {value.kategori}</Text>
                    <Text h4 style={{ color: "#001378" }}>Rp. {value.harga.toString()}</Text>
                </View>
            </TouchableWithoutFeedback>
                
            )
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar barStyle='dark-content' />
            <Header
                containerStyle={{ backgroundColor: "white" }}
                placement='left'
                centerComponent={
                    <SearchBar
                        placeholder="Search"
                        containerStyle={desain.searchBar}
                        inputContainerStyle={desain.inputSearch}
                    />
                }
                rightComponent={
                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', marginRight: 10 }}>
                        <Icon type="feather" size={16} name="maximize" />
                    </View>
                }
                backgroundColor='white'
            />
            <View style={{ paddingHorizontal: wp(5) }}>
                <View style={desain.barPromo}>
                    {printPromo()}
                </View>
            </View>
            <View style={{ height: hp(80) }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ paddingHorizontal: wp(5) }}>
                        <View style={{ marginVertical: 20 }}>
                            <Text h2 style={{ color: "#001378" }}>Best Offer</Text>
                            <Text style={{ color: "grey", marginTop: 5 }}>Get IKEA products with the best price</Text>
                        </View>
                        <View style={desain.barKategori}>
                            {printCategory()}
                        </View>
                    </View>
                    <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
                        {printProduct()}
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const desain = StyleSheet.create({
    searchBar: {
        width: wp(80),
        backgroundColor: "transparent",
        borderTopWidth: 0,
        borderBottomWidth: 0,
        padding: 0,
        marginLeft: wp(-3)

    },
    inputSearch: {
        backgroundColor: "white",
        height: 40
    },
    barPromo: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // paddingHorizontal: wp(2),
        fontSize: 20
        // marginHorizontal:

    },
    activePromo: {
        color: "#026da7",
        fontWeight: "800",
        borderBottomWidth: 2,
        borderBottomColor: "#cccc00",
        paddingBottom: 5,
        width: wp(25),
        textAlign: "center",
        fontSize: 16
    },
    promo: {
        color: "gray",
        fontWeight: "400",
        paddingBottom: 8,
        fontSize: 16,
        width: wp(25)
    },
    barKategori: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // paddingHorizontal: wp(5),
        marginVertical: 10

    },
    activeKategori: {
        backgroundColor: "#4FA4F3",
        textAlign: "center",
        width: wp(30),
        borderRadius: 20,
        color: "white",
        paddingBottom: 5,
        paddingTop: 3
    },
    kategori: {
        textAlign: "center",
        borderRadius: 20,
        width: wp(30),
        color: "grey",
        fontWeight: "400",
        paddingBottom: 5,
        paddingTop: 3
    },
    card: {
        width: wp(40),
        display: "flex",
        flexDirection: 'column',
        marginHorizontal: wp(5)
    }
})


export default HomePage;