import { ToastAndroid } from 'react-native';

const Toast = (message) => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.TOP,
    25,
    50
  );
};

export default Toast;
