import React from "react";
import { View } from "react-native";
import { StyleAdd } from "./styles";

export default function ButtonSheet({children}: {children: React.ReactNode}) {
    
  return (
    <View style={StyleAdd.container}>
      <View style={StyleAdd.line} />
      {children}
    </View>
  );
}
