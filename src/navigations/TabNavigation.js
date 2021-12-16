import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Icon } from 'react-native-elements';
import Cart from '../pages/Cart';
import HomePage from '../pages/Home';
import Profile from '../pages/Profile';


const Tab = createBottomTabNavigator()
const TabNavigation = (props) => {

    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={
                ({ route }) => ({
                    tabBarIcon: ({ color }) => {
                        let iconName = "";
                        if(route.name == "Home"){
                            iconName = "home";
                        }else if (route.name == "Cart"){
                            iconName = "shopping-bag";
                        }else if (route.name == "Profile"){
                            iconName = "user"
                        }
                    return <Icon type="feather" name={iconName} size={18} color={color}/>
                    }
                    // tabBarStyle
                })
            }

            tabBarOptions={{
                showLabel: false
            }}
        >
            <Tab.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
            <Tab.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        </Tab.Navigator>
    )
}

export default TabNavigation;