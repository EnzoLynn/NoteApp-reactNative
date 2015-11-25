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
     BackAndroid,
     TextInput,
     ToolbarAndroid
 } = React;
 var Dimensions = require('Dimensions');
 var ToolbarAndroid = require('ToolbarAndroid');
 var AddNoteForm = React.createClass({
     getInitialState: function() {
         return {
             id:'',
             title: '',
             content: ''
         };
     },
     setTitle: function(text) {
         if (text.length < 21) {
             this.setState({
                 title: text
             });
         };

     },
     componentDidMount: function() {
         var curNote = this.props.curNote;
         if (curNote) {
             this.setState({
                 id:curNote.id,
                 title: curNote.title,
                 content: curNote.content
             });
         };
     },
     render: function() {

         return (
             <View > 
             
 				<Text style={styles.titleText}>
       				 标题： 
     			 </Text>

				<TextInput
				    style={styles.textInput} 
				    onChangeText={(text) => this.setTitle(text)}
    				value={this.state.title} 
    				placeholder ='请输入标题'                     
                    textAlignVertical='top'
                    autoFocus={true}
				  />
				  <Text style={styles.titleText}>
       				 内容：
     			 </Text>

				<TextInput
				    style={styles.multiInput} 
				    onChangeText={(text) => this.setState({content:text})}
    				value={this.state.content} 
    				multiline={true}
    				placeholder ='请输入内容'
    				textAlign='start'
    				textAlignVertical='top'
				  /> 
                  <View style={styles.container}>
                         <TouchableHighlight style={styles.button} onPress={()=>this.props.addNote(this.state)}  underlayColor='#99d9f4'>
                            <Text style={styles.buttonText} >保存</Text> 
                         </TouchableHighlight>  

                          <TouchableHighlight style={styles.button} onPress={()=>this.props.backHome()}  underlayColor='#99d9f4'>
                            <Text style={styles.buttonText} >返回</Text> 
                         </TouchableHighlight>  
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
     titleText: {
         height: 20,
         fontSize: 14,
         color: 'black',
         fontWeight: 'bold',
     },
     textInput: {
         fontSize: 14,
         height: 36,
         backgroundColor: '#EDEBEB'
     },
     multiInput: {
         fontSize: 14,
         height: Dimensions.get('window').height - 166,
         backgroundColor: '#EDEBEB'
     },
     buttonText: {
         fontSize: 18,
         color: 'white',
         alignSelf: 'center'
     },
     button: {
         height: 30,
         width: 100,
         flexDirection: 'row',
         backgroundColor: '#48BBEC',
         borderColor: '#48BBEC',
         borderWidth: 1,
         borderRadius: 8,
         marginRight: 10,
         alignSelf: 'stretch',
         justifyContent: 'center'
     },
 });


 module.exports = AddNoteForm;