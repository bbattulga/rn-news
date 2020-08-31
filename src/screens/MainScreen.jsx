import React, {useState, useEffect, useCallback} from 'react';
import {View, Text} from 'native-base';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';

import HomeScreen from './HomeScreen.jsx';
import SearchScreen from './SearchScreen.jsx';
import SubscriptionScreen from './SubscriptionScreen.jsx';
import SettingsScreen from './SettingsScreen.jsx';
import SourceScreen from './SourceScreen.jsx';
import * as API from '../api/API';
import DrawerContent from '../components/drawer/DrawerContent.jsx';


const Drawer = createDrawerNavigator();

export default function MainScreen(props){

	const [sources, setSources] = useState([]);

	// onMount
	useEffect(() => {
		(async () => {
			let sources = await API.fetchSources();
			setSources(sources);
		})();

	}, []);

	const renderSource = useCallback((source) => {
		return <Drawer.Screen name={source.name} component={SourceScreen} initialParams={{source}} />
	}, []);

	return (
		<Drawer.Navigator initialRouteName="subscriptons"
					drawerContent={(props) => <DrawerContent {...props}/>}
					screenOptions={({route}) => ({
						drawerIcon: ({focused, color, size}) => {
							let iconName;
							if (route.name === 'Home')
								iconName = 'home';
							else if (route.name === 'Search')
								iconName = 'search1';
							else if (route.name === 'Subscriptons')
								iconName = 'customerservice';
							else if (route.name === 'Settings')
								iconName = 'setting';
							return <Icon name={iconName} size={size} color={color}/>
						}
						})}>
			<Drawer.Screen name="Home" component={HomeScreen} />
			<Drawer.Screen name="Settings" component={SettingsScreen} />
		</Drawer.Navigator>
		)
}