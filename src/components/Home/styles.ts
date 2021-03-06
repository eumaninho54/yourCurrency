import { StyleSheet } from "react-native";
import React from "react";
import styled from "styled-components/native";

export const StyleHome = styled.View`
  flex: 1;
  background-color: #f1f1f1;
`;

export const RenderItem = StyleSheet.create({
  bg: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-between"
  },

  content: {
    marginLeft: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  flag: {  
    shadowColor: "#00000060",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3,
    borderRadius: 23
  },

  nameCurrency: {
    marginLeft: 15,
  },

  valueCurrency: {
    backgroundColor: "#d0facc",
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
    height: 30,
    borderRadius: 7,
  },
})

export const ModalConvert = StyleSheet.create({
  bg: {
    width:'90%',
    height: 300,
    backgroundColor:'white',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 20,
  },

  header: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-between"
  },

  contentCurrency:{
    marginLeft: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  flag: {
    shadowColor: "#00000060",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3,
    borderRadius: 23
  },

  nameCurrency: {
    marginLeft: 15,
  },
  
  value: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 20,
  },

  buttonBg: {
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  
  button: {
    backgroundColor: '#19a50d',
    borderRadius: 10,
    width: 130,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
   
    
  }

})

export const SwipeableAction = StyleSheet.create({
  container: {
    backgroundColor: '#fa4646',
    alignItems: "center",
    justifyContent: "center",
    width: '20%'
  }
})
