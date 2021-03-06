import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import TabNavigation from './TabNavigation';
import DetailProduct from './Detail';
import { useDispatch } from 'react-redux';
import { onKeepLogin } from '../actions';
import HistoryPage from '../pages/History';
import DetailTransactions from '../pages/DetailTransactions'
import Account from '../pages/Account';

const Stack = createNativeStackNavigator() // karna terlalu panjang maka ditampung di variabel
const StackNavigation = (props) => {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(onKeepLogin())
    }, [])

    return (
        // diambil dari variable Stack yaitu createNativeStackNavigator
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
            <Stack.Screen name="TabNav" component={TabNavigation} options={{ headerShown: false }}/>
            <Stack.Screen name="Register" component={RegisterPage} options={{ headerShown: false }} />
            <Stack.Screen name="Detail" component={DetailProduct} options={{ headerShown: false }}/>
            <Stack.Screen name="History" component={HistoryPage}/>
            <Stack.Screen name="Detail Transactions" component={DetailTransactions}/>
            <Stack.Screen name="Account Detail" component={Account}/>
        </Stack.Navigator>
    )
}

export default StackNavigation