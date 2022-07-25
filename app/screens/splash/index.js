import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { commonStyles } from '../../themes/commonStyles';
import { AppImages } from '../../assets/images/index';
import { resetRoute } from '../../utils/navigationUtils';
import * as screens from '../../constants/screens';
import { getToken } from '../../utils/storageUtils';
import Image from "react-native-fast-image";

function Splash(props) {
  useEffect(async () => {
    const { navigation } = props;
    const token = await getToken();
    if (token) {
      resetRoute(navigation, screens.TAB_CONTAINER);
    } else {
      resetRoute(navigation, screens.LOGIN);
    }
  }, []);

  return (
    <View style={commonStyles.centerContainer(true)}>
      <Image style={styles.splash} source={AppImages.splash} />
    </View>
  );
}
export default Splash;

const styles = StyleSheet.create({
  splash: {
    width: '100%',
    height: '100%',
  },
});
