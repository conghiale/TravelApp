import theme from "@/utils/theme"
import { ThemeProvider }  from "@shopify/restyle"
import Navigation from "@/navigation"
import { SafeAreaProvider } from "react-native-safe-area-context"
import useUserGlobalStore from "@/store/useUserGlobalStore"
import { useEffect } from "react"

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </ThemeProvider>
  )
}