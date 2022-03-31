import { StyleSheet } from "react-native";
import React from "react";
import styled from "styled-components/native";

export const StyleHome = styled.View`
  flex: 1;
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
    shadowOpacity: 0.55,
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
    height: '50%',
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
    shadowOpacity: 0.55,
    shadowRadius: 3,
    borderRadius: 23
  },

  nameCurrency: {
    marginLeft: 15,
  },
})
