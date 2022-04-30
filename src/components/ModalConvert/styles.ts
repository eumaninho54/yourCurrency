import { StyleSheet, Text, View } from "react-native";

export const StyleModalConvert = StyleSheet.create({
  bg: {
    width: "90%",
    height: 300,
    backgroundColor: "white",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 20,
  },

  header: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-between",
  },

  contentCurrency: {
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
    borderRadius: 23,
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
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  button: {
    backgroundColor: "#19a50d",
    borderRadius: 10,
    width: 130,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  suggestions: {
    marginTop: 15,
    flexDirection: "row"
  },

  buttonSuggestion: {
    backgroundColor: "white",
    borderRadius: 10,
    width: 80,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    margin: 10
  },
  
  loading: {
    position: 'absolute',
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10
  }
});
