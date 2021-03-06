import { StyleSheet, Text, View } from "react-native";

export const StyleTabNav = StyleSheet.create({
  shadow: {
    shadowColor: "#00000010",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export const StyleAdd = StyleSheet.create({
  img: {
    width: 80,
    height: 85,
  },

  view: {
    shadowColor: "#00000030",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1.25,
    shadowRadius: 20.5,
    elevation: 5,
    borderRadius: 60,
  },
});

export const StyleCoinSelected = StyleSheet.create({
  bg: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },

  value: {
    
  }
});
