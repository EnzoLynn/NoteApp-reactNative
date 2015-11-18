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
  TouchableHighlight,
  ToolbarAndroid,
  Navigator,
  BackAndroid,
  DrawerLayoutAndroid
} = React;
//var req_url = "https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json";//"http://192.168.100.112:818/data/movies.json";
var req_url = "http://192.168.91.101:818/data/movies.json";
var req_url3000 = "http://192.168.91.101:3000";
var ToolbarTop = require('./toolbar.android.js');
var NoteList = require('./NoteList.android.js');
var _navigator;
BackAndroid.addEventListener('hardwareBackPress', function() {
  console.log('hardwareBackPress');
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop(); 
    return true;
  }
  return false;
});

var NodeApp = React.createClass({
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
    this.fetchData();
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
  goClick: function(e) {
    var me = this;
    console.log('click');
    fetch(`${req_url3000}/login`)
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        } else {
          return {
            dd: 'error'
          };
        }

      })
      .then((responseData) => {
        me.setState({
          dd: responseData.msg1
        });
      }).catch(function(error) {
        me.setState({
          dd: error.message
        });

      }).done();

    //http://192.168.100.112:3000/login
    fetch(`${req_url3000}/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "admin_name": '2',
          "admin_pwd": '2'
        })
      })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        } else {
          return {
            post: 'error'
          };
        }

      })
      .then((responseData) => {
        console.log(responseData.success);
        me.setState({
          post: responseData.msg
        });
      }).catch(function(error) {
        me.setState({
          post: error.message
        });

      }).done();


  },
  RouteMapper: function(route, navigationOperations, onComponentRef) {
    _navigator = navigationOperations;
    if (route.name == 'home') {
      var navigationView = (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
       <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>Hello</Text>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>World!</Text>
    </View>
  );
      return (
        <View style={styles.container1}> 
          <ToolbarTop navigator={_navigator} myico={this.state.movies[0].posters.thumbnail} />
        
          <NoteList />
 <DrawerLayoutAndroid
      drawerWidth={300}
      drawerPosition={DrawerLayoutAndroid.positions.Right}
      renderNavigationView={() => navigationView}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>Hello</Text>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>World!</Text>
      </View>
    </DrawerLayoutAndroid>


          <Text >{this.state.dd} </Text>
          <Text >{this.state.post} </Text>
          <TouchableHighlight style={styles.button} onPress={this.goClick}  underlayColor='#99d9f4'>
            <Text style={styles.buttonText} >Go</Text> 
           </TouchableHighlight>
        </View>
      );
    } else if (route.name == 'story') {
      return (
        <View style={styles.container2}> 
          <ToolbarTop  navigator={_navigator} myico={this.state.movies[0].posters.thumbnail}/>
       
            <NoteList />
          <Text >{this.state.dd} </Text>
          <Text >{this.state.post} </Text>
          <TouchableHighlight style={styles.button} onPress={this.goClick}  underlayColor='#99d9f4'>
            <Text style={styles.buttonText} >Go</Text> 
           </TouchableHighlight>
        </View>
      );
    }
  },
  onActionSelected: function(position) {
    if (position === 0) { // index of 'Settings' 

      if (_navigator.getCurrentRoutes()[1]) {
        _navigator.popToRoute(_navigator.getCurrentRoutes()[1]);
      } else {
        _navigator.push({
          name: 'story',
          index: 1
        });
      }
    } else if (position === 1) {
      _navigator.popToRoute(_navigator.getCurrentRoutes()[0]);
    } else {
      _navigator.popToTop();
    }
  },
  render: function() {
    if (!this.state.movies) {
      return this.renderLoadingView();
    }
    return ( 
      <Navigator 
          style={styles.container1}
          initialRoute={this.state.route}
          configureScene={() => Navigator.SceneConfigs.FadeAndroid}
          renderScene={this.RouteMapper}
        />
    );


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
  toolbar: {
    backgroundColor: '#00a2ed',
    height: 56,
  }
});



AppRegistry.registerComponent('AwesomeProject', () => NodeApp);