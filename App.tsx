import theme from "@/utils/theme"
import { ThemeProvider } from "@shopify/restyle"
import Navigation from "@/navigation"
import { SafeAreaProvider } from "react-native-safe-area-context"
import useUserGlobalStore from "@/store/useUserGlobalStore"
import { useEffect } from "react"
import { StatusBar, View } from "react-native"
import DetailPlaceScreen from "@/screens/detail-place-screen"
import MapView, { Marker } from "react-native-maps"

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <StatusBar backgroundColor={'#2F3542'} />
        <Navigation />
      </SafeAreaProvider>
    </ThemeProvider>
  )
}