import React, { Component } from 'react';
import firebase from 'firebase';
import config from './FbConfig';
import { Widget ,addResponseMessage,addUserMessage } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';
firebase.initializeApp(config);


class Chat extends Component {
  constructor(props){
    super(props);
    this.state={
      messageCount:0,
      chatId:0,
      messagesFetchingDone:false,
      userId:10
    }
  this.setChatObserver=this.setChatObserver.bind(this)
  }

  setChatObserver(chatID){
    var starCountRef = firebase.database().ref('/testchat/' + '/'+chatID);
    let newCount=this.state.messageCount;
    let userId=this.state.userId;
    let otherUserSentFlag=false;
    var alreadyfetchedList=[];
starCountRef.on('value', function(snapshot) {
  snapshot.forEach((child) => {
    if(child.key>newCount-1){
      console.log(child.key, child.val().sender); 
      if(child.val().sender!=userId){
     
        if(!alreadyfetchedList.includes(child.val().message)){
          addResponseMessage(child.val().message)
          alreadyfetchedList.push(child.val().message)
          otherUserSentFlag=true
        }
       
      }

    }
  
  });
  
});
if(!otherUserSentFlag){
  this.setState({messageCount:newCount+1})
  otherUserSentFlag=false
}
  }
  getMessagesFromChat(chatID,count){
      firebase.database().ref('/testchat/' + '/'+chatID+'/'+count).once('value').then(
        (snapshot)=>{
          if(snapshot.exists()){
          
            if(snapshot.val().sender===this.state.userId){
              addUserMessage(snapshot.val().message)
              const newCount=count+1
              this.setState({messageCount:newCount})
              this.getMessagesFromChat(chatID,newCount)
            }
            else{
              addResponseMessage(snapshot.val().message)
              const newCount=count+1
              this.setState({messageCount:newCount})
              this.getMessagesFromChat(chatID,newCount)

            }
           
          }
          else{
            this.setChatObserver(chatID)
          }
      })
    
    
     

  }
  getchat(userID){
    const ref = firebase.database().ref('testchat');
    var chatFound=false;
    
    ref.once('value').then((snapshot) => {
      snapshot.forEach((child)=>{
        if(child.val().userOneID===userID||child.val().userTwoID===userID){
          this.setState({chatId:child.key})
          this.getMessagesFromChat(child.key,0)
          chatFound=true
        }
     
     

});
if(!chatFound){
  chatFound=false
  this.initnewChat(10,20)
}

})}
  componentDidMount() {
  
     this.getchat(this.state.userId)
    
    
  }
  handleNewUserMessage = (newMessage) => {
    // Now send the message throught the backend API
    this.addMessageToFirebase(newMessage,this.state.userId)
  }

  addMessageToFirebase(message,sender){
    var postData = {
      message: message,
       sender: sender
    };
    var updates = {};
    updates['/testchat/' + this.state.chatId+'/'+this.state.messageCount] = postData;
    firebase.database().ref().update(updates);
    let newCount=this.state.messageCount;
    this.setState({
      messageCount:newCount+1
    })
  }


  initnewChat(userId, userTwoId) {
 
  var postData = {
    userOneID: userId,
    userTwoID: userTwoId
  };
  var newPostKey = firebase.database().ref().child('testchat').push().key;
  this.setState({chatId:newPostKey})
  var updates = {};
  updates['/testchat/' + newPostKey] = postData;
   firebase.database().ref().update(updates);
   this.getMessagesFromChat(newPostKey,0)
  }
  render() {
    return (
     
      <div className="App">
      <Widget
       title="The great chat"
       subtitle="This chat is working greattt"
          handleNewUserMessage={this.handleNewUserMessage}
        />
    
      </div>
    );
  }
}

export default Chat;
