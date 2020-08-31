import React, {useState, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {View,
		Text,
		CheckBox,
		Card,
		CardItem} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import Screen from '../components/screen/Screen.jsx';
import {fetchSources} from '../api/API';
import {Business, Science} from '../components/category/Category.jsx';


export default function SubscriptionScreen(props){

	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);

	useFocusEffect(useCallback(() => {

		(async () => {
			setLoading(true);
			let c = await AsyncStorage.getItem('categories');
			let parsed = JSON.parse(c);
			setCategories(parsed);
			setLoading(false);
		})();

	}, []));

	const toggleSelected = (category) => {
		let t = categories.map(c => {
			if (c.id === category.id)
				c.selected = !c.selected;
			return c;
		});
		setCategories(t);
	};

	const renderCategory = useCallback((category) => {

		let elem;
		switch(category.name){
			case 'business':
				elem = <Business category={category}/>
				break;
			default:
				elem = <Science category={category}/>
				break;
		}
		return (
			<View style={{marginBottom: 20}}>
				{elem}	
			</View>
			)
	}, []);

	return (
		<Screen>
			<Card>
				<CardItem>
					<View style={styles.container}>
						{categories.map(c => renderCategory(c))}
					</View>
				</CardItem>
			</Card>
		</Screen>
		)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between'
	}
})