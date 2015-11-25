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
   DrawerLayoutAndroid
 } = React;

 var Config = require('./Config.js');
 // var req_url = "http://192.168.91.101:818/data/movies.json";
 var test = require('./test.js');
 var pushState = require('./PushState.js');
 // var req_url3000 = "http://192.168.91.101:3000";
 // 

 var NoteList = React.createClass({
   getEvent: function(aa, bb, cc) {
     console.log(aa.nativeEvent);
     console.log(bb);
   },
   onPressIn: function(e, name) {
     pushState.on = true;
     console.log(e.nativeEvent.pageY);
     console.log(name);
   },
   onPressOut: function(e, name) {

     if (pushState.top && pushState.move) {
       console.log(name);

       // fetch(`${Config.req_url3000}/login`)
       //   .then((response) => {})
       //   .then((responseData) => {}).catch(function(error) {}).done();
     } else {
       console.log(pushState.top);
     }
     pushState.on = false;
     pushState.move = false;
     pushState.yArr = [];
   },
   onMoveShouldSetResponder: function(e, name) {
     console.log(e.nativeEvent.pageY);
     pushState.move = true;
     // console.log(name);
     // if (pushState.on) { 
     //    console.log(pushState.yArr);
     //     pushState.yArr.push(event.nativeEvent.locationY);
     // };
   },
   onScroll: function(event) {
     //event.nativeEvent.contentOffset.y
     if (event.nativeEvent.contentOffset.y != 0) {
       pushState.top = false;
     } else {
       pushState.top = true;
     }
   },
   renderNote: function(note) {
     var me = this;

     var content = note.content.length < 20 ? note.content : (note.content.substring(0, 20) + '...');
     if (content.length == 0) {
       content = '无';
     };
     var title = note.title.length > 0 ? note.title : '无';
     return (
       <TouchableWithoutFeedback  
        onPressIn ={(e) => this.onPressIn(e,note.id)}
        onPressOut={(e) => this.onPressOut(e,'out')} 
        delayPressOut={200} 
        >
         <View  style={styles.container}>    
            <TouchableHighlight style={{flex:1}} onPress={()=>this.props.viewNote(note.id)}>     
            <View  >
               <Text style={styles.title}>{title}</Text>
               <Text style={styles.content}>{content}</Text>  
             </View>
             </TouchableHighlight>
             <TouchableHighlight style={styles.button} onPress={()=>this.props.delNote(note.id)}  underlayColor='#99d9f4'>
                <Text style={styles.buttonText} >删除</Text> 
             </TouchableHighlight>   
     		</View>
     
        </TouchableWithoutFeedback>

     );

   },

   componentDidMount: function() {
     var me = this;
   },

   render: function() {

     return (
       <ListView onMoveShouldSetResponder={(e)=>this.onMoveShouldSetResponder(e,'onMoveShouldSetResponder')} 
              onScroll ={(e)=>this.onScroll(e,'onScroll ')} 
              dataSource={this.props.dataSource}
              renderRow={this.renderNote}  
              > 
          </ListView>
     );
   }
 });
 var styles = StyleSheet.create({
   container: {
     flex: 1,
     flexDirection: 'row',
     justifyContent: 'flex-start',
     alignItems: 'center',
     backgroundColor: '#F5FCFF',
   },
   title: {
     fontSize: 20,
     marginBottom: 8,
     textAlign: 'left',
   },
   content: {
     textAlign: 'left',
   },

   listView: {
     paddingTop: 20,
     height: 100,
     backgroundColor: '#F5FCFF',
   },
   button: {
     width: 30,
     flexDirection: 'row',
     backgroundColor: '#48BBEC',
     borderColor: '#48BBEC',
     borderWidth: 1,
     borderRadius: 8,
     marginBottom: 10,
     marginRight: 20,
     alignSelf: 'center',
     justifyContent: 'flex-end'
   },
   buttonText: {
     fontSize: 14,
     color: 'white',
     alignSelf: 'center'
   },
 });
 module.exports = NoteList;