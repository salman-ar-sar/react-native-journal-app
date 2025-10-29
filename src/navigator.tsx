import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import Home from './screens/Home';
import NewEntry from './screens/NewEntry';
import JournalEntryView from './screens/JournalEntryView';
import { JournalEntry } from './store/journalStorage';

type RootStackParamList = {
  Home: undefined;
  NewEntry: undefined;
  JournalEntryView: { entry: JournalEntry };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="NewEntry" component={NewEntry} />
        <Stack.Screen name="JournalEntryView" component={JournalEntryView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }

  interface RootStackScreenProps<Screen extends keyof RootStackParamList>
    extends NativeStackScreenProps<RootStackParamList, Screen> {}
}
