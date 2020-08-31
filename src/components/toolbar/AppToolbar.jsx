import React, {useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Header,
		View,
		Left,
		Body,
		Right,
		Text,
		Input,
		Item
	} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';

import {ThemeContext} from '../../context/ThemeContext';


export default function AppToolbar(props){

	const {theme, setTheme} = useContext(ThemeContext);
	const [searchText, setSearchText] = useState('');

	const navigation = useNavigation();

	const toggleTheme = () => {
		if (theme === 'light')
			setTheme('dark');
		else
			setTheme('light');
	}

	const handleSearch = () => {
		if (props.onSearch && (searchText.length > 0))
			props.onSearch(searchText);
	}
	const renderSearch = () => {
		if (props.searchBar){
			return (<Item style={{flexDirection: 'row'}}>
			              <Input
			                placeholder="Search"
			                value={searchText}
			                onChangeText={(text) => setSearchText(text)}
			              />
			              <Icon name="search1" size={20} onPress={handleSearch}/>
					</Item>);
		}
		return <></>;
	}
	return (
		<Header searchBar style={{
					backgroundColor: theme==='light'? 'white': '#333',
					color: theme === 'light'? '#333':'white'
					}}>
			<Left>
				<Text onPress={() => navigation.toggleDrawer()}
						style={{color: theme === 'light'? '#333':'white'}}>
					<Ionicons name="ios-menu" size={32} />
				</Text>
			</Left>
			<Body>
				<Text style={{color: theme === 'light'? '#333':'white'}}>{props.title? props.title: 'News'}</Text>
			</Body>
			{renderSearch()}
		</Header>
		)
}

const styles = StyleSheet.create({
	header: {

	},
	text: {

	}
})