import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {View,
		Text,
		Button} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';


const toggleCategory = async (categoryId) => {
	let categories = await AsyncStorage.getItem('categories');
	categories = JSON.parse(categories);
	let category = categories[0];
	for (let i=0; i<categories.length; i++){
		if (categories[i].id === categoryId){
			category = categories[i];
			categories[i].selected = !categories[i].selected;
		}
	}
	await AsyncStorage.setItem('categories', JSON.stringify(categories));
	return category;
}

function Category(props){
	const {category, image} = props;

	const [selected, setSelected] = useState(category.selected);

	const toggle = () => {
		(async () => {
			let beforeToggle = selected;
			setSelected(!beforeToggle);	
			try{
				await toggleCategory(category.id);
			}catch(err){
				// fallback
				console.log(err);
				setSelected(beforeToggle);
			}
		})();
	}
	return (
		<View>
			<Image style={{width: 150, height: 150}}
				source={{uri: 'https://picsum.photos/150/150'}} />
			<Text>{category.name}</Text>
			<Button onPress={toggle}>
				<Text>{selected? 'unsubscribe':'subscribe'}</Text>
			</Button>
		</View>
		)
}


export function Business(props){
	return (
		<Category category={props.category} />
		)
}

export function Science(props){
	const {category} = props;

	return (
		<Category category={props.category} name="Science" />
		)
}