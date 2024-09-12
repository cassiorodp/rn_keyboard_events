/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useRef, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import useKeyboardListener from './hooks/useKeyboardListener';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const keyPressed = useKeyboardListener();
  const [count, setCount] = useState(0);
  const [text, onChangeText] = React.useState('Useless Text');
  const onPress = (alt: boolean = false) => {
    alt
      ? setCount(prevCount => prevCount + 10)
      : setCount(prevCount => prevCount + 1);
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {/* <Header /> */}
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="test">
            <Text style={{fontSize: 20}}>
              {keyPressed
                ? `keyName: ${keyPressed.keyName}, code: ${keyPressed.keyCode}`
                : 'Press a key...'}
            </Text>
          </Section>
          {/* <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section> */}
          {/* <LearnMoreLinks /> */}
          <Text style={styles.sectionTitle}>Count: {count}</Text>
        </View>
        <View style={{gap: 10}}>
          <TouchableOpacity
            style={styles.button}
            importantForAccessibility="yes"
            onPress={() => {
              onPress();
            }}>
            <Text>Press Here</Text>
          </TouchableOpacity>
          <TouchableOpacity
            importantForAccessibility="yes"
            onFocus={() => console.log('alt focus')}
            style={styles.AltButton}
            onPress={() => onPress(true)}>
            <Text>Alt Press Here</Text>
          </TouchableOpacity>
          <View>
            <TextInput
              accessible
              focusable
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              onFocus={() => console.log('focused')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  button: {
    alignItems: 'center',
    // backgroundColor: '#e20101',
    padding: 10,
  },
  AltButton: {
    alignItems: 'center',
    // backgroundColor: '#18b918',
    padding: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;
