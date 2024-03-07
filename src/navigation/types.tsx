import { CompositeNavigationProp, NavigatorScreenParams } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

export type AuthStackParamList = {
    Welcome: any
    SignIn: any
    SignUp: any
    ForgotPassword: undefined
}

export type RootBottomTabParamList = {
    Home: NavigatorScreenParams<HomeStackParamList>
    Places: any
    Create: any
    Loved: any
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
    General: any
    Root: NavigatorScreenParams<RootBottomTabParamList> | undefined
    HobbySelect: any
    CreatePlace: any
    CreatedPlaces: any
    DetailPlace: any
    DetailRequestPlace: any
    ChangePassword: any
    ViewUsers: any
    ReviewUser: any
    ApprovePlaces: any
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