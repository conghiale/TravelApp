import { CompositeNavigationProp, NavigatorScreenParams } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

export type AuthStackParamList = {
    Welcome: undefined
    SignIn: undefined
    SignUp: undefined
    ForgotPassword: undefined
}

export type RootBottomTabParamList = {
    Home: NavigatorScreenParams<HomeStackParamList>
    Places: undefined
    Create: undefined
    Loved: undefined
    Personal: NavigatorScreenParams<CategoriesStackParamList>
}

export type HomeStackParamList = {
    Home: undefined
    // Places: undefined
    // Loved: undefined
    // Personal: undefined
}

export type CategoriesStackParamList = {
    Categories: undefined
    Category: {
        id: string
    }
    CreateCategory: {
        id?: string
    }
}

export type AppStackParamList = {
    General: undefined
    Root: NavigatorScreenParams<RootBottomTabParamList> | undefined
    HobbySelect: undefined
    CreatePlace: undefined
    CreatedPlaces: undefined
    DetailPlace: undefined
    ChangePassword: undefined
    ViewUsers: undefined
    ReviewUser: undefined
    ApprovePlaces: undefined
}

export type RootStackParamList = {
    AppStack: NavigatorScreenParams<AppStackParamList>
    AuthStack: NavigatorScreenParams<AuthStackParamList>
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}

export type AuthScreenNavigationType<
RouteName extends keyof AuthStackParamList
> = CompositeNavigationProp<
NativeStackNavigationProp<AuthStackParamList, RouteName>,
NativeStackNavigationProp<AppStackParamList, "Root">
>

export type AppScreenNavigationType<
RouteName extends keyof AppStackParamList
> = CompositeNavigationProp<
NativeStackNavigationProp<AppStackParamList, RouteName>,
NativeStackNavigationProp<AppStackParamList, "Root">
>