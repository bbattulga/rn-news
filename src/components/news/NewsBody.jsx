import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from 'native-base';

import {font, color} from '../../config/styles';

export default function NewsBody(props){
	const {content, url} = props;

	return (
		<View>
			<Text style={styles.content}>{content}</Text>
		</View>
		)
}

const styles = StyleSheet.create({
	content: {
		color: '#444'
	},
	url: {
		color: 'blue',
		alignSelf: 'flex-end',
		fontSize: font.small
	}
})