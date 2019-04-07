// The Member model 
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const MemberSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    webName: {
        type: String,
        required: true
    },
    dateJoined: {
        type: Date,
        default: Date.now
    },
    deactivated: {
        type: Boolean,
        default: false
    },
    completedTaskId: [mongoose.Schema.Types.ObjectId],
    appliedTaskId: [mongoose.Schema.Types.ObjectId],
    levelOfExperience: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
    },
    rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
    },
    allRatedReco: Number,
    averageRecoRate: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
    },
    allRatedTasks: Number,
    skills: [{
        type: String
    }]

})
// changed export
const  Member = mongoose.model('members', MemberSchema);
module.exports.Member=Member

function getExpLevel(id) {
    return Member
        .findOne({ _id: id })
        .then(function (member) {
            return member.levelOfExperience;
        })
        .catch(function (err) {
            if (err) throw err
            console.log(err);
        });
}
module.exports.getExpLevel = getExpLevel;




