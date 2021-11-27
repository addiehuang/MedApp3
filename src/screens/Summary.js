import React from "react";
import { View, StyleSheet, StatusBar, Text, SafeAreaView, Alert,ScrollView ,Image} from "react-native";
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import Router from '../data/router';
import Background from '../components/Background'
import { Card } from 'react-native-elements';
import { getStatusBarHeight } from 'react-native-status-bar-height'
import BlueButton from '../components/BlueButton'
import ProgressCircle from 'react-native-progress-circle'

const Summary = ({route,navigation}) =>{
    const {token,topic,totalpoint,wholepoint,title} = route.params;
    let titleBlock;
    if(title === 'gold'){
      titleBlock = <Image source={require('../assets/gold-medal.png')} style={styles.icon}/>
    }else if(title === 'silver'){
      titleBlock = <Image source={require('../assets/silver-medal.png')} style={styles.icon}/>
    }else if(title === 'bronze'){
      titleBlock = <Image source={require('../assets/bronze-medal.png')} style={styles.icon}/>
    }else{
      console.log('No rewards!')
    }

    const unknownHandler=() =>{
        navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],})
    };

    const returnHandler = () =>{
        let url = Router.host+Router.getinfo
        let body = {
        "token":token
        }
        fetch(url, {
            method: "POST",
            body: JSON.stringify(body)
          })
          .then(response => response.json())
          .then(json => {
            if(json.Result){
              let content = json.Content;
              let token = content.token;
              let isvillager = content.isvillager;
              let name = content.name;
              let points =content.points;
              navigation.navigate('Dashboard', {
                token: token,
                isvillager: isvillager,
                username: name,
                points:points
                  });
            }else{
              Alert.alert(json.Object,json.Content,
                  [{text:'未知錯誤',style:'cancel',onPress:unknownHandler}]
                  );
            };
        });
    }
  const linkHandler = () =>{
    let url = Router.host+Router.getlink
    let body = {
      "token":token,
      "topic_name":topic
    }
    fetch(url, {
        method: "POST",
        body: JSON.stringify(body)
      })
      .then(response => response.json())
      .then(json => {
        if(json.Result){
          let content = json.Content;
          let link = content.Link;
          console.log(link);
          navigation.navigate('Link', {
            link: link,
              });
        }else{
          Alert.alert(json.Object,json.Content,
              [{text:'未知錯誤',style:'cancel',onPress:unknownHandler}]
              );
        };
    });
  }
  
  return(
    <Background>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safearea}>
        <ScrollView style={styles.container}>
          <Card containerStyle={styles.card}>
            <View style={styles.safearea}>

              <Text style={styles.title}>{"公布結果"}</Text>
              <Text style={styles.text}>{"主題："+topic}</Text>
              <ProgressCircle
                percent={(totalpoint/wholepoint)*100}
                radius={96}
                borderWidth={16}
                color="#FFA300"
                shadowColor="#E0E0E0"
                bgColor="#fff"
              >
                <Text style={{ fontSize:40,fontWeight: "bold" }}>{totalpoint+"/"+wholepoint}</Text>
            </ProgressCircle>
            
            </View>
          </Card>
              <Button 
                  mode="contained" 
                  onPress = {returnHandler}
                  >
                  返回主頁
              </Button>
              <BlueButton 
                  mode="contained" 
                  onPress = {linkHandler}
                  >
                  了解更多
              </BlueButton>
        </ScrollView>
      </SafeAreaView>

    </Background>
  )
};

const styles = StyleSheet.create({
  container: {
    width: 366,
    marginTop: 8 + getStatusBarHeight(),
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
  title:{
      color: "#000",
      fontSize: 20,
      textAlign: "center",
      marginBottom: 8,
      fontWeight: "bold",
      //marginBottom:10
  },
  text: {
    color: "#000",
    fontSize: 18,
    textAlign: 'center',
    fontWeight: "400",
    marginBottom:30
  },
});
export default Summary;