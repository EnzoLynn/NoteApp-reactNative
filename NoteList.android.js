 'use strict';
 var React = require('react-native');

 var {
 	AppRegistry,
 	Image,
 	StyleSheet,
 	Text,
 	View,
 	ListView,
 	TouchableHighlight,
 	ToolbarAndroid,
 	Navigator,
 	BackAndroid
 } = React;
 var req_url = "http://192.168.91.101:818/data/movies.json";
 var test = require('./test.js');
 var NoteList = React.createClass({
 	renderMovie: function(movie) {

 		return (

 			<View style={styles.container}> 
            <Image
              source={{uri: movie.posters.thumbnail}}
              style={styles.thumbnail}
            />
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{movie.title} nn</Text>
              <Text style={styles.year}>{movie.year}</Text>
             
            </View>
          </View>


 		);

 	},
 	getInitialState: function() {
 		return {
 			dataSource: new ListView.DataSource({
 				rowHasChanged: (row1, row2) => row1 !== row2,
 			}),
 			loaded: false,
 			movies: null,
 			dd: `${test} init`,
 			post: 'loading...',
 			route: {
 				name: 'home',
 				index: 0
 			},
 			routeIndex: 0
 		};
 	},
 	componentDidMount: function() {
 		var me = this;
 		me.fetchData();
 	},
 	fetchData: function() {
 		fetch(req_url)
 			.then((response) => response.json())
 			.then((responseData) => {
 				this.setState({
 					movies: responseData.data,
 					dataSource: this.state.dataSource.cloneWithRows(responseData.data),
 					loaded: true
 				});
 			})
 			.done();
 	},
 	renderLoadingView: function() {
 		return (
 			<View style={styles.container} >
          <Text>
            Loading movies...
          </Text>
        </View>
 		);

 	},
 	render: function() {
 		if (!this.state.movies) {
 			return this.renderLoadingView();
 		}
 		return (
 			<ListView
	            dataSource={this.state.dataSource}
	            renderRow={this.renderMovie} 
	            style={styles.listView}> 
          </ListView>
 		);
 	}
 });
 var styles = StyleSheet.create({
 	container1: {
 		flex: 1,
 		backgroundColor: '#00a2ed',
 		flexDirection: 'column',
 	},
 	container2: {
 		flex: 1,
 		height: 56,
 		backgroundColor: '#39ED00',
 		flexDirection: 'column',
 	},
 	container: {
 		flex: 1,
 		flexDirection: 'row',
 		justifyContent: 'center',
 		alignItems: 'center',
 		backgroundColor: '#F5FCFF',
 	},
 	title: {
 		fontSize: 20,
 		marginBottom: 8,
 		textAlign: 'center',
 	},
 	year: {
 		textAlign: 'center',
 	},
 	listView: {
 		paddingTop: 20,
 		backgroundColor: '#F5FCFF',
 	},
 	thumbnail: {
 		width: 53,
 		height: 81,
 		borderWidth: 1,
 		borderColor: 'red'
 	}
 });
 module.exports = NoteList;