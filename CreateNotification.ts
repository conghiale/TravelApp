import notifee, { AndroidImportance, AndroidStyle, EventType } from '@notifee/react-native';
import { BASE_URL_DESTINATION } from '@/services/config';

const CreateNotification = async (idPlace: string, status: number, displayMode: string, displayMsg: string, image: string) => {
    const key = Date.now().toString()
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH
    });

    // Display a notification
    await notifee.displayNotification({
        id: key,
        title: displayMode, //'Notification Title',
        body: displayMsg, //'Main body content of the notification',
        data: {id: idPlace, status: status},
            android: {
            channelId,
            smallIcon: 'ic_logo', // optional, defaults to 'ic_launcher'.
            actions: [
                {
                    title: 'Close',
                    pressAction: {
                        id: 'close',
                    },
                },
                {
                    title: 'View',
                    pressAction: {
                        id: 'view',
                    },
                }
            ],
            color: "#6495ed",
            timestamp: Date.now() - 800, // 8 minutes ago
            showTimestamp: true,
            style: {
                type: AndroidStyle.BIGPICTURE,
                picture: image !== ''
                    ? { uri: `${BASE_URL_DESTINATION}/${image}` }
                    : require('@/assets/images/vinh-ha-long.jpg')
            }
        },
    });
}

export default CreateNotification
