import {StyleSheet, Text,View} from 'react-native';
import React from 'react';
import { OnboardingData } from '../data/data';
import { SharedValue } from 'react-native-reanimated';
import Dot from './Dot';

type Props = {
    data : OnboardingData[];
    buttonVal: SharedValue<number>;
};

const Pagination = ({data, buttonVal}:Props) => {
    return(
        <View style = {styles.pagination}>
           {data.map((_,index) => {
                return <Dot index={index} buttonVal={buttonVal} key={index} />;
           })}
        </View>
    );
};

export default Pagination;

const styles=StyleSheet.create({
    pagination:{
        position: 'absolute',
        bottom: 30,
        flexDirection: 'row',
    }
});