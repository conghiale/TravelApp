import Svg, { Circle, Path } from "react-native-svg"

// type IconProps = {
//     width?: number
//     height?: number
//     color?: string
// }

// type IconName = "home" | "places" | "loved" | "personal" | "in" | "eye" | "uneye" | "search" | "topPlace" | "star" | "star01" | "star02" | "nearestPlace" | "createDestination" | "list" | "add" | "dropdown" | "newest" | "person" | "setting" | "cancel" | "userList" | "lock" | "unLock" | "back" | "edit" | "sub" | "gmail" | "circleReset"

const Home = ({ color = "grey", height = 20, width = 20 }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 21 17" fill="none">
        <Path d="M10.2361 4.64925L3.83335 9.92008V15.6111C3.83335 15.7584 3.89188 15.8997 3.99607 16.0039C4.10026 16.1081 4.24156 16.1666 4.38891 16.1666L8.28127 16.1562C8.42801 16.1553 8.56843 16.0963 8.67186 15.9923C8.7753 15.8882 8.83335 15.7474 8.83335 15.6006V12.2777C8.83335 12.1304 8.89188 11.9891 8.99607 11.8849C9.10026 11.7807 9.24156 11.7222 9.38891 11.7222H11.6111C11.7585 11.7222 11.8998 11.7807 12.004 11.8849C12.1082 11.9891 12.1667 12.1304 12.1667 12.2777V15.5972C12.1662 15.6704 12.1803 15.743 12.208 15.8108C12.2357 15.8786 12.2765 15.9403 12.3282 15.9922C12.3798 16.0442 12.4412 16.0854 12.5088 16.1136C12.5765 16.1417 12.649 16.1562 12.7222 16.1562L16.6111 16.1666C16.7585 16.1666 16.8998 16.1081 17.004 16.0039C17.1082 15.8997 17.1667 15.7584 17.1667 15.6111V9.91661L10.7674 4.64925C10.6921 4.58866 10.5984 4.55562 10.5018 4.55562C10.4051 4.55562 10.3114 4.58866 10.2361 4.64925ZM20.3472 8.23258L17.4445 5.84022V1.03119C17.4445 0.920686 17.4006 0.814706 17.3224 0.736566C17.2443 0.658425 17.1383 0.614527 17.0278 0.614527H15.0834C14.9728 0.614527 14.8669 0.658425 14.7887 0.736566C14.7106 0.814706 14.6667 0.920686 14.6667 1.03119V3.55203L11.559 0.992999C11.2607 0.747506 10.8864 0.613281 10.5 0.613281C10.1137 0.613281 9.73932 0.747506 9.44099 0.992999L0.649323 8.23258C0.607131 8.26746 0.572224 8.3103 0.546596 8.35867C0.520968 8.40704 0.505122 8.45998 0.499963 8.51447C0.494804 8.56897 0.500432 8.62395 0.516528 8.67626C0.532623 8.72858 0.558869 8.77722 0.593767 8.81939L1.47918 9.89578C1.51409 9.93847 1.55713 9.97382 1.6058 9.99975C1.65447 10.0257 1.70781 10.0417 1.76272 10.0469C1.81762 10.052 1.87301 10.0463 1.92567 10.0299C1.97832 10.0135 2.0272 9.98677 2.06946 9.95133L10.2361 3.22564C10.3114 3.16505 10.4051 3.13201 10.5018 3.13201C10.5984 3.13201 10.6921 3.16505 10.7674 3.22564L18.934 9.95133C18.9762 9.98623 19.0249 10.0125 19.0772 10.0286C19.1295 10.0447 19.1845 10.0503 19.239 10.0451C19.2935 10.04 19.3464 10.0241 19.3948 9.9985C19.4431 9.97288 19.486 9.93797 19.5209 9.89578L20.4063 8.81939C20.441 8.777 20.467 8.72819 20.4828 8.67574C20.4986 8.6233 20.5039 8.56825 20.4984 8.51374C20.493 8.45924 20.4768 8.40635 20.4508 8.35811C20.4249 8.30986 20.3897 8.26721 20.3472 8.23258Z"
            fill={color} />
    </Svg>
)

const Places = ({ color = "grey", height = 20, width = 20 }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 14 19" fill="none">
        <Path d="M5.98264 17.9184C0.9375 10.6032 0 9.85325 0 7.16602C0 3.48582 2.98611 0.5 6.66667 0.5C10.3472 0.5 13.3333 3.48582 13.3333 7.16602C13.3333 9.85325 12.3958 10.6032 7.35069 17.9184C7.02083 18.3976 6.3125 18.3976 5.97917 17.9184H5.98264ZM6.66667 9.94352C8.20139 9.94352 9.44444 8.70059 9.44444 7.16602C9.44444 5.63144 8.20139 4.38851 6.66667 4.38851C5.13194 4.38851 3.88889 5.63144 3.88889 7.16602C3.88889 8.70059 5.13194 9.94352 6.66667 9.94352Z"
            fill={color} />
    </Svg>
)

const Loved = ({ color = "grey", height = 20, width = 20 }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 19 17" fill="none">
        <Path d="M16.7527 1.70073C14.8262 0.0589308 11.9609 0.354243 10.1926 2.17885L9.5 2.89252L8.80743 2.17885C7.04258 0.354243 4.17383 0.0589308 2.24727 1.70073C0.0394572 3.5851 -0.0765585 6.96713 1.89922 9.00971L8.70196 16.0339C9.14141 16.4874 9.85508 16.4874 10.2945 16.0339L17.0973 9.00971C19.0766 6.96713 18.9606 3.5851 16.7527 1.70073Z"
            fill={color} />
    </Svg>
)

const Personal = ({ color = "grey", height = 20, width = 20 }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 17 19" fill="none">
        <Path d="M8.5 9.64286C11.025 9.64286 13.0714 7.59643 13.0714 5.07143C13.0714 2.54643 11.025 0.5 8.5 0.5C5.975 0.5 3.92857 2.54643 3.92857 5.07143C3.92857 7.59643 5.975 9.64286 8.5 9.64286ZM11.7 10.7857H11.1036C10.3107 11.15 9.42857 11.3571 8.5 11.3571C7.57143 11.3571 6.69286 11.15 5.89643 10.7857H5.3C2.65 10.7857 0.5 12.9357 0.5 15.5857V17.0714C0.5 18.0179 1.26786 18.7857 2.21429 18.7857H14.7857C15.7321 18.7857 16.5 18.0179 16.5 17.0714V15.5857C16.5 12.9357 14.35 10.7857 11.7 10.7857Z"
            fill={color} />
    </Svg>
)

const In = ({ color = "grey", height = 20, width = 20 }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 18 20" fill="none">
        <Path d="M2 13H4V18H16V2H4V7H2V1C2 0.44772 2.44772 0 3 0H17C17.5523 0 18 0.44772 18 1V19C18 19.5523 17.5523 20 17 20H3C2.44772 20 2 19.5523 2 19V13ZM8 9V6L13 10L8 14V11H0V9H8Z"
            fill={color} />
    </Svg>
)

const Eye = ({ color = "grey", height = 20, width = 20 }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 22 18" fill="none">
        <Path d="M10.8187 0C16.2108 0 20.6968 3.87976 21.6373 9C20.6968 14.1202 16.2108 18 10.8187 18C5.42648 18 0.94051 14.1202 0 9C0.94051 3.87976 5.42648 0 10.8187 0ZM10.8187 16C15.0543 16 18.6787 13.052 19.5961 9C18.6787 4.94803 15.0543 2 10.8187 2C6.58296 2 2.95858 4.94803 2.04114 9C2.95858 13.052 6.58296 16 10.8187 16ZM10.8187 13.5C8.33334 13.5 6.31862 11.4853 6.31862 9C6.31862 6.51472 8.33334 4.5 10.8187 4.5C13.3039 4.5 15.3187 6.51472 15.3187 9C15.3187 11.4853 13.3039 13.5 10.8187 13.5ZM10.8187 11.5C12.1994 11.5 13.3187 10.3807 13.3187 9C13.3187 7.6193 12.1994 6.5 10.8187 6.5C9.43796 6.5 8.31862 7.6193 8.31862 9C8.31862 10.3807 9.43796 11.5 10.8187 11.5Z" fill="black" />
    </Svg>
)

const Uneye = ({ color = "grey", height = 20, width = 20 }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 22 22" fill="none">
        <Path d="M16.7011 17.9032C14.9998 18.9819 12.9822 19.6066 10.8187 19.6066C5.42648 19.6066 0.94051 15.7269 0 10.6067C0.43668 8.22927 1.63768 6.11935 3.33883 4.54102L0.21202 1.41422L1.62624 0L21.4253 19.7989L20.0111 21.2132L16.7011 17.9032ZM4.75396 5.95615C3.42509 7.1666 2.45616 8.77365 2.04114 10.6067C2.95858 14.6586 6.58296 17.6066 10.8187 17.6066C12.4181 17.6066 13.9304 17.1862 15.2427 16.4448L13.2144 14.4165C12.5207 14.8537 11.6992 15.1067 10.8187 15.1067C8.33334 15.1067 6.31862 13.0919 6.31862 10.6067C6.31862 9.72605 6.57153 8.90455 7.00867 8.21087L4.75396 5.95615ZM11.7323 12.9345L8.49082 9.69305C8.37966 9.97605 8.31862 10.2842 8.31862 10.6067C8.31862 11.9874 9.43796 13.1067 10.8187 13.1067C11.1411 13.1067 11.4493 13.0456 11.7323 12.9345ZM19.6252 15.199L18.1944 13.7682C18.8503 12.8333 19.3338 11.7651 19.5961 10.6067C18.6787 6.55463 15.0543 3.60661 10.8187 3.60661C9.97276 3.60661 9.15126 3.72418 8.37085 3.94463L6.79282 2.3666C8.03963 1.87604 9.39766 1.60661 10.8187 1.60661C16.2108 1.60661 20.6968 5.48637 21.6373 10.6067C21.3251 12.3063 20.6222 13.8693 19.6252 15.199ZM10.5413 6.11502C10.633 6.10944 10.7255 6.10661 10.8187 6.10661C13.3039 6.10661 15.3187 8.12133 15.3187 10.6067C15.3187 10.6997 15.3158 10.7923 15.3103 10.884L10.5413 6.11502Z" fill="black" />
    </Svg>
)

const Search = ({ color = "grey", height = 15, width = 16 }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 16 15" fill="none">
        <Path d="M15.7812 12.8928L12.6656 10.1032C12.525 9.97728 12.3344 9.90733 12.1344 9.90733H11.625C12.4875 8.91964 13 7.67732 13 6.32589C13 3.11098 10.0906 0.506042 6.5 0.506042C2.90937 0.506042 0 3.11098 0 6.32589C0 9.54079 2.90937 12.1457 6.5 12.1457C8.00937 12.1457 9.39688 11.6869 10.5 10.9146V11.3707C10.5 11.5498 10.5781 11.7204 10.7188 11.8463L13.8344 14.636C14.1281 14.899 14.6031 14.899 14.8938 14.636L15.7781 13.8441C16.0719 13.5811 16.0719 13.1558 15.7812 12.8928ZM6.5 9.90733C4.29063 9.90733 2.5 8.30687 2.5 6.32589C2.5 4.3477 4.2875 2.74444 6.5 2.74444C8.70938 2.74444 10.5 4.3449 10.5 6.32589C10.5 8.30408 8.7125 9.90733 6.5 9.90733Z"
            fill={color} />
    </Svg>
)

const TopPlace = ({ color = "grey", height = 24, width = 24 }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" >
        <Path d="M4 2H20C20.5523 2 21 2.44772 21 3V22.2763C21 22.5525 20.7761 22.7764 20.5 22.7764C20.4298 22.7764 20.3604 22.7615 20.2963 22.7329L12 19.0313L3.70373 22.7329C3.45155 22.8455 3.15591 22.7322 3.04339 22.4801C3.01478 22.4159 3 22.3465 3 22.2763V3C3 2.44772 3.44772 2 4 2ZM12 13.5L14.9389 15.0451L14.3776 11.7725L16.7553 9.45492L13.4695 8.97746L12 6L10.5305 8.97746L7.24472 9.45492L9.62236 11.7725L9.06107 15.0451L12 13.5Z"
            fill={color} />
    </Svg>
)

const Star = ({ color = "#FFD43B", height = 16, width = 17 }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 17 16" fill="none" >
        <Path d="M7.5366 0.545059L5.53711 4.59915L1.06352 5.25136C0.261276 5.36772 -0.060234 6.35674 0.521547 6.92321L3.75808 10.0771L2.99258 14.5323C2.85479 15.3376 3.70297 15.9408 4.41335 15.5642L8.41539 13.4606L12.4174 15.5642C13.1278 15.9378 13.976 15.3376 13.8382 14.5323L13.0727 10.0771L16.3092 6.92321C16.891 6.35674 16.5695 5.36772 15.7673 5.25136L11.2937 4.59915L9.29419 0.545059C8.93594 -0.177574 7.89791 -0.18676 7.5366 0.545059Z"
            fill={color} />
    </Svg>

)

const Star01 = ({ color = "#FFD43B", height = 16, width = 18 }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 18 16" fill="none">
        <Path d="M16.3235 5.25134L11.8408 4.59913L9.8382 0.545037C9.65754 0.18372 9.30541 0 8.95634 0C8.60728 0 8.25821 0.180658 8.07755 0.545037L6.075 4.59913L1.59223 5.25134C0.786919 5.36769 0.465408 6.35672 1.05025 6.92319L4.29291 10.0771L3.52435 14.5323C3.41412 15.1661 3.92241 15.6775 4.49194 15.6775C4.64198 15.6775 4.79814 15.6407 4.94818 15.5611L8.95941 13.4575L12.9676 15.5611C13.1176 15.6407 13.2707 15.6744 13.4207 15.6744C13.9903 15.6744 14.4986 15.1661 14.3914 14.5292L13.6259 10.074L16.8686 6.92013C17.4503 6.35366 17.1288 5.36463 16.3266 5.24828L16.3235 5.25134ZM12.5971 9.02373L12.0428 9.56264L12.1745 10.3251L12.7716 13.8005L9.6453 12.1592L8.95941 11.801V2.08829L10.521 5.25134L10.864 5.94335L11.6295 6.05358L15.1263 6.56188L12.594 9.02373H12.5971Z"
            fill={color} />
    </Svg>
)

const Star02 = ({ color = "#FFD43B", height = 16, width = 18 }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 18 16" fill="none" >
        <Path d="M16.5376 5.25136L12.064 4.59915L10.0645 0.545059C9.70626 -0.177574 8.66824 -0.18676 8.30692 0.545059L6.30743 4.59915L1.83385 5.25136C1.0316 5.36772 0.710091 6.35674 1.29187 6.92321L4.52841 10.0771L3.76291 14.5323C3.62512 15.3376 4.47329 15.9408 5.18368 15.5642L9.18572 13.4606L13.1878 15.5642C13.8981 15.9378 14.7463 15.3376 14.6085 14.5323L13.843 10.0771L17.0796 6.92321C17.6613 6.35674 17.3398 5.36772 16.5376 5.25136ZM12.2661 9.56266L12.9918 13.8005L9.18572 11.801L5.37965 13.8005L6.10534 9.56266L3.02497 6.5619L7.28115 5.94337L9.18572 2.08525L11.0903 5.94337L15.3465 6.5619L12.2661 9.56266Z"
            fill={color} />
    </Svg>
)

const NearestPlace = ({ color = "white", height = 21, width = 16 }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 16 21" fill="none" >
        <Path d="M1 0H15C15.5523 0 16 0.442565 16 0.988487V19.9114C16 20.1843 15.7761 20.4057 15.5 20.4057C15.4061 20.4057 15.314 20.3794 15.2344 20.3301L8 15.8467L0.76559 20.3301C0.53163 20.4751 0.22306 20.4052 0.0763698 20.1739C0.0264698 20.0952 0 20.0043 0 19.9114V0.988487C0 0.442565 0.44772 0 1 0Z" 
        fill={color}/>
    </Svg>
    
)

const CreateDestination = ({ color = "#C67C4E", height = 24, width = 24 }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" >
        <Path d="M12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24ZM10.8 10.8H6V13.2H10.8V18H13.2V13.2H18V10.8H13.2V6H10.8V10.8Z"
            fill={color} />
    </Svg>
)

const List = ({ color = "#C67C4E", height = 24, width = 24 }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 18 20" fill="none" >
        <Path d="M17 20H1C0.44772 20 0 19.5523 0 19V1C0 0.44772 0.44772 0 1 0H17C17.5523 0 18 0.44772 18 1V19C18 19.5523 17.5523 20 17 20ZM5 5V7H13V5H5ZM5 9V11H13V9H5ZM5 13V15H13V13H5Z"
            fill={color} />
    </Svg>
)

const Add = ({ color = "#C67C4E", height = 22, width = 22 }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 22 22" fill="none">
        <Path d="M9.42857 9.42857V0H12.5714V9.42857H22V12.5714H12.5714V22H9.42857V12.5714H0V9.42857H9.42857Z"
            fill={color} />
    </Svg>
)

const Dropdown = ({ color = "#C67C4E", height = 39, width = 24 }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 24 39" fill="none" >
        <Path d="M2.34753 14.4H21.645C22.98 14.4 23.6475 16.0125 22.7025 16.9575L13.0575 26.61C12.4725 27.195 11.52 27.195 10.935 26.61L1.29003 16.9575C0.345028 16.0125 1.01253 14.4 2.34753 14.4Z"
            fill={color} />
    </Svg>
)

const Newest = ({ color = "#C67C4E", height = 18, width = 18 }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 18 18" fill="none">
        <Path d="M15.4934 0.442969L15.634 3.35391C14.817 2.38968 13.7996 1.61524 12.6526 1.08456C11.5057 0.553882 10.2568 0.279742 8.99297 0.28125C4.73555 0.28125 1.1918 3.33633 0.432422 7.37578C0.421062 7.4367 0.42326 7.49936 0.438859 7.55933C0.454458 7.6193 0.483076 7.6751 0.522679 7.72275C0.562281 7.77041 0.611895 7.80876 0.667995 7.83507C0.724094 7.86139 0.785302 7.87502 0.847266 7.875H2.57344C2.66887 7.87506 2.76151 7.84276 2.83622 7.78338C2.91093 7.724 2.96329 7.64104 2.98477 7.54805C3.26605 6.38092 3.88097 5.32089 4.75451 4.49734C5.62805 3.67378 6.72243 3.1223 7.90409 2.9102C9.08575 2.6981 10.3036 2.83454 11.409 3.30288C12.5145 3.77122 13.4597 4.55121 14.1293 5.54766L10.5609 5.37539C10.5038 5.37253 10.4467 5.38133 10.393 5.40124C10.3394 5.42116 10.2903 5.45178 10.2489 5.49124C10.2075 5.53071 10.1745 5.57819 10.152 5.6308C10.1295 5.68341 10.1179 5.74004 10.118 5.79727V7.46367C10.118 7.57556 10.1624 7.68287 10.2415 7.76198C10.3207 7.8411 10.428 7.88555 10.5398 7.88555H17.5781C17.69 7.88555 17.7973 7.8411 17.8764 7.76198C17.9556 7.68287 18 7.57556 18 7.46367V0.421875C18 0.309987 17.9556 0.202682 17.8764 0.123565C17.7973 0.0444477 17.69 3.30057e-07 17.5781 3.30057e-07H15.9117C15.8545 -7.12445e-05 15.7979 0.0114989 15.7452 0.0340068C15.6926 0.0565148 15.6452 0.0894901 15.6057 0.130927C15.5662 0.172363 15.5356 0.221395 15.5157 0.275039C15.4958 0.328683 15.487 0.385819 15.4898 0.442969H15.4934ZM8.99297 15.1875C7.97855 15.1884 6.97953 14.9393 6.08428 14.4622C5.18903 13.9852 4.42514 13.2949 3.86016 12.4523L7.43906 12.6246C7.49621 12.6275 7.55335 12.6187 7.60699 12.5988C7.66064 12.5788 7.70967 12.5482 7.7511 12.5088C7.79254 12.4693 7.82552 12.4218 7.84802 12.3692C7.87053 12.3166 7.8821 12.26 7.88203 12.2027V10.5363C7.88203 10.4244 7.83758 10.3171 7.75847 10.238C7.67935 10.1589 7.57204 10.1145 7.46016 10.1145H0.421875C0.309987 10.1145 0.202681 10.1589 0.123564 10.238C0.0444474 10.3171 0 10.4244 0 10.5363L0 17.5781C0 17.69 0.0444474 17.7973 0.123564 17.8764C0.202681 17.9556 0.309987 18 0.421875 18H2.08828C2.1455 18.0001 2.20214 17.9885 2.25475 17.966C2.30736 17.9435 2.35484 17.9105 2.3943 17.8691C2.43377 17.8276 2.46439 17.7786 2.48431 17.725C2.50422 17.6713 2.51302 17.6142 2.51016 17.557L2.3625 14.6531C3.17898 15.6147 4.195 16.387 5.34 16.9164C6.48499 17.4458 7.73151 17.7196 8.99297 17.7188C13.2504 17.7188 16.7941 14.6637 17.557 10.6242C17.5684 10.5633 17.5662 10.5006 17.5506 10.4407C17.535 10.3807 17.5064 10.3249 17.4668 10.2772C17.4272 10.2296 17.3776 10.1912 17.3215 10.1649C17.2654 10.1386 17.2042 10.125 17.1422 10.125H15.416C15.3206 10.1249 15.2279 10.1572 15.1532 10.2166C15.0785 10.276 15.0262 10.359 15.0047 10.452C14.6795 11.8015 13.9098 13.0024 12.8193 13.8614C11.7289 14.7203 10.3811 15.1874 8.99297 15.1875Z"
            fill={color} />
    </Svg>
)

const Person = ({ color = "#C67C4E", height = 21, width = 16 }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 16 21" fill="none">
        <Path d="M16 21H0V19C0 16.2386 2.23858 14 5 14H11C13.7614 14 16 16.2386 16 19V21ZM8 12C4.68629 12 2 9.3137 2 6C2 2.68629 4.68629 0 8 0C11.3137 0 14 2.68629 14 6C14 9.3137 11.3137 12 8 12Z"
            fill={color} />
    </Svg>
)

const Setting = ({ color = "#C67C4E", height = 19, width = 20 }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 20 19" fill="none">
        <Path d="M3.33409 2.04784C4.3494 1.1393 5.55145 0.43513 6.87555 0C7.60856 0.91573 8.7358 1.50221 10 1.50221C11.2642 1.50221 12.3914 0.91573 13.1245 0C14.4486 0.43513 15.6506 1.1393 16.6659 2.04784C16.2405 3.13993 16.2966 4.40824 16.9282 5.50221C17.5602 6.59681 18.6314 7.27972 19.7906 7.45685C19.9279 8.11713 20 8.80123 20 9.50223C20 10.2031 19.9279 10.8873 19.7906 11.5475C18.6314 11.7247 17.5602 12.4076 16.9282 13.5022C16.2966 14.5961 16.2405 15.8645 16.6659 16.9565C15.6506 17.8651 14.4486 18.5693 13.1245 19.0044C12.3914 18.0887 11.2642 17.5022 10 17.5022C8.7358 17.5022 7.60856 18.0887 6.87555 19.0044C5.55145 18.5693 4.3494 17.8651 3.33409 16.9565C3.75952 15.8645 3.7034 14.5961 3.0718 13.5022C2.43983 12.4076 1.36862 11.7247 0.20935 11.5475C0.0721201 10.8873 0 10.2031 0 9.50223C0 8.80123 0.0721201 8.11713 0.20935 7.45685C1.36862 7.27972 2.43983 6.59681 3.0718 5.50221C3.7034 4.40824 3.75952 3.13993 3.33409 2.04784ZM11.5 12.1003C12.9349 11.2718 13.4265 9.43713 12.5981 8.00223C11.7696 6.56733 9.9349 6.0757 8.5 6.90413C7.06512 7.73253 6.5735 9.56733 7.40192 11.0022C8.2304 12.4371 10.0651 12.9287 11.5 12.1003Z"
            fill={color} />
    </Svg>
)

const Cancel = ({ color = "#C67C4E", height = 20, width = 20 }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none" >
        <Path d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20ZM10 8.5858L7.17157 5.75736L5.75736 7.17157L8.5858 10L5.75736 12.8284L7.17157 14.2426L10 11.4142L12.8284 14.2426L14.2426 12.8284L11.4142 10L14.2426 7.17157L12.8284 5.75736L10 8.5858Z"
            fill={color} />
    </Svg>
)

const UserList = ({ color = "#C67C4E", height = 20, width = 20 }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 23 20" fill="none" >
        <Path d="M11.5713 2.22222H21.1111C21.7248 2.22222 22.2222 2.71969 22.2222 3.33333V18.8889C22.2222 19.5026 21.7248 20 21.1111 20H1.11111C0.497467 20 0 19.5026 0 18.8889V1.11111C0 0.497467 0.497467 0 1.11111 0H9.34911L11.5713 2.22222ZM11.1111 11.1111C12.6452 11.1111 13.8889 9.86744 13.8889 8.33333C13.8889 6.79921 12.6452 5.55556 11.1111 5.55556C9.577 5.55556 8.33333 6.79921 8.33333 8.33333C8.33333 9.86744 9.577 11.1111 11.1111 11.1111ZM6.66667 16.6667H15.5556C15.5556 14.2121 13.5657 12.2222 11.1111 12.2222C8.65651 12.2222 6.66667 14.2121 6.66667 16.6667Z"
            fill={color} />
    </Svg>
)

const Lock = ({ color = "white", height = 16, width = 14 }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 14 16" fill="none" >
        <Path d="M11.6893 6.91356H11.0122V4.69135C11.0122 2.10493 9.08793 0 6.72354 0C4.35914 0 2.4349 2.10493 2.4349 4.69135V6.91356H1.75775C1.01006 6.91356 0.403442 7.57714 0.403442 8.39504V14.3209C0.403442 15.1388 1.01006 15.8024 1.75775 15.8024H11.6893C12.437 15.8024 13.0436 15.1388 13.0436 14.3209V8.39504C13.0436 7.57714 12.437 6.91356 11.6893 6.91356ZM8.75499 6.91356H4.69208V4.69135C4.69208 3.46604 5.60341 2.46913 6.72354 2.46913C7.84366 2.46913 8.75499 3.46604 8.75499 4.69135V6.91356Z"
            fill={color} />
    </Svg>
)

const UnLock = ({ color = "white", height = 14, width = 12 }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 12 14" fill="none">
        <Path d="M11.3214 6.85717H4.30214V4.09556C4.30214 3.03485 5.19937 2.1536 6.32019 2.14288C7.45233 2.13217 8.37786 3.00271 8.37786 4.07146V4.50003C8.37786 4.85628 8.68071 5.14288 9.05714 5.14288H9.96286C10.3393 5.14288 10.6421 4.85628 10.6421 4.50003V4.07146C10.6421 1.82146 8.70335 -0.00800934 6.32585 2.6371e-05C3.94835 0.00806209 2.03786 1.86163 2.03786 4.11163V6.85717H1.35857C0.608527 6.85717 0 7.43306 0 8.14288V12.4286C0 13.1384 0.608527 13.7143 1.35857 13.7143H11.3214C12.0715 13.7143 12.68 13.1384 12.68 12.4286V8.14288C12.68 7.43306 12.0715 6.85717 11.3214 6.85717Z"
            fill={color} />
    </Svg>
)

const Back = ({ color = "#C67C4E", height = 26, width = 24 }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 24 26" fill="none">
        <Path d="M13.8849 20.2088L12.715 21.3099C12.2196 21.7761 11.4186 21.7761 10.9285 21.3099L0.684022 11.6729C0.188659 11.2067 0.188659 10.4528 0.684022 9.99156L10.9285 0.349667C11.4239 -0.116556 12.2249 -0.116556 12.715 0.349667L13.8849 1.45075C14.3855 1.92193 14.375 2.6907 13.8638 3.15197L7.5137 8.84584H22.6591C23.36 8.84584 23.9239 9.37654 23.9239 10.0362V11.6233C23.9239 12.283 23.36 12.8137 22.6591 12.8137H7.5137L13.8638 18.5076C14.3803 18.9688 14.3908 19.7376 13.8849 20.2088Z"
            fill={color} />
    </Svg>
)

const Edit = ({ color = "white", height = 20, width = 24 }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 24 20" fill="none" >
        <Path d="M16.3452 3.2096L19.8828 6.68919C20.0318 6.83578 20.0318 7.07496 19.8828 7.22155L11.3173 15.6466L7.67771 16.044C7.19139 16.098 6.77959 15.6929 6.8345 15.2146L7.23845 11.6347L15.804 3.2096C15.953 3.06301 16.1961 3.06301 16.3452 3.2096ZM22.6987 2.32621L20.7848 0.443677C20.1887 -0.142684 19.22 -0.142684 18.6199 0.443677L17.2315 1.80928C17.0825 1.95587 17.0825 2.19505 17.2315 2.34164L20.7691 5.82123C20.9182 5.96782 21.1613 5.96782 21.3103 5.82123L22.6987 4.45562C23.2948 3.8654 23.2948 2.91257 22.6987 2.32621ZM15.6157 13.3552V17.2823H3.06552V4.93783H12.0781C12.2036 4.93783 12.3213 4.88768 12.4115 4.80281L13.9803 3.25975C14.2783 2.96657 14.0665 2.46894 13.6469 2.46894H2.43801C1.3987 2.46894 0.555481 3.29833 0.555481 4.3206V17.8995C0.555481 18.9218 1.3987 19.7512 2.43801 19.7512H16.2432C17.2825 19.7512 18.1257 18.9218 18.1257 17.8995V11.8121C18.1257 11.3994 17.6198 11.1949 17.3217 11.4842L15.753 13.0273C15.6667 13.116 15.6157 13.2318 15.6157 13.3552Z"
            fill={color} />
    </Svg>
)

const Sub = ({ color = "#C67C4E", height = 5, width = 18 }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 18 5" fill="none" >
        <Path d="M16.3125 0.739014H1.6875C0.755859 0.739014 0 1.33056 0 2.05967V2.9401C0 3.66921 0.755859 4.26075 1.6875 4.26075H16.3125C17.2441 4.26075 18 3.66921 18 2.9401V2.05967C18 1.33056 17.2441 0.739014 16.3125 0.739014Z"
            fill={color} />
    </Svg>
)

const Gmail = ({ color = "#C67C4E", height = 20, width = 24 }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 24 20" fill="none" >
        <Path d="M21.0526 10.8857C20.3941 10.6529 19.6856 10.5263 18.9474 10.5263C15.4593 10.5263 12.6316 13.354 12.6316 16.8421C12.6316 17.5803 12.7582 18.2888 12.9909 18.9474H1.05263C0.471284 18.9474 0 18.4761 0 17.8947V1.05263C0 0.471284 0.471284 0 1.05263 0H20C20.5814 0 21.0526 0.471284 21.0526 1.05263V10.8857ZM10.5901 9.1399L3.83918 3.40811L2.47661 5.01295L10.6033 11.9127L18.5836 5.00648L17.2059 3.41457L10.5901 9.1399ZM17.8947 20L14.1732 16.2784L15.6618 14.7898L17.8947 17.0227L21.6163 13.3011L23.1049 14.7898L17.8947 20Z"
            fill={color} />
    </Svg>
)

const CircleReset = ({ color = "white", height = 20, width = 20 }: IconProps) => (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none" >
        <Path d="M3.46257 2.43262C5.21556 0.91688 7.5007 0 10 0C15.5228 0 20 4.47715 20 10C20 12.1361 19.3302 14.1158 18.1892 15.7406L15 10H18C18 5.58172 14.4183 2 10 2C7.84982 2 5.89777 2.84827 4.46023 4.22842L3.46257 2.43262ZM16.5374 17.5674C14.7844 19.0831 12.4993 20 10 20C4.47715 20 0 15.5228 0 10C0 7.86386 0.66979 5.88416 1.8108 4.25944L5 10H2C2 14.4183 5.58172 18 10 18C12.1502 18 14.1022 17.1517 15.5398 15.7716L16.5374 17.5674Z"
            fill={color} />
    </Svg>
)

const Icons = ({ name, color, height, width }: IconProps & { name: IconName }) => {
    switch (name) {
        case "home":
            return <Home color={color} height={height} width={width} />
        case "places":
            return <Places color={color} height={height} width={width} />
        case "loved":
            return <Loved color={color} height={height} width={width} />
        case "personal":
            return <Personal color={color} height={height} width={width} />
        case "in":
            return <In color={color} height={height} width={width} />
        case "eye":
            return <Eye color={color} height={height} width={width} />
        case "uneye":
            return <Uneye color={color} height={height} width={width} />
        case "search":
            return <Search color={color} height={height} width={width} />
        case "topPlace":
            return <TopPlace color={color} height={height} width={width} />
        case "star":
            return <Star color={color} height={height} width={width} />
        case "star01":
            return <Star01 color={color} height={height} width={width} />
        case "star02":
            return <Star02 color={color} height={height} width={width} />
        case "nearestPlace":
            return <NearestPlace color={color} height={height} width={width} />
        case "createDestination":
            return <CreateDestination color={color} height={height} width={width} />
        case "list":
            return <List color={color} height={height} width={width} />
        case "add":
            return <Add color={color} height={height} width={width} />
        case "dropdown":
            return <Dropdown color={color} height={height} width={width} />
        case "newest":
            return <Newest color={color} height={height} width={width} />
        case "person":
            return <Person color={color} height={height} width={width} />
        case "setting":
            return <Setting color={color} height={height} width={width} />
        case "cancel":
            return <Cancel color={color} height={height} width={width} />
        case "userList":
            return <UserList color={color} height={height} width={width} />
        case "lock":
            return <Lock color={color} height={height} width={width} />
        case "unLock":
            return <UnLock color={color} height={height} width={width} />
        case "back":
            return <Back color={color} height={height} width={width} />
        case "edit":
            return <Edit color={color} height={height} width={width} />
        case "sub":
            return <Sub color={color} height={height} width={width} />
        case "gmail":
            return <Gmail color={color} height={height} width={width} />
        case "circleReset":
            return <CircleReset color={color} height={height} width={width} />
    }
}

export default Icons