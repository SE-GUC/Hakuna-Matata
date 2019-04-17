async function answer(Qarr,replay,oldQuestion){
    if(perOfWordMatch(replay,"yes")===100){
        let questionsAndAnswer=await QuestionsAndAnswers.find({"Questions":{$in :[Qarr[0]]}})
        return questionsAndAnswer.answer;

    
    }else{
        if(perOfWordMatch(sentance,"no")===100){
            Qarr.splice(0,1)
            if(Qarr.length===0){
                await UnKownQuestion.create(oldQuestion)
                return "Sorry u Should wait I dont have answer to ur Question"
            }
            else
                return Qarr[0]
        }else{
            return "ENTER YES or NO"
        }
    }
}

async function bestMatch( sentance){
var wordsArr=sentance.split(" ")
var dataBaseArr=await QuestionsAndAnswers.find()
var returnarr=[]

for(var i=0;i<dataBaseArr.length;i++){
    var count=0    
    for(var j=0; j<dataBaseArr[i].Questions.length ;j++){
        for(var z=0; z<dataBaseArr[i].Questions[j].length;z++){
        if(perOfWordMatch(dataBaseArr[i].Questions[j][z],wordsArr[w])>=75){
            count++
            w++
        }
        else{
            for(var m=w;m<wordsArr.length;m++){
                if(perOfWordMatch(dataBaseArr[i].Questions[j][z],wordsArr[m])>=75){
                    count++
                    w++
                    break
                }
            }
        }
    }
    if((count/dataBaseArr[i].Questions[j].length)>=75){
        returnarr.push(dataBaseArr[i].Questions[j])
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
  for(var i=0;i<DBWord.length;i++){
    if(DBWord[i]===word[j]){
        count++
        j++
    }
    else{
        for(var x=j;x<word.length;x++){
            if(word[i]===DBWord[x]){
                count++
                j++
                break
            }
        }
    }
  }
  return (count)/DBWord.length

}

module.exports.answer=answer;
module.exports.perOfWordMatch=perOfWordMatch;
module.exports.bestMatch=bestMatch;