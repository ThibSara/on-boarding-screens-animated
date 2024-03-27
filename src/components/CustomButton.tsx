import React from 'react';
import {StyleSheet,Text,View, TouchableWithoutFeedback,Image, useWindowDimensions} from 'react-native';
import Animated from 'react-native-reanimated';
import {SharedValue,interpolateColor,useAnimatedStyle} from 'react-native-reanimated';
import  {withSpring,withTiming} from 'react-native-reanimated';

type Props ={
    handlerPress :()=> void;
    buttonVal: SharedValue<number>;
};

const CustomButton = ({handlerPress, buttonVal}:Props) => {
    const {height: SCREEN_HEIGHT} = useWindowDimensions();
    const animatedColor = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            buttonVal.value,
            [0, SCREEN_HEIGHT, 2 * SCREEN_HEIGHT],
            ['#fd94b2', '#f8dac2', '#154f40']
        );

        return {
            backgroundColor: backgroundColor,
        };
    });

const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
        width:
        buttonVal.value === 2*SCREEN_HEIGHT
        ? withSpring(260)
        :withSpring(120),
        height:
        buttonVal.value === 2*SCREEN_HEIGHT
        ? withSpring(80)
        :withSpring(120),
    };
});

const arrowAnimationStyle = useAnimatedStyle(() => {
    return {
      width: 50,
      height: 50,
      opacity:
        buttonVal.value === 2 * SCREEN_HEIGHT ? withTiming(0) : withTiming(1),
      transform: [
        {
          translateX:
            buttonVal.value === 2 * SCREEN_HEIGHT
              ? withTiming(100)
              : withTiming(0),
        },
      ],
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        buttonVal.value === 2 * SCREEN_HEIGHT ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            buttonVal.value === 2 * SCREEN_HEIGHT
              ? withTiming(0)
              : withTiming(-100),
        },
      ],
    };
  });




    return (
       <TouchableWithoutFeedback onPress ={handlerPress}>
        <Animated.View style = {[styles.container, animatedColor, buttonAnimatedStyle]}>
            <Animated.Text style={[styles.textButton,textAnimationStyle]}>Get Started</Animated.Text>
            <Animated.Image style ={arrowAnimationStyle} source ={require('../assets/images/ArrowIcon.png')}/>
        </Animated.View>
        </TouchableWithoutFeedback>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
container:
{
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 60,
    zIndex:1,
},
textButton:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
},
});