import AsyncStorage from '@react-native-community/async-storage';

const setToken = async (token) => {
  try {
    await AsyncStorage.setItem('userToken', token);
  } catch (error) {
    //console.log('error');
  }
};

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (token !== null) {
      return token;
    }
  } catch (error) {
    //console.log('error');
  }
};

const clearToken = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
  } catch (e) {
    //console.log(e);
  }
};

const setUser = async (user) => {
  try {
    await AsyncStorage.setItem('user', user);
  } catch (error) {
    //console.log('error');
  }
};

const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    if (user !== null) {
      return user;
    }
  } catch (error) {
    //console.log('error');
  }
};

const clearUser = async () => {
  try {
    await AsyncStorage.removeItem('user');
  } catch (e) {
    //console.log(e);
  }
};

export {
  setToken,
  getToken,
  clearToken,
  setUser,
  getUser,
  clearUser
};
