import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootBottomTabParamList } from "./types";
import HomeScreen from "@/screens/home-screen";
import PlacesScreen from '@/screens/outstanding-places-screen'
import LovedScreen from '@/screens/loved-screen'
import PersonalScreen from '@/screens/personal-screen'
import Icons from "@/components/shared/icon";

const Tab = createBottomTabNavigator<RootBottomTabParamList>()

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "blue",
                tabBarInactiveTintColor: "grey",
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    paddingBottom: 12,
                    paddingTop: 8,
                    height: 60,
                    backgroundColor: 'black'
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={() => ({
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({color}) => <Icons name="home" color={color} />
                })}
            />
            <Tab.Screen
                name="Places"
                component={PlacesScreen}
                options={() => ({
                    title: "Places",
                    headerShown: false,
                    tabBarIcon: ({color}) => <Icons name="places" color={color} />
                })}
            />
            <Tab.Screen
                name="Loved"
                component={LovedScreen}
                options={() => ({
                    title: "Loved",
                    headerShown: false,
                    tabBarIcon: ({color}) => <Icons name="loved" color={color} />
                })}
            />
            <Tab.Screen
                name="Personal"
                component={PersonalScreen}
                options={() => ({
                    title: "Personal",
                    headerShown: false,
                    tabBarIcon: ({color}) => <Icons name="personal" color={color} />
                })}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator