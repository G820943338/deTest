import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './redux/reducers';
import * as firebase from 'firebase';
import AppNavigator from './navigation/AppNavigator';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  componentWillMount () {

      var config = {
        apiKey: "AIzaSyDGsQ1mabyFYuiYvQGnV8ekQBNlS9I8LB0",
        authDomain: "gtest-c71a2.firebaseapp.com",
        databaseURL: "https://gtest-c71a2.firebaseio.com",
        projectId: "gtest-c71a2",
        storageBucket: "gtest-c71a2.appspot.com",
        messagingSenderId: "873425740484",
        appId: "1:873425740484:web:0f4b055703ce818f"
      };
      firebase.initializeApp(config);
      console.disableYellowBox = true;

  }


  render() {

      const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store} style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
