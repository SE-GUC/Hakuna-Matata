const express = require('express');
const router = express.Router();
const Joi = require('joi');

const { QuestionsAndAnswer, UnKownQuestion, bestMatch } = require('../../models/ChatBot');
const User = require('../../models/User')

router.post('/', async (req, res) => {
    try {
        const schema = {
            questions: Joi.array().required(),
            answer: Joi.string()
        }
        const result = Joi.validate(req.body, schema);
        if (result.error) return res.status(400).send({ error: result.error.details[0].message })
        const questionsAndAnswer = await QuestionsAndAnswer.create(req.body)
        res.send(questionsAndAnswer);
    } catch (error) {
        // We will be handling the error later
        res.status(404).send('Not found')
    }

})

router.get('/', async (req, res) => {
    try {
        const questionsAndAnswers = await QuestionsAndAnswer.find()
        if (!questionsAndAnswers) return res.status(404).send({ error: 'questionsAndAnswers do not exist' })
        res.send(questionsAndAnswers);
    }
    catch (error) {
        res.status(404).send('Not found')
    }

})
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const questionsAndAnswer = await QuestionsAndAnswer.findById(id);
        if (!questionsAndAnswer) return res.status(404).send({ error: 'questionsAndAnswer does not exist' })
        res.send(questionsAndAnswer)
    }
    catch (error) {
        res.sendStatus(404)
    }
})
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const schema = {
            question: Joi.array().required(),
            answer: Joi.string()
        }
        const result = Joi.validate(req.body, schema);
        if (result.error) return res.status(400).send({ error: result.error.details[0].message })
        await QuestionsAndAnswer.findOneAndUpdate({ _id: id }, req.body)
        const questionsAndAnswer = await QuestionsAndAnswer.findById(id)
        if (!questionsAndAnswer) return res.status(404).send({ error: 'questionsAndAnswer does not exist' })
        res.send(questionsAndAnswer)

    } catch (error) {
        // We will be handling the error later
        res.status(404).send('Cannot find it ')
    }

})

// Delete Room
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const questionsAndAnswer = await QuestionsAndAnswer.findByIdAndRemove(id)
        res.send(questionsAndAnswer)
    }
    catch (error) {
        res.status(404).send('Cannot find it ')
    }
})
router.put('/Question/:id', async (req, res) => {
    try {
        const id = req.params.id
        const index = req.body.index
        const newQuestion = req.body.newQuestion
        const newAnswer = req.body.newAnswer
        const schema = {
            newQuestion: Joi.string(),
            newAnswer: Joi.string()
        }
        const result = Joi.validate(req.body, schema);
        if (result.error) return res.status(400).send({ error: result.error.details[0].message })
        const questionsAndAnswer = await QuestionsAndAnswer.findById(id)
        if (!questionsAndAnswer) return res.status(404).send({ error: 'questionsAndAnswer does not exist' })
        if (newQuestion.length > 0) {
            if (index > 0) questionsAndAnswer.questions.splice(index, 1)
            questionsAndAnswer.questions.push(newQuestion)
        } else {
            newQuestion.answer = newAnswer
        }
        questionsAndAnswer.save()
        res.send(questionsAndAnswer)


    } catch (error) {
        // We will be handling the error later
        res.status(404).send('Cannot find it ')
    }

})
router.post('/Question/:id', async (req, res) => {
    const userId=req.params.id
    const question = req.body.question
        const schema = {
            question: Joi.string().required()
        }
        const result = Joi.validate(req.body, schema);
        if (result.error) return res.status(400).send({ error: result.error.details[0].message })
        const user = await User.findById(userId)
        if (!user) return res.status(404).send({ error: 'user does not exist' })
        if(question.toLowerCase()=="yes"||question.toLowerCase()=="no"){
            if(question.toLowerCase()=="yes"){
                if(user.lastQuestionMatches.length>0){
                    const lastQuestion=user.lastQuestionMatches[0]
                    const questionsAndAnswer = await QuestionsAndAnswer.findOne({questions :lastQuestion})
                    const answer = questionsAndAnswer.answer
                    user.lastQuestionMatches=[]

                    user.chatBot.push({
                        send:true,
                        message:question,
                        date:new Date().toJSON()
                    })
                    user.chatBot.push({
                        send:false,
                        message:answer,
                        date:new Date().toJSON()
                    })
                    user.save()
                    
                    return res.send(answer)
                }else{
                    user.chatBot.push({
                        send:true,
                        message:question,
                        date:new Date().toJSON()
                    })
                    user.chatBot.push({
                        send:false,
                        message:"yes on what ! A7na hnst3bt",
                        date:new Date().toJSON()
                    })
                    user.save()
                    return res.send("yes on what ! A7na hnst3bt ")
                }
            }
            if(user.lastQuestionMatches.length>1){
                user.lastQuestionMatches.splice(0,1)
                const replay=("Do You mean: ").concat(user.lastQuestionMatches[0])

                user.chatBot.push({
                    send:true,
                    message:question,
                    date:new Date().toJSON()
                })
                user.chatBot.push({
                    send:false,
                    message:replay,
                    date:new Date().toJSON()
                })
                user.save()
                
                return res.send(replay)
            }else{
                if(user.lastQuestionMatches.length==1){
                    user.lastQuestionMatches.splice(0,1)
                    const replay="Sorry For Not Helping you but sure an admin will replay to your Question as soon as possible "    
                    user.chatBot.push({
                        send:true,
                        message:question,
                        date:new Date().toJSON()
                    })
                    user.chatBot.push({
                        send:false,
                        message:replay,
                        date:new Date().toJSON()
                    })
                    await UnKownQuestion.create({id:user._id,
                        question:user.currQuestion})
                    user.save()
                    
                    return res.send(replay)
                }
                user.chatBot.push({
                    send:true,
                    message:question,
                    date:new Date().toJSON()
                })
                user.chatBot.push({
                    send:false,
                    message:"no on what ! A7na hnst3bt",
                    date:new Date().toJSON()
                })
                user.save()
                return res.send("no on what ! A7na hnst3bt ")
            }

        }else{
        
            const questions=await bestMatch(question)
            user.currQuestion=question
            user.lastQuestionMatches=questions
            if(questions==0){
                const replay="Sorry For Not Helping you but sure an admin will replay to your Question as soon as possible "    
                user.chatBot.push({
                    send:true,
                    message:question,
                    date:new Date().toJSON()
                })
                user.chatBot.push({
                    send:false,
                    message:replay,
                    date:new Date().toJSON()
                })
                await UnKownQuestion.create({
                    id:req.params.id,
                    question: question})
                user.save()
                
                return res.send(replay)
            }
            const replay=("So,Do You mean: ").concat(questions[0])
            user.chatBot.push({
                send:true,
                message:question,
                date:new Date().toJSON()
            })
            user.chatBot.push({
                send:false,
                message:replay,
                date:new Date().toJSON()
            })
            user.save()
            
            return res.send(replay)

        }
       


})
module.exports = router