import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppStackParamList } from './types'
import HobbySelectScreen from '@/screens/hobby-select-screen'
import Tabs from './tabs'
import CreateScreen from '@/screens/create-place-screen'
import CreatedPlacesScreen from '@/screens/created-places-screen'
import ChangePasswordScreen from '@/screens/change-password-screen'
import ApprovePlacesScreen from '@/screens/ad-approve-places-screen'
import DetailPlaceScreen from '@/screens/detail-place-screen'
import ReviewUserScreen from '@/screens/ad-review-user'
import ViewUsersScreen from '@/screens/ad-view-users-screen'
import DetailRequestPlaceScreen from '@/screens/detail-request-place-screen'
import useUserGlobalStore from '@/store/useUserGlobalStore'
import EditPlaceScreen from '@/screens/edit-place-screen'

const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStackNavigator = () => {
  const {user} = useUserGlobalStore();
  // console.info('AppStackNavigator:', user);
  
  return (
    <Stack.Navigator>
      {user?.isFirstTime ? <Stack.Screen name='HobbySelect' component={HobbySelectScreen} options={{headerShown: false}} /> : <></>}
      <Stack.Screen name='Root' component={Tabs} options={{headerShown: false}}/>
      <Stack.Screen name='DetailPlace' component={DetailPlaceScreen} options={{headerShown: false}}/>
      <Stack.Screen name='DetailRequestPlace' component={DetailRequestPlaceScreen} options={{headerShown: false}}/>
      <Stack.Screen name='CreatePlace' component={CreateScreen} options={{headerShown: false}}/>
      <Stack.Screen name='EditPlace' component={EditPlaceScreen} options={{headerShown: false}}/>
      <Stack.Screen name='CreatedPlaces' component={CreatedPlacesScreen} options={{headerShown: false}}/>
      <Stack.Screen name='ChangePassword' component={ChangePasswordScreen} options={{headerShown: false}}/>
      <Stack.Screen name='ApprovePlaces' component={ApprovePlacesScreen} options={{headerShown: false}}/>
      <Stack.Screen name='ViewUsers' component={ViewUsersScreen} options={{headerShown: false}}/>
      <Stack.Screen name='ReviewUser' component={ReviewUserScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default AppStackNavigator