import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootBottomTabParamList } from "./types";
import HomeScreen from "@/screens/home-screen";
import PlacesScreen from '@/screens/places-screen'
import LovedScreen from '@/screens/loved-screen'
import PersonalScreen from '@/screens/personal-screen'
import Icons from "@/components/shared/icon";
import theme from "@/utils/theme";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Children } from "react";
import CreateScreen from "@/screens/create-screen";

const Tab = createBottomTabNavigator<RootBottomTabParamList>()

const CustomTabBarButton = ({ children, onPress }: CustomTabBarButtonProps) => {

    return (
        <TouchableOpacity
            style={{
                top: -30,
                justifyContent: 'center',
                alignItems: 'center',
                ...styles.shadow
            }}
            onPress={onPress}
        >
            <View style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor: '#e32f45',
            }}>
                {children}
            </View>
        </TouchableOpacity>
    )
}

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "blue",
                tabBarInactiveTintColor: "grey",
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    backgroundColor: theme.colors.black,
                    height: 75,
                    borderRadius: 15,
                    ...styles.shadow
                }
            }}

        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={() => ({
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <Icons name="home" color={focused ? '#e32f45' : '#748c94'} />
                            <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>Home</Text>
                        </View>
                    )
                })}
            />
            <Tab.Screen
                name="Places"
                component={PlacesScreen}
                options={() => ({
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <Icons name="places" color={focused ? '#e32f45' : '#748c94'} />
                            <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>Places</Text>
                        </View>
                    )
                })}
            />
            <Tab.Screen
                name="Create"
                component={CreateScreen}
                options={() => ({
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Icons name="add" color={theme.colors.white} />
                    ),
                    tabBarButton: (props) => (
                        <CustomTabBarButton {...props} />
                    )
                })}
            />
            <Tab.Screen
                name="Loved"
                component={LovedScreen}
                options={() => ({
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <Icons name="loved" color={focused ? '#e32f45' : '#748c94'} />
                            <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>Loved</Text>
                        </View>
                    )
                })}
            />
            <Tab.Screen
                name="Personal"
                component={PersonalScreen}
                options={() => ({
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <Icons name="personal" color={focused ? '#e32f45' : '#748c94'} />
                            <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>Personal</Text>
                        </View>
                    )
                })}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    }
})

export default Tabs