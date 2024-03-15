import theme from '@/utils/theme';
import {ThemeProvider} from '@shopify/restyle';
import Navigation from '@/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
          <StatusBar backgroundColor={'#2F3542'} />
          <Navigation />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
