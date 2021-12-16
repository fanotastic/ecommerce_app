import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Profile = (props) => {

    return(
        <View style={{flex: 1, paddingTop: hp(10)}}>
            <Text h3>Profile Page Ecommerce</Text>
        </View>
    )
}

export default Profile