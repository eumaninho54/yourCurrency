import { StyleSheet } from "react-native";
import React from "react";
import styled from "styled-components/native";

const orange = "#FEBF01";

export const StyleHome = styled.View`
  flex: 1;
`;

export const RenderItem = StyleSheet.create({
  bg: {
    flexDirection: "row",
    margin: 15,
    justifyContent: "space-between",
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
    shadowOpacity: 1.25,
    shadowRadius: 3,
    borderRadius: 23
  },

  nameCurrency: {
    marginLeft: 15,
  },

  valueCurrency: {
    backgroundColor: "#FEBF01",
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
    height: 30,
    borderRadius: 7,
  },
});
