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
      senderID:props.senderID,
      recieverID:props.recieverId
    }
  this.setChatObserver=this.setChatObserver.bind(this)
  }

  setChatObserver(chatID){
    var starCountRef = firebase.database().ref('/testchat/' + '/'+chatID);
    let newCount=this.state.messageCount;
    let userId=this.state.senderID;
    let otherUserSentFlag=false;
    var alreadyfetchedList=[];
starCountRef.on('value', function(snapshot) {
  snapshot.forEach((child) => {
    if(child.key>newCount-1){
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
          
            if(snapshot.val().sender===this.state.senderID){
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
  getchat(){
    const ref = firebase.database().ref('testchat');
    var chatFound=false;
    
    
    ref.once('value').then((snapshot) => {
      snapshot.forEach((child)=>{
        if(child.val().userOneID===this.state.senderID && child.val().userTwoID===this.state.recieverID){
          console.log("first if"+child.key);
          this.setState({chatId:child.key})
          this.getMessagesFromChat(child.key,0)
          chatFound=true
        }
        if(child.val().userOneID===this.state.recieverID && child.val().userTwoID===this.state.senderID){
          console.log("second if"+child.key);
          this.setState({chatId:child.key})
          this.getMessagesFromChat(child.key,0)
          chatFound=true
        }
     
     

});
if(!chatFound){
  chatFound=false
  this.initnewChat(this.state.senderID,this.state.recieverID)
}

})}
  componentDidMount() {
  
     this.getchat()
    
    
  }
  handleNewUserMessage = (newMessage) => {
    // Now send the message throught the backend API
    this.addMessageToFirebase(newMessage,this.state.senderID)
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
