//1WT
// Dependencies
const express = require('express')
const router = express.Router()
const Joi = require('joi')


// Models
const Post = require('../../models/Post.js')
const postValidator = require('../../validations/postValidations')

const Notification = require('../../models/Notification.js')
const User = require('../../models/User.js')
const Platform = require('../../models/Platform')


//get all courseRequest
router.get('/', async (req, res) => {
    const posts = await Post.find()
    res.json({ data: posts })
})

//get Certin courseRequest
router.get('/:id', async (req, res) => {
    const id = req.params.id
    const post = await Post .findOne({ _id: id })
    res.json({ msg: ' Post successfully', data: post })

})

// Create a courseRequest
router.post('/', async (req, res) => {
    try {
        const isValidated = postValidator.createValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        req.body.uplaodDate=new Date().toJSON()
        const newPost = await Post.create(req.body)
        const user = await User.findOne({ _id: req.body.applyingMemberId })
        if (user.posts == undefined) user.posts = []
        user.posts.push({
            id: newPost._id,
            name:newPost.content,
            date:new Date().toJSON()
        })
        user.save()
          await Platform.create({
            tags: ['Member'],
            type: 'Post',
            date: new Date().toJSON(),
            owner: {
                id: req.body.applyingMemberId ,
                name: user.memberFullName
            },
            data: {
                id: newPost._id,
                name: newPost.content,
            },
            description:newPost.content

        })
        res.json({ msg: 'post was created successfully', data: newPost })
    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
})

// Update a post
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const post = await Post.findOne({ _id: id })
        if (!post) return res.status(404).send({ error: 'post does not exist' })
        const isValidated = postValidator.updateValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const uPost = await Post.findOneAndUpdate({ _id: id }, req.body)
        res.json({ msg: 'Post updated successfully', data: uPost })
    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
})
//Delete an Post
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deletePost = await Post.findOneAndRemove({ '_id': id })
        res.json({ msg: 'Post was deleted successfully', data: deletePost })
    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
})

//give reco
//1
router.put('/giveComment/:id', async (req, res) => {
    try {
        const id = req.params.id
        const memberId = req.body.memberId
        const schema = {
            content: Joi.string().required(),
            memberId: Joi.string().required(),
        }
        console.log('here')

        const result = Joi.validate(req.body, schema)
        if (result.error ) return res.status(400).send(result.error.details[0].message)
        const member = await User.findOne({ _id: memberId})
            const post = await Post.findById(id)

            if (post) {
                    post.comments.push({
                        member: {
                            id: member._id,
                            name: member.memberFullName
                        },
                        content: req.body.content,
                    })
                    Notification.sendCourseRecommendationsNotification(req.body.content, memberId._id, '%od elcourse dah yalaaa')
                    post.save()
                    return res.status(200).send('Done')
            }
            else return res.send({error :'Not Post'})
            
    }
    catch (error) {
        console.error(error)
        res.status(404).send('Not found')
    }

})
// rating a recomendations
router.put('/ratePost/:id', async (req, res) => {
    try {
        const id = req.params.id
        const rating = req.body.rating
        const reviewerId = req.body.reviewerId
        const schema = {
            rating: Joi.number().valid(0,1, 2, 3, 4, 5).required(),
            reviewerId: Joi.string().required()
        }
        const result = Joi.validate(req.body, schema)
        if (result.error) return res.status(400).send({ error: result.error.details[0].message })

        const post = await Post.findById(id)
        const member = await User.findById(reviewerId)
        if(!member) return res.status(404).send({error:'There is no such member'})
        if (post) {
            post.reacts=post.reacts.filter((react)=>react.member.id!=reviewerId)
            post.reacts.push({
                member:{
                    id:reviewerId,
                    name:member.memberFullName
                },
                rating:rating
            })
            post.save()
            res.status(200).send('Done')        
        }else{
            res.status(404).send('Not Found')

        }
    } catch (error) {
        res.status(404).send(error)

    }
})


module.exports = router