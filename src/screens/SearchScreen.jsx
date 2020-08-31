import React, {useState} from 'react';
import {View,
		Text,
		Input,
		Button,
		Form,
		Item,
		Label,
		Card,
		CardItem,
		Spinner} from 'native-base';


import Screen from '../components/screen/Screen.jsx';
import News from '../components/news/News.jsx';
import {searchNews} from '../api/API';


export default function SearchScreen(props){

	const [loading, setLoading] = useState(false);
	const [news, setNews] = useState([]);
	const [text, setText] = useState('');

	const search = () => {
		(async () => {
			setLoading(true);
			let result = await searchNews({q: text});
			setNews(result);
			console.log('search result');
			console.log(result);
			setLoading(false);
		})();
	}

	return (
		<Screen>
			<View>
				<Card>
					<CardItem>
						<Form style={{flex: 1}}>
							<Item floatingLabel>
								<Label>
									phrase
								</Label>
								<Input value={text}
										onChangeText={(text) => setText(text)} />
							</Item>
						</Form>
					</CardItem>
					<CardItem footer style={{justifyContent: 'flex-end'}}>
						{loading? <Spinner/> : (<Button onPress={search}>
													<Text>search</Text>
												</Button>)}
					</CardItem>
				</Card>
			</View>
			<View>
				<News data={news} />
			</View>
		</Screen>
		)
}