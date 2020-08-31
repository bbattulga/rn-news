
import AsyncStorage from '@react-native-community/async-storage';


const categories = [
					{selected: true, name: "business"},
					 {selected: true, name: "entertainment"},
					 {selected: true, name: "general"},
					 {selected: true, name: "health"},
					 {selected: true, name: "science"},
					 {selected: true, name: "sports"},
					 {selected: true, name: "technology"},
		 			];

export default class DatabaseSeeder{

	static async seed(){

		await AsyncStorage.setItem('categories', JSON.stringify(categories));
		let k = await AsyncStorage.getItem('API_KEY');
		if (!k){
			await AsyncStorage.setItem('API_KEY', '874d69ff651c41bfb65efbe7c544be12');
		}
		return true;
	}
}