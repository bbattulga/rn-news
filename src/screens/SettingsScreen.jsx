import React, {useState, useEffect, useCallback} from 'react';
import {View, 
		Text,
		Form,
		Item,
		Label,
		Input,
		Button,
		Card,
		CardItem,
		Spinner,
		Picker} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import {fetchApiKey} from '../api/API';
import Screen from '../components/screen/Screen.jsx';


export default function SettingsScreen(props){

	const [loading, setLoading] = useState(false);
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState('');
	const [text, setText] = useState('');

	const fetchApiKey = () => {
		(async () => {
			setLoading(true);
			const val = await AsyncStorage.getItem('API_KEY');
			setText(val);
			setLoading(false);
		})();
	}

	// onMount
	useEffect(() => {
		fetchApiKey();
	}, []);

	const handleSubmit = () => {
		(async () => {
			setLoading(true);
			await AsyncStorage.setItem('API_KEY', text);
			setLoading(false);
		})();
	}

	const renderAction = () => {
		if (loading)
			return <Spinner />
		return (<Button onPress={handleSubmit}>
					<Text>submit</Text>
				</Button>)
	}
	return (
		<Screen>
			<Card>
				<CardItem>
					<Form style={{flex: 1}}>
						<Item floatingLabel>
							<Label>Api key</Label>
							<Input value={text}
									onChangeText={(text) => setText(text)} />
						</Item>
					</Form>
				</CardItem>
				<CardItem footer style={{justifyContent: 'flex-end'}}>
					{renderAction()}
				</CardItem>
			</Card>
		</Screen>
		)
}