import { createStackNavigator } from '@react-navigation/stack';
import ProjectListScreen from '../screens/ProjectListScreen';
import CreateProjectScreen from '../screens/CreateProjectScreen';
import ProjectDetailsScreen from '../screens/ProjectDetailsScreen';
import AddNewReportScreen from '../screens/AddNewReportScreen';
import AddObservationScreen from '../screens/AddObservationScreen';

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="ProjectList">
      <Stack.Screen name="ProjectList" component={ProjectListScreen} />
      <Stack.Screen name="CreateProject" component={CreateProjectScreen} />
      <Stack.Screen name="ProjectDetails" component={ProjectDetailsScreen} />
      <Stack.Screen name="AddNewReport" component={AddNewReportScreen} />
      <Stack.Screen name="AddObservation" component={AddObservationScreen} />
    </Stack.Navigator>
  );
}