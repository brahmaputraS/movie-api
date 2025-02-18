import React from 'react';
import Snackbar from 'react-native-snackbar';

interface CustomToastProps {
  message: string;
  duration?: number;
  backgroundColor?: string;
}

const CustomToast: React.FC<CustomToastProps> = ({ message, duration = Snackbar.LENGTH_SHORT, backgroundColor = '#4CAF50' }) => {
  React.useEffect(() => {
    if (message) {
      Snackbar.show({
        text: message,
        duration,
        backgroundColor,
      });
    }
  }, [message, duration, backgroundColor]);

  return null;
};

export default CustomToast;
