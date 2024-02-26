import Button from "@/components/button"
import theme, { Text } from "@/utils/theme"
import { StyleSheet, View } from "react-native"
import { ThemeProvider }  from "@shopify/restyle"
import Navigation from "@/navigation"
import { SafeAreaProvider } from "react-native-safe-area-context"

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})