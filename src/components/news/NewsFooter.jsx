import React from 'react';
import {StyleSheet, Linking} from 'react-native';
import {View, Text} from 'native-base';
import moment from 'moment';

import {font, colors} from '../../config/styles';

const closestDiff = (m1, m2) => {
	let y = m2.diff(m1, 'years');
	let m = m2.diff(m1, 'months');
	let d = m2.diff(m1, 'days');
	let s = m2.diff(m1, 'seconds');
	let h = parseInt(s/3600);
	let min  = parseInt(s/60);

	if (y > 0){
		return `${years}y`;
	}
	if (m > 0){
		return `${m} ${m>1? 'months':'month'}`;
	}
	if (d > 0){
		return `${d}d`;
	}
	if (h > 0){
		return `${h}h`;
	}
	if (min > 0){
		return `${m}m`;
	}
	return `${s}s`;
}

export default function NewsFooter(props){
	const {source, date} = props;
	let {author} = props;
	try{
		const p2 = JSON.parse(author);
		if (p2[0].name){
			author = p2.name;
		}
	}catch(err){

	}

	return (
		<View style={styles.container}>
			<Text style={styles.author}>{author}</Text>
			<Text style={styles.date}>{closestDiff(new moment(date), new moment())}</Text>
		</View>
		)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		flex: 1
	},
	author: {
		fontSize: font.small
	},
	date: {
		color: colors.grey,
		alignSelf: 'flex-end',
		fontSize: font.small
	}
})