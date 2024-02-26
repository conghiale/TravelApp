import { CompositeNavigationProp, NavigatorScreenParams } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

export type AuthStackParamList = {
    Welcome: undefined
    SignIn: undefined
    SignUp: undefined
}

export type RootBottomTabParamList = {
    Home: NavigatorScreenParams<HomeStackParamList>
    Places: undefined
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
    Root: NavigatorScreenParams<RootBottomTabParamList>
    Auth: undefined
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