import React, {useState, useCallback} from 'react';
import {View,
		Text,
		RefreshControl} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import Screen from '../components/screen/Screen.jsx';
import News from '../components/news/News.jsx';
import {fetchTopNews} from '../api/API';


export default function CategoryNewsScreen(props){

	const [loading, setLoading] = useState(false);
	const {navigation, route} = props;
	const {category} = route.params;
	const [news, setNews] = useState([]);

	const fetch = useCallback(() => {
		(async () => {
			setLoading(true);
			let result = await fetchTopNews({country: 'us', category: category.name});
			setNews(result);
			setLoading(false);
		})();
	}, [category]);

	useFocusEffect(fetch);

	return (
		<Screen headerOptions={{headerShown: false}}
				refreshControl={<RefreshControl refreshing={loading} onRefrseh={fetch} />}>
			<News data={news} />
		</Screen>
		)
}