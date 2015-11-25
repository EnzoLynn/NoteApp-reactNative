/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
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
  BackAndroid,
  TouchableWithoutFeedback,
  AsyncStorage,
  ToastAndroid
} = React;

var Config = require('./Config.js');
var STORAGE_KEY = 'noteDatabase';
var ToolbarTop = require('./toolbar.android.js');
var NoteList = require('./NoteList.android.js');
var AddNoteForm = require('./addNoteForm.android.js');
var Note = require('./myLib/noteModel.js');
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

      route: {
        name: 'home',
        index: 0
      }
    };
  },
  componentDidMount: function() {
    var me = this;
    me.refreshNotes();
  },
  backHome:function(){
      _navigator.popToTop();
  }, 
  refreshNotes: function() {
    var me = this;
    var note = new Note();
    note.getNotes(function(notes) {
      me.setState({
        dataSource: me.state.dataSource.cloneWithRows(notes),
      });
    });
  },
  delNote: function(id) {
    var me = this;
    var note = new Note();
    note.delNote(id, function(notes) {
      me.setState({
        dataSource: me.state.dataSource.cloneWithRows(notes),
      });
    });
  },
  addNote:function(noteModel){
    var me = this;
    var note = new Note(); 
    if (noteModel.id != '') {
       note.updateNote(noteModel,function(){ 
        me.backHome();
        me.refreshNotes();
    });
    }else{
       note.saveNote(noteModel,function(){ 
        me.backHome();
        me.refreshNotes();
    });
    }
   
  },
  viewNote:function(id){
    var me = this;
    var note = new Note(); 
    console.log(1232);
    note.getNoteById(id,function(noteModel){ 
        _navigator.push({
          name: 'add',
          index: 1,
          note:noteModel
        });
    });
  },
  RouteMapper: function(route, navigationOperations, onComponentRef) {
    _navigator = navigationOperations;
    var style = styles.container1;
    if (route.name == 'home') {
      var views = (
        <View style={style}>
          <ToolbarTop navigator={_navigator} refreshNotes={this.refreshNotes} /> 
          <NoteList dataSource={this.state.dataSource} delNote={this.delNote} viewNote={this.viewNote}/>         
      </View>

      );
      return ({
        views
      });

    } else if (route.name == 'add') {
      style = styles.container;
      var views = (
        <View >
          <AddNoteForm style={style} addNote={this.addNote} backHome={this.backHome} curNote={route.note}/>  
        </View>

      );
      return ({
        views
      });
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
            Loading Notes...
          </Text>
        </View>
    );

  },

});

var styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#F5FCFF',
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

  toolbar: {
    backgroundColor: '#00a2ed',
    height: 56,
  }
});



AppRegistry.registerComponent('AwesomeProject', () => NodeApp);