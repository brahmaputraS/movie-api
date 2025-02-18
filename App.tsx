import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { store } from './src/redux/movieSlice';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppState } from 'react-native';

import MovieListScreen from './src/screens/MovieListScreen';
import ShortlistedScreen from './src/screens/ShortlistedScreen';


const Tab = createBottomTabNavigator();

export default function App() {
  const [appState, setAppState] = useState(AppState.currentState);
  const queryClient = new QueryClient();

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {appState === 'active' && (
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                  let iconName;
                  if (route.name === 'Movies') {
                    iconName = 'film-outline';
                  } else if (route.name === 'Shortlisted') {
                    iconName = 'heart-outline';
                  }
                  return <Icon name={iconName} size={size} color={color} />;
                },
              })}
            >
              <Tab.Screen name="Movies" component={MovieListScreen} />
              <Tab.Screen name="Shortlisted" component={ShortlistedScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        )}
      </QueryClientProvider>
    </Provider>
//     <Provider store={storeCount}>
// <Count/>
//     </Provider>


  );
}
