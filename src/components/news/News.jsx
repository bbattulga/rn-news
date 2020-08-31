import React, {useCallback, useContext} from 'react';
import {Image, Linking, FlatList, TouchableOpacity} from 'react-native';
import {List, 
		ListItem,
		View,
		Text,
		Title,
		Card,
		CardItem} from 'native-base';
import * as WebBrowser from 'expo-web-browser';

import {font} from '../../config/styles';
import NewsBody from './NewsBody.jsx';
import NewsFooter from './NewsFooter.jsx';


export default function News(props){
	const {data} = props;
	const {articles} = data;
	const {theme} = props;

	const handleClickLink = useCallback((url) => {
		console.log('open link');
		WebBrowser.openBrowserAsync(url);
	}, []);

	const renderArticle = useCallback((article) => {
		return (
			<Card>
				<CardItem header>
					<Text style={{textAlign: 'right'}}>{article.title}</Text>
				</CardItem>
				<TouchableOpacity onPress={() => handleClickLink(article.url)}
						activeOpacity={0.98}>
					<CardItem>
					<Image source={{uri: article.urlToImage}}
							style={{width: 300, height: 200}} />
					</CardItem>
					<CardItem>
						<NewsBody content={article.description}
								url={article.url} />
					</CardItem>
				</TouchableOpacity>
				<CardItem>
					<NewsFooter author={article.author}
								source={article.source}
								date={article.publishedAt} />
				</CardItem>
			</Card>
			)
	}, []);

	if (!articles){
		return <></>;
	}
	return (
		<FlatList data={articles}
				renderItem={({item}) => renderArticle(item)}/>
		)
}