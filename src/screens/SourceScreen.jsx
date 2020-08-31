import React, {useState, useEffect, useCallback} from 'react';
import {RefreshControl} from 'react-native';
import {View,
		Text} from 'native-base';

import Screen from '../components/screen/Screen.jsx';
import News from '../components/news/News.jsx';
import {fetchNewsBySources} from '../api/API';

export default function SourceScreen(props){

	const {navigation, route} = props;
	const {source} = route.params;

	const [loading, setLoading] = useState(false);
	const [news, setNews] = useState([]);

	const fetch = () => {
		(async () => {
			setLoading(true);
			let news = await fetchNewsBySources([source.id]);
			setNews(news);
			setLoading(false);
		})();
	};

	// onMount
	useEffect(() => {
		fetch();
	}, []);

	return (
		<Screen title={source.name}
			headerOptions={{headerShown: false}}
			 refreshControl={<RefreshControl refreshing={loading} onRefresh={fetch}/>}>
			<News data={news} />
		</Screen>
		)
}