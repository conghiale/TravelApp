interface IUser {
    email: string
    name: string
    password: string
}

interface IAuthenticatedUser {
    email: string
    name: string
}
interface PlaceProps {
    id?: number
    destination: string
    content: string
    star: number
}
interface PaginationProps {
    data: PlaceProps[]
    scrollX: any
}

interface ListPlaceProps {
    data: PlaceProps[]
}

interface ListPlaceItemProps {
    placeItem: PlaceProps,
    onDismiss?: (placeItem: PlaceProps) => void
}

interface CustomAlertProps {
    stateColor: string,
    displayMode: string,
    displayMsg: string,
    visible: boolean,
    onDimissAlert: (state: boolean) => void
    onHandlerActionOK?: () => void
    onHandlerActionCANCEL?: () => void
}

interface CustomTabBarButtonProps {
    children: any,
    onPress?: any,
}

type IconProps = {
    width?: number
    height?: number
    color?: string
}

type IconName = "home" | "places" | "loved" | "personal" | "in" | "eye" | "uneye" | "search" | "topPlace" | "star" | "star01" | "star02" | "nearestPlace" | "createDestination" | "list" | "add" | "dropdown" | "newest" | "person" | "setting" | "cancel" | "userList" | "lock" | "unLock" | "back" | "edit" | "sub" | "gmail" | "circleReset"
