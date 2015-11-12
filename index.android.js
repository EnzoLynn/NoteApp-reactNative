/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var React = require('react-native');
var test = require('./test.js');
var merge = require('merge');
var {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight
} = React;
//var req_url = "https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json";//"http://192.168.100.112:818/data/movies.json";
var req_url = "http://192.168.100.112:818/data/movies.json";

var AwesomeProject = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      movies: null,
      dd: test
    };
  },
  componentDidMount: function() {
    var me = this;
    me.fetchData();
    // setTimeout(function() {
    //   fetch('http://192.168.100.112:3000/login')
    //     .then((response) => response.json())
    //     .then((responseData) => {
    //       me.setState({
    //         dd: responseData.msg1
    //       });
    //     })
    //     .done();

    // }, 2000)


  },
  fetchData: function() {
    console.log(123123);
    fetch(req_url)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState({
          movies: responseData.data,
          dataSource: this.state.dataSource.cloneWithRows(responseData.data),
          loaded: true //,
            //dd: test

        });
      })
      .done();
  },
  goClick:function(e){
    var me = this;
    console.log('click');
    fetch('http://192.168.100.112:3000/login')
        .then((response) => response.json())
        .then((responseData) => {
          me.setState({
            dd: responseData.msg1
          });
        })
        .done();
  },
  render: function() {
    if (!this.state.movies) {
      return this.renderLoadingView();
    }

    return (
      <View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderMovie}
            style={styles.listView}
          >


            
          </ListView>
          <Text >{this.state.dd} </Text>
          <TouchableHighlight style={styles.button} onPress={this.goClick}  underlayColor='#99d9f4'>
            <Text style={styles.buttonText} >Go</Text> 
           </TouchableHighlight>
        </View>
    );


  },
  renderLoadingView: function() {
    return (
      <View style={styles.container}>
          <Text>
            Loading movies...
          </Text>
        </View>
    );

  },
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

  }
});

var styles = StyleSheet.create({
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
    height: 81
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});



AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);