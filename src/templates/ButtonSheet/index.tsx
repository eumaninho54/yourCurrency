import React from "react";
import { View } from "react-native";
import { StyleAdd } from "./styles";

interface ButtonSheetModel {
  children: React.ReactNode
  showSlidingAdd: any
}

export default function ButtonSheet({ children, showSlidingAdd }: ButtonSheetModel) {

  return (
    <View style={StyleAdd.container}>
      <View onTouchStart={() => showSlidingAdd.hide()} style={{width: '100%', height: 40}}>
        <View style={StyleAdd.line} />
      </View>
      {children}
    </View>
  );
}
