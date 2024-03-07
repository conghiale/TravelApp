import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootBottomTabParamList } from "./types";
import HomeScreen from "@/screens/home-screen";
import OutstandingPlacesScreen from "@/screens/outstanding-places-screen";
import LovedScreen from '@/screens/loved-screen'
import PersonalScreen from '@/screens/personal-screen'
import Icons from "@/components/shared/icon";
import theme from "@/utils/theme";
import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CreatePlaceScreen from "@/screens/create-place-screen";
import { useEffect, useState } from "react";
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

const Tab = createBottomTabNavigator<RootBottomTabParamList>()

const CustomTabBarButton = ({ children, onPress }: CustomTabBarButtonProps) => {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
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
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            },
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            },
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "blue",
                tabBarInactiveTintColor: "grey",
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: isKeyboardVisible ? -1000 : 25,
                    left: 20,
                    right: 20,
                    backgroundColor: theme.colors.black,
                    height: 80,
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
                component={OutstandingPlacesScreen}
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
                component={CreatePlaceScreen}
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