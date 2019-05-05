const mongoose = require('mongoose');
const Schema = mongoose.Schema
const UnkownQuestionSchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    question: {
        type: String,
    }

});
const QuestionsAndAnswerSchema = new Schema({
    questions: {
        type: [String]
    },
    answer: {
        type: String,
    }
})

const QuestionsAndAnswer= mongoose.model('questionsAndAnswers', QuestionsAndAnswerSchema)
module.exports.QuestionsAndAnswer = QuestionsAndAnswer
const UnKownQuestion= mongoose.model('unkownQuestions', UnkownQuestionSchema)
module.exports.UnKownQuestion= UnKownQuestion 

async function bestMatch( sentance){
var wordsArr=sentance.split(" ")
var dataBaseArr=await QuestionsAndAnswer.find()
var returnarr=[]
var w=0
for(let i=0;i<dataBaseArr.length;i++){
    var count=0    
    for(let j=0; j<dataBaseArr[i].questions.length ;j++){
        for(let z=0; z<dataBaseArr[i].questions[j].split(" ").length && w<wordsArr.length;z++){
        if(perOfWordMatch(dataBaseArr[i].questions[j].split(" ")[z],wordsArr[w])>=75){
            count++
            w++
        }
        else{
            for(let m=w;m<wordsArr.length;m++){
                if(perOfWordMatch(dataBaseArr[i].questions[j].split(" ")[z],wordsArr[m])>=75){
                    count++
                    w++
                    break
                }
            }
        }
    }
    w=0
    if((count/dataBaseArr[i].questions[j].split(" ").length)>=0.75){
        returnarr.push(dataBaseArr[i].questions[j])
    }
    count=0
    }
}
return returnarr
}
function perOfWordMatch(word,DBWord){
  var count=0;
  var j=0;
  //var Done=false
  
  for(let i=0;i<DBWord.length&j<word.length;i++){
    if(DBWord[i] != undefined) DBWord[i]=DBWord[i].toLowerCase()
    if(word[i] != undefined) word[i]=word[i].toLowerCase()      
    if(DBWord[i]===word[j]){
        count++
        j++
    }
    else{
        for(let x=j;x<word.length;x++){
            if(word[i]===DBWord[x]){
                count++
                j++
                break
            }
        }
    }
  }
  //console.log()
  return ((count)/DBWord.length) *100

}

// module.exports.answer=answer;
module.exports.perOfWordMatch=perOfWordMatch;
module.exports.bestMatch=bestMatch;