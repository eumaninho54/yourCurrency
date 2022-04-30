import { StyleSheet } from "react-native";

export const cardSettings = StyleSheet.create({
  content: {
    flexDirection: 'column',
    marginBottom: 30
  },

  title: {
    fontSize: 16
  },

  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  description: {
    color: 'gray',
    width: 300,
  }
});


