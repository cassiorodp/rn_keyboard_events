import {useEffect, useState} from 'react';
import {DeviceEventEmitter} from 'react-native';

type KeyboardEvent = {
  keyCode: number;
  keyName: string;
};

const useKeyboardListener = () => {
  const [keyPressed, setKeyPressed] = useState<KeyboardEvent | null>(null);

  useEffect(() => {
    // Define the event listener for the custom keyboard event
    const subscription = DeviceEventEmitter.addListener(
      'keyboardEvent',
      event => {
        setKeyPressed(event); // Set the key code when a button is pressed
      },
    );

    // Clean up the event listener when the component unmounts
    return () => {
      subscription.remove();
    };
  }, []);

  return keyPressed; // Return the last key pressed
};

export default useKeyboardListener;
