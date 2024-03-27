import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,useWindowDimensions } from 'react-native';
import data from './src/data/data';
import RenderItem from './src/components/RenderItem';
import React, { useState } from 'react';
import CustomButton from './src/components/CustomButton';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import Pagination from './src/components/Pagination';

export default function App() {
  const {height: SCREEN_HEIGHT} = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const buttonVal = useSharedValue(0);
  const handlerPress =() =>{
    if (currentIndex === data.length -1){
      return;
    }
    setCurrentIndex(currentIndex + 1);
    buttonVal.value = withTiming(buttonVal.value + SCREEN_HEIGHT);
  }

  return (
    <View style={styles.container}>
      <View>
        {data.map((item,index) => {
          return (
          currentIndex === index && <RenderItem key={item.id} item={item} />)
        })}
      </View>
      <CustomButton handlerPress={handlerPress} buttonVal={buttonVal}/>
      <Pagination data ={data} buttonVal={buttonVal}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
