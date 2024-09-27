import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>Event App</Text>
    </View>
  )
}

const styles=StyleSheet.create({
   footer: {
backgroundColor:'black',

paddingVertical:10
   },
   text:{
    color:'white',
    textAlign:'center'
   }
    
    
      
    })