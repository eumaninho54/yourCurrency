import { Dimensions, StyleSheet } from "react-native";

export const RenderCustomItem = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5
  },

  info: {
    marginLeft: 15
  },

  value: {
    color: 'gray'
  },

  name: {
    color: 'black'
  }
});
