import React, {useState, useEffect, useCallback, useContext} from 'react';
import {ScrollView,
		RefreshControl} from 'react-native';
import {View, 
		Text,
		Button} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';


import Screen from '../components/screen/Screen.jsx';
import News from '../components/news/News.jsx';
import * as API from '../api/API';
import {ThemeContext} from '../context/ThemeContext';


export default function HomeScreen(props){

	const [loading, setLoading] = useState(false);
	const [news, setNews] = useState('');
	const [text, setText] = useState('');

	const {theme, _} = useContext(ThemeContext);

	const fetchNews = useCallback((q='') => {
		(async () => {
			setLoading(true);
			setText('');
			let data = await API.fetchTopNews({q});
			if (data.articles.length > 0){
				setText('');
				setNews(data);
			}
			else{
				setText('no result');
				setNews(data);
				console.log(data);
			}
			setLoading(false);
		})();
	}, []);

	const refresh = useCallback(() => {
		fetchNews();
	}, [fetchNews]);

	// onMount
	useEffect(() => {
		fetchNews();
	}, []);

	const renderText = () => {
		if (news.articles?.length > 0){
			return <></>;
		}
		return <Text>{text}</Text>
	}

	return (
		
			<Screen searchBar
					refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}
					onSearch={(text) => fetchNews(text)}>
					{renderText()}
					<News data={news}
						theme={theme} />
			</Screen>
		)
}