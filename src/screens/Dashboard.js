import React, { useState } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { StyleSheet, Text, Alert, View, SafeAreaView, ScrollView } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Router from '../data/router';
import { createIconSetFromFontello } from 'react-native-vector-icons'
import LottieView from 'lottie-react-native';
import {ProgressBar} from 'react-native-paper';
import { Card } from 'react-native-elements';


export default function Dashboard({ route, navigation }) {
  const {token,isvillager,username,points} = route.params;
  let mypet;//精靈動畫
  let petname;//精靈名稱
  let progress;//目前進度條
  let level; //還差幾分可以過關
  //let 
  //Level 0 
  if(points==0){
    mypet = 
    <LottieView
    source={require('../animations/egg.json')}
    loop
    autoPlay
    style={{width: 250}}
    />
    petname="尚未孵化的蛋"
    progress=0
    level=1
  //Level 1
  }if(points>=1 && points<80 ){
    mypet = 
    <LottieView
    source={require('../animations/walking-pothos.json')}
    loop
    autoPlay
    style={styles.animation}
    />
    petname="盆栽精靈"
    progress=points/80
    level=80-points
  //Level 2
  }if(points>=80 && points<160 ){
    mypet = 
    <LottieView
    source={require('../animations/walking-avocado.json')}
    loop
    autoPlay
    style={styles.animation}
    />
    petname="酪梨精靈"
    progress=(points-80)/80
    level=80-(points-80)
  //Level 3
  }if(points>=160 && points<240 ){
    mypet = 
    <LottieView
    source={require('../animations/walking-broccoli.json')}
    loop
    autoPlay
    style={styles.animation}
    />
    petname="花椰菜精靈"
    progress=(points-160)/80
    level=80-(points-160)
  //Level 4
  }if(points>=240 && points<320 ){
    mypet = 
    <LottieView
    source={require('../animations/walking-coffee.json')}
    loop
    autoPlay
    style={styles.animation}
    />
    petname="咖啡精靈"
    progress=(points-240)/80
    level=80-(points-240)
  //Level 5
  }if(points>=320 && points<400 ){
    mypet = 
    <LottieView
    source={require('../animations/walking-donut.json')}
    loop
    autoPlay
    style={styles.animation}
    />
    petname="甜甜圈精靈"
    progress=(points-320)/80
    level=80-(points-320)
  //Level 6
  }if(points>=400 && points<480 ){
    mypet = 
    <LottieView
    source={require('../animations/walking-fries.json')}
    loop
    autoPlay
    style={styles.animation}
    />
    petname="薯條精靈"
    progress=(points-400)/80
    level=80-(points-400)
  //Level 7
  }if(points>=480 && points<560 ){
    mypet = 
    <LottieView
    source={require('../animations/walking-mushroom.json')}
    loop
    autoPlay
    style={styles.animation}
    />
    petname="蘑菇精靈兄弟"
    progress=(points-480)/80
    level=80-(points-480)
  //Level 8
  }if(points>=560 && points<640 ){
    mypet = 
    <LottieView
    source={require('../animations/walking-orange.json')}
    loop
    autoPlay
    style={styles.animation}
    />
    petname="椪柑精靈"
    progress=(points-560)/80
    level=80-(points-560)
  //Level 9
  }if(points>=640 && points<7200 ){//滿等
    mypet = 
    <LottieView
    source={require('../animations/walking-taco.json')}
    loop
    autoPlay
    style={styles.animation}
    />
    petname="塔可精靈"
    progress=(points-640)/80
    level=80-(points-640)
  }



  const restartHandler = () =>{
    navigation.reset({
        index: 0,
        routes: [{ name: 'StartScreen' }],})
};
  const quizIndexHandler = () => {
    let url = Router.host+Router.quizIndex
    let body = {
      "token":token,
      "type":"mcq"
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(json => {
      if(json.Result){
        let content = json.Content;
        let topics  = content.Topic;
        navigation.navigate('QuizIndex', {
          token: token,
          topics: topics,
          isvillager: isvillager,
          type:"mcq"
        })
      }else{
        if(json.Content === '權杖失效'){
          Alert.alert(json.Object,json.Content,
            [{text:'重新開始',style:'cancel',onPress:restartHandler}]
            );
        }else{
          Alert.alert(json.Object,json.Content,
            [{text:'再試一次',style:'cancel'}]
            );
        }
      };
    });
  };
  const textquizIndexHandler = () =>{
    let url = Router.host+Router.quizIndex
    let body = {
      "token":token,
      "type":"tq"
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(json => {
      if(json.Result){
        let content = json.Content;
        let topics  = content.Topic;
        navigation.navigate('QuizIndex', {
          token: token,
          topics: topics,
          isvillager: isvillager,
          type:"tq"
        })
      }else{
        if(json.Content === '權杖失效'){
          Alert.alert(json.Object,json.Content,
            [{text:'重新開始',style:'cancel',onPress:restartHandler}]
            );
        }else{
          Alert.alert(json.Object,json.Content,
            [{text:'再試一次',style:'cancel'}]
            );
        }
      };
    });
  };

  const logoutHandler = () =>{
    navigation.reset({
      index: 0,
      routes: [{ name: 'StartScreen' }],})
  };
  let professionalBlock;
  if(!isvillager){
    professionalBlock =
    <Button
    mode="contained"
    onPress={textquizIndexHandler}
    style={styles.button}
    >
    問答題
    </Button>
  }
  
  return (
    <Background>
      <SafeAreaView style={styles.safearea}>
        <ScrollView style={styles.container}>
            <Card containerStyle={styles.card}>
            <View style={styles.safearea}>

            <Text style={styles.name}>Hi, {username}</Text>
            {/* <Text style={styles.intro}>答題獲取分數來收集精靈吧！</Text> */}
            <Text style={styles.intro}>目前答對題數總積分：{points}</Text>
            {mypet}
            <Text style={styles.intro}>{petname}</Text>
            <ProgressBar 
              progress={progress} 
              style={styles.probarStyle} 
              color={'#FFA300'}/> 
            <Text style={styles.bartext}>還差 {level} 分可進化成新的精靈</Text>
            </View>
          </Card>


      <Button
        mode="contained"
        onPress={quizIndexHandler}
        style={styles.button}
      >
        選擇題
      </Button>
      {professionalBlock}
      <Button
        mode="contained"
        onPress={logoutHandler}
        style={styles.button}
      >
        登出
      </Button>
      </ScrollView>
      </SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    //marginTop: 16,
    width: 366,
    marginTop: 8 + getStatusBarHeight()
  },
  safearea: {
    justifyContent: 'center',
    alignItems: 'center',
},
card: {
  padding: 24,
  paddingTop:48,
  borderRadius: 8,
  marginBottom:16
},
  name: {
    fontSize: 24,
    fontWeight:'bold',
    marginHorizontal: 16,
    //top: 48 + getStatusBarHeight(),
  },
  intro: {
    fontSize: 18,
    fontWeight:'bold',
    //position: 'absolute',
    marginTop: 6,
    marginBottom: 0,
  },
  bartext: {
    fontSize: 18,
    fontWeight:'bold',
    //position: 'absolute',
    //marginTop: 4,
    //marginHorizontal: 16,
  },
  score:{
    color:'#144385',
    fontSize: 18,
    fontWeight:'bold',
    //position: 'absolute',
    marginTop: 12,
    marginHorizontal: 16,
    //top: 96 + getStatusBarHeight(),
  },
  probarStyle: {
    width: 250,
    height: 12,
    backgroundColor: "#E0E0E0",
    marginBottom: 16,
    marginTop: 24
  },
  button: {
    marginBottom:8,
  },
  animation:{
    width: 250,
    height: 250,
    marginBottom: 0,
  }
})
