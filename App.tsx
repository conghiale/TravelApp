import theme from '@/utils/theme';
import { ThemeProvider } from '@shopify/restyle';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { useEffect, useState } from 'react';
import notifee, { AndroidImportance, AndroidStyle, DisplayedNotification, EventType } from '@notifee/react-native';
import CreateNotification from './CreateNotification';
import { getWaitingDestination } from '@/services/destination-service';
import { getErrorMessage } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { AppScreenNavigationType } from '@/navigation/types';
import Navigation from '@/navigation';

export default function App() {
  // const navigation = useNavigation<AppScreenNavigationType<'General'>>();

  // useEffect(() => {
  //   getWaitingDestination()
  //     .then(async r => {
  //       const destinations: [ApiReturnDestination] = r.data.data
  //       // console.log('APP(18): destination --- ' + destinations)
  //       if (destinations.length > 0) {
  //         const notifications: DisplayedNotification[] = await notifee.getDisplayedNotifications()
  //         console.log('APP(22): destination --- ' + notifications.length)

  //         destinations.forEach(d => {
  //           // console.log('APP(25): ' + notifications.filter((notification) => notification.notification.data?.id === d._id).length)
  //           if (notifications.filter((notification) => notification.notification.data?.id === d._id).length === 0) {
  //             CreateNotification(
  //               d._id,
  //               "APPROVE PLACES",
  //               `Tourist destination ${d.nameEn} just created by user. Awaiting approval.`,
  //               d.images[0]
  //             )
  //           }
  //         });
  //       }
  //     })
  //     .catch(e => {
  //       console.info(getErrorMessage(e));
  //     })

  //   return notifee.onForegroundEvent(async ({ type, detail }) => {
  //     // console.log('APP(34): type ---- ' + JSON.stringify(type))
  //     // console.log('APP(35): detail ---- ' + JSON.stringify(detail))
  //     switch (type) {
  //       case EventType.DISMISSED:
  //         console.log("APP(38): Notification dismissed by user");
  //         break;
  //       case EventType.PRESS:
  //         if (detail.pressAction?.id === 'close') {
  //           notifee.cancelNotification(detail.notification?.id ?? '')
  //           console.log('APP(37): PRESSED ACTION CLOSE')
  //         } else if (detail.pressAction?.id === 'view') {
  //           console.log('APP(39): PRESSED ACTION VIEW')
  //           // navigation.navigate('ApprovePlaces')
  //         } else
  //           console.log("APP(41): Notification clicked by user");
  //         break;
  //     }
  //   })
  // }, [])

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <StatusBar backgroundColor={'#2F3542'} />
        <Navigation />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
