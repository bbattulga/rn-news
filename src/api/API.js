// news are filtered by category subscriptions
// https://newsapi.org/docs


import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';


const urlNew = 'http://newsapi.org/v2/top-headlines';
const urlSearch = 'http://newsapi.org/v2/everything';
const urlSources = 'http://newsapi.org/v2/sources';


// basic functions
export const fetchApiKey = async () => {
	let key = await AsyncStorage.getItem('API_KEY');
	return key;
}

const fetchUrl = async (url) => {
	let response;
	try{
		response = await axios.get(url);
	}catch(err){
		console.log(err);
		return null;
	}
	return response.data;
}

export const fetchSources = async (categoryName = '') => {
	let apiKey = await fetchApiKey();
	let data = await fetchUrl(`https://newsapi.org/v2/sources?apiKey=${apiKey}`);
	return data.sources.slice(0, 10);
}

// query strings are encapsulated in objects 
const fetchNews = async (defaults, query) => {
	let apiKey = await fetchApiKey();
	query = {...defaults, ...query};
	// param cannot be null
	let url = `${urlNew}?apiKey=${apiKey}`;
	const fields = Object.keys(query);
	for (let i=0; i<fields.length; i++){
		url += `&${fields[i]}=${query[fields[i]]}`;
	}
	let data = await fetchUrl(url);
	return data;
}

// provide default values for queryObj
const topDefault = {
	category: '',
	sources: '',
	q: '',
	pageSize: 20,
	language: 'en'
}

export const fetchTopNews = async (queryObj) => {
	let data = await fetchNews(topDefault, queryObj);
	return data;
}

export const fetchNewsBySources = async (sourceIds) => {
	let sources = '';
	if (typeof sourceIds === 'string')
		sources = sourceIds;
	else{
		for (let i=0; i<sourceIds.length; i++){
			sources += `,${sourceIds[i]}`;
		}
	}
	let query = {
		sources
	};
	let data = await fetchNews(query);
	return data;
}
/*
check https://newsapi.org/docs/endpoints/everything for advanced search
*/
const searchDefaults = {
	q: '',
	qInTitle: '',
	sources: '',
	domains: '',
	excludeDomains: '',
	language: 'en',
	sortBy: 'publishedAt',
	pageSize: 20
}

export const searchNews = async (searchObj) => {
	let data = await fetchNews(searchDefaults, searchObj);
	return data;
}

export const fetchCategories = async () => {
	let result = await AsyncStorage.getItem('categories');
	return JSON.parse(result);
}

export const subscribeCategory = async (categoryObj) => {
	let categories = await AsyncStorage.getItem('categories');
	categories.push(categoryObj);
	try{
		await AsyncStorage.setItem(JSON.stringify(categories));
	}catch(err){
		console.log(err);
		return null;
	}
	return categoryObj;
}