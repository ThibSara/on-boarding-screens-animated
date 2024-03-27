import { StatusBar } from 'expo-status-bar';
import { PixelRatio, StyleSheet, Text, View,useWindowDimensions } from 'react-native';
import data from './src/data/data';
import RenderItem from './src/components/RenderItem';
import React, { useState } from 'react';
import CustomButton from './src/components/CustomButton';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import Pagination from './src/components/Pagination';
import { useRef } from 'react';
import {SkImage, makeImageFromView, Canvas, Image,Mask,Circle,Group,Rect} from '@shopify/react-native-skia';


export default function App() {
  const pd = PixelRatio.get();
  const {height: SCREEN_HEIGHT, width:SCREEN_WIDTH} = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [active,setActive] = useState(false);
  const ref = useRef(null);
  const [overlay, setOverlay] = useState<SkImage | null>(null);
  const buttonVal = useSharedValue(0);
  const mask = useSharedValue(0);


  const wait = async (ms:number) =>
  new Promise(resolve => setTimeout(resolve, ms));

  const handlerPress = async() =>{
    if (currentIndex === data.length -1 && !active){
      return;
    }
    if(!active){
      setActive(true);
    const snapshot = await makeImageFromView(ref);
    setOverlay(snapshot);
    await wait(80);
    setCurrentIndex(currentIndex + 1);
    mask.value = withTiming(SCREEN_HEIGHT,{duration:1000});
    buttonVal.value = withTiming(buttonVal.value + SCREEN_HEIGHT);
    await wait(1000);
    setOverlay(null);
    mask.value = 0;
    setActive(false);
  }}

  return (
    <View style={styles.container}>
      <View ref={ref} collapsable={false}>
        {data.map((item,index) => {
          return (
          currentIndex === index && <RenderItem key={item.id} item={item} />)
        })}
      </View>
      {overlay && ( 
      <Canvas style ={StyleSheet.absoluteFillObject} pointerEvents = "none">
      <Mask
      mode="luminance"
      mask={
        <Group>
          <Circle cx={128} cy={128} r={SCREEN_HEIGHT} color="white" />
          <Circle cx={SCREEN_WIDTH/2} cy={SCREEN_HEIGHT - 120} r={mask} color="black" />
        </Group>
      }
    >
    <Image image={overlay} x={0} y = {0} width={overlay.width()/pd} height={overlay.height()/pd}/>
    </Mask>
        </Canvas> 
        )}  
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
