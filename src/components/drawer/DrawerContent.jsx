import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {
	DrawerItem,
	DrawerItemList,
	DrawerContentScrollView
} from '@react-navigation/drawer';
import {View} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';

import * as API from '../../api/API';


const categoryIcon = (name, {focused, color, size}) => {
	let iconName;
	switch(name){
		case 'entertainment':
			iconName = 'dingding';
			break;
		case 'business':
			iconName = 'bank';
			break;
		case 'general':
			iconName = 'earth';
			break;
		case 'health':
			iconName = 'hearto';
			break;
		case 'science':
			iconName = 'rocket1';
			break;
		case 'sports':
			iconName = 'dribbble';
			break;
		case 'technology':
			iconName = 'google';
			break;
		default:
			iconName = 'home';
			break;

	}
	return <Icon name={iconName} color={color} size={size} />
}

export default function DrawerContent(props){

	const [sources, setSources] = useState([]);
	const [categories, setCategories] = useState([]);
	const {navigation} = props;

	// onMount
	useEffect(() => {
		(async () => {
			let sources = await API.fetchSources();
			let c = await API.fetchCategories();
			setCategories(c);
			setSources(sources);
		})();
	}, []);

	const navToSource = useCallback((source) => {
		navigation.navigate("Source", {source});
	}, []);

	const navToCategory = useCallback((category) => {
		navigation.navigate('Category', {category});
	}, []);
	return (
		<DrawerContentScrollView {...props}>
			<DrawerItemList {...props} />
			<DrawerItem label="Categories"
						labelStyle={styles.title} />
			<View style={styles.subContainer}>
				{categories.map(c => <DrawerItem icon={(prop) => categoryIcon(c.name, prop)} label={c.name} onPress={() => navToCategory(c)}/>)}
			</View>
			<View>
				<DrawerItem label="Popular sources" 
					labelStyle={styles.title}/>
				<View style={styles.subContainer}>
					{sources.map(s => <DrawerItem  label={s.name} onPress={() => navToSource(s)}/>)}
				</View>
			</View>
		</DrawerContentScrollView>
		)
}

const styles = StyleSheet.create({
	title: {
		fontSize: 21,
		color: '#333'
	},
	subContainer: {
		paddingLeft: 10
	}
})

