import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { UserAuthContextProvider,useUserAuth} from './android/app/src/components/context/userAuthContext';
import Login from './android/app/src/components/Login';
import Profile from './android/app/src/components/Profile';
import Signup from './android/app/src/components/Signup';
import ForgetPassword from './android/app/src/components/ForgetPassword';
import BusinessList from './android/app/src/listComponents/BusinessList';
import Map from './android/app/src/listComponents/Map';
import Reviews from './android/app/src/listComponents/Reviews';
import Offers from './android/app/src/listComponents/Offers';


const Drawer = createDrawerNavigator();

const AppNavigator: React.FC = () => {
  const { isAuthenticated } = useUserAuth();

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Signup" component={Signup} />
        <Drawer.Screen name="ForgetPassword" component={ForgetPassword} />
        {isAuthenticated && (
          <>
            <Drawer.Screen name="BusinessList" component={BusinessList} />
            <Drawer.Screen name="Map" component={Map} />
            <Drawer.Screen name="Reviews" component={Reviews} />
            <Drawer.Screen name="Offers" component={Offers} />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const App: React.FC = () => (
  <UserAuthContextProvider>
    <AppNavigator />
  </UserAuthContextProvider>
);

export default App;