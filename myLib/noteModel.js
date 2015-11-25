 'use strict';
 var React = require('react-native');
 var Guid = require('./guid.js'); //var sign = guid.raw();
 var merge = require('merge');
 var {
 	AsyncStorage
 } = React;

 var STORAGE_KEY = 'noteDatabase';

 function Note(note) {
 	if (note) {
 		this.id = note.id;
 		this.title = note.title;
 		this.content = note.content;
 	};
 };
 Note.prototype.clearNote = function(callback) {
 	AsyncStorage.clear(STORAGE_KEY).then((value) => {
 			if (callback) {
 				callback();
 			};
 		})
 		.catch((error) => console.log('AsyncStorage error: ' + error.message))
 		.done();
 };
 Note.prototype.saveNote = function(note, callback) {
 	AsyncStorage.getItem(STORAGE_KEY).then((value) => {

 			if (value !== null) {

 				note.id = Guid.raw();
 				var arr = JSON.parse(value);
 				arr.push(note);
 				AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
 				if (callback) {
 					callback();
 				};
 			} else {
 				var list = [];
 				AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
 			}
 		})
 		.catch((error) => console.log('AsyncStorage error: ' + error.message))
 		.done();
 };
 Note.prototype.updateNote = function(note, callback) {
 	AsyncStorage.getItem(STORAGE_KEY).then((value) => {
 			var arr = JSON.parse(value);
 			arr.forEach(function(item, index) {
 				if (item.id == note.id) {
 					arr[index] = note; 
 					return false;
 				};
 			});
 			AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
 			if (callback) {
 				callback();
 			};
 		})
 		.catch((error) => console.log('AsyncStorage error: ' + error.message))
 		.done();
 };
 Note.prototype.getNotes = function(callback) {
 	AsyncStorage.getItem(STORAGE_KEY).then((value) => {
 			var arr = JSON.parse(value);
 			callback(arr);
 		})
 		.catch((error) => console.log('AsyncStorage error: ' + error.message))
 		.done();
 };

 Note.prototype.getNoteById = function(id, callback) {
 	AsyncStorage.getItem(STORAGE_KEY).then((value) => {
 			var arr = JSON.parse(value),
 				curNote;
 			arr.forEach(function(item, index) {
 				if (item.id == id) {
 					curNote = item;
 					return false;
 				};
 			});
 			callback(curNote);
 		})
 		.catch((error) => console.log('AsyncStorage error: ' + error.message))
 		.done();
 };
 Note.prototype.delNote = function(id, callback) {

 	AsyncStorage.getItem(STORAGE_KEY).then((value) => {
 			var arr = JSON.parse(value);
 			arr.forEach(function(item, index) {
 				if (item.id == id) {
 					arr.splice(index, 1);
 				};
 			});
 			AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
 			callback(arr);
 		})
 		.catch((error) => console.log('AsyncStorage error: ' + error.message))
 		.done();
 };

 module.exports = Note;