import React from 'react';
import {StyleSheet} from 'react-native';
import {Header, 
		Left,
		Text,
		Body,
		Right,
		Container, 
		Content} from 'native-base';

import AppToolbar from '../toolbar/AppToolbar.jsx';


const defaultOptions = {
	headerShown: true
}

export default function Screen(props){

	let {headerOptions} = props;
	headerOptions = {...defaultOptions, ...headerOptions};

	const renderHeader = () => {
		if (headerOptions.headerShown){
			return <AppToolbar searchBar={props.searchBar} onSearch={props.onSearch} title={props.title}/>
		}
		return <></>;
	}
	return (
		<Container>
			{renderHeader()}
			<Content contentContainerStyle={styles.container}
						refreshControl={props.refreshControl}>
				{props.children}
			</Content>
		</Container>
		)
}

const styles = StyleSheet.create({
	container: {
		padding: 8
	}
})