import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import StackNavigation from './src/navigations/StackNavigation';
import ReduxThunk from 'redux-thunk';
import rootReducers from './src/reducers'


const globalStore = createStore(rootReducers, {}, applyMiddleware(ReduxThunk))
const App = (props) => {

  return (
    <Provider store = {globalStore}>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </Provider>

  )
}

export default App;