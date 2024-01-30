import { View, Text } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux';



import StackNav from './android/app/src/stack/StackNav';
import store from './android/app/src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
     <StackNav/>
    </Provider>
  
  )
}

export default App