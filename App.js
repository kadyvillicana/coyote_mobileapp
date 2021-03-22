import React, {useEffect} from 'react';
import AppContainer from './navigation/routes';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return(
    <AppContainer />
  )
}

export default App;
