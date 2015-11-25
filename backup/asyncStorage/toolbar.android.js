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

 var ToolbarAndroid = require('ToolbarAndroid');
 var Note = require('./myLib/noteModel.js');
 var toolbarTop = React.createClass({
 	onActionSelected: function(position) {
 		var me = this;
 		let navigator = this.props.navigator;
 		if (position === 0) { // index of 'Settings' 

 			if (navigator.getCurrentRoutes()[1]) {
 				navigator.popToRoute(navigator.getCurrentRoutes()[1]);
 			} else {
 				navigator.push({
 					name: 'add',
 					index: 1
 				});
 			}
 		} else if (position === 1) { 
 				var note = new Note();			
    			note.saveNote(me.props.refreshNotes);
 		} else {
 			navigator.popToTop();
 		}
 	},
 	render: function() { 
 		return (
 			<View>
				<ToolbarAndroid					   
	                  title="NoteApp"
	                  titleColor="#000000"
	                  style={styles.toolbar}
	                  actions={[{title: '+', show: 'always'}]}
	                 onActionSelected={this.onActionSelected}  />
             </View>
 		);
 	}
 });
 var styles = StyleSheet.create({
 	toolbar: {
 		backgroundColor: '#48BBEC', 
 		height: 56,
 		fontSize:12,
 		textAlign:'center'
 	}
 });


 module.exports = toolbarTop;