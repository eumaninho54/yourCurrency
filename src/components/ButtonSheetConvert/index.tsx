import React, { useContext, useState } from "react";
import { View, Text } from "react-native";
import { CoinsContext } from "../../context/coinsContext";
import { serviceDataCoins } from "../../services/dataCoinsService";
import ButtonSheet from "../../templates/ButtonSheet";

export default function ButtonSheetConvert() {
  const { state, dispatch } = useContext(CoinsContext);

  const requestPayload = async (code: string) => {
    let stateKeys: string = "";
    if (code != "USD") {
      stateKeys = `USD-${code},`;
    }
    state?.forEach((coin) => {
      if (code != coin.codein && coin.codein != "USD") {
        stateKeys += `USD-${coin.codein},`;
      }
    });
    stateKeys = stateKeys.slice(0, -1);
    console.tron.log!(stateKeys);

    const dataApi = await serviceDataCoins.getComparison(stateKeys, code, 10);
    if (dataApi != undefined) {
      dispatch!({
        type: "reloadCoin",
        payload: dataApi,
      });
    }
  };

  return (
      <ButtonSheet>

      </ButtonSheet>
  );
}
