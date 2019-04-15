const mongoose = require('mongoose')
const Schema = mongoose.Schema
// Displayed info better than repeate it agine in each array
const InfoSchema = new Schema({

    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    name: {
        type: String,
    },
    date:{
        type:Date
    }

},{ _id : false });
// reservation Schema
const ReservationSchema = new Schema({
    slot:{
        type:String,
        //required:true,
        //can i do that (make it enume and check on it or handel it in front end )
        // enum: slots.get()
    },
    reservationDate:{
        type:Date,
        //required:true
    },
    reserver:{
        type:InfoSchema,
       // required:true
    },
    isAccpted:{
        type:Boolean,
        default:false
       // required:true
    },
},{ _id : false })
//Room for coworkingSpace
const RoomSchema = new Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId
    },
    capacity: {
        type: Number,
        required: true
    },
    slots: {
        type: [String]
    },
    reviews: [{
        reviewers: {
            type: InfoSchema,
         //   required: true
        },
        comments: {
            type: InfoSchema,
            //required: true
        }
    }],
    reservations:[ReservationSchema]
    

},{ _id : false });

// Skill Schema
const SkillSchema = new Schema({
    name: {
        type: String,
        //required: true
    }
},{ _id : false })

// TrainingProgram Schema 
const TrainingProgramSchema = new Schema({
    name: {
        type: String
    },
    trainer:[InfoSchema],
    description: {   
        type: String
    },
    type: {
        type: String
    },
    duration: {
        type: String
    },
    applyDueDate: {
        type: Date
    },
    startDate: {
        type:Date
    },
    requiredSkills: {
        type: [SkillSchema]
    }
})

// Create the schema
const UserSchema = new Schema({
    tags: {
        type: [String],
        required: false,
        enum: ['Partner', 'Member', 'ConsultancyAgency', 'CoworkingSpace', 'EducationOrganization']
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
 
    emailVerified: {
        type: Boolean,
        default: false
    },
    dateOfBirth:{
        type:Date
    },
    age:{
        type:Number
    },
    deactivated: {
        type: Boolean,
        default: false
    },
    //ConsultancyAgency

    consultancyAgencyName: {
        type: String
    },
    consultancyAgencyManager: {
        type: String,
        required: false
    },
    consultancyAgencyRate: {
        type: Number
    },
    consultancyAgencyLocation:{
        type:[String]
    },
    consultancyAgencyPhoneNumber: {
        type: String,
        required: false
    },
    consultancyAgencyPartners: [InfoSchema],
    consultancyAgencyMembers: [InfoSchema],
    consultancyAgencyEvents: [InfoSchema],
    consultancyAgencyAppliedInPorjects: [InfoSchema],
    consultancyAgencyAppliedInTasks: [InfoSchema],
    consultancyAgencyAcceptedInPorjects: [InfoSchema],
    consultancyAgencyAcceptedInTasks: [InfoSchema],
    consultancyAgencyReports: {
        type: [
            {
                info: {
                    type: String,
                  //  required: true,
                },
                postDate: {
                    type: Date,
                    //required: true,
                }
            }
        ]
    },
    consultancyAgencyRevenues: {
        type: Number,
        required: false
    },
    consultancyAgencyRevenuePerEmployee: {
        type: Number,
        required: false
    },  
    consultancyAgencyFiscalYear: {
        type: Date,
        //required: true
    },
    consultancyAgencyHeadquarters: {
        type: String,
        required: false
    },
    consultancyAgencyOffers: {
        type: [String],
        required: false
    },
    consultancyAgencyDateJoined: {
        type: Date,
        //default: Date.now
    },
    consultancyAgencyVerified: {
        type: Boolean,
        default: false
    },
    //End ConsultancyAgency

    //Member
    memberFullName: {
        type: String,
       // required: true
    },
    memberWebName: {
        type: String,
        //required: true
    },

    memberLocation:{
        type:String
    },
    memberDateJoined: {
        type: Date,
        // default: Date.now
    },
    memberPhoneNumber: {
        type: String,
        required: false
    },
  
    isExpert: {
        type: Boolean,
        default: false
    },
    completedTasks: [InfoSchema],
    acceptedInTasks: [InfoSchema],
    appliedInTasks: [InfoSchema],
    completedProjects: [InfoSchema],
    acceptedInProjects: [InfoSchema],
    appliedInProjects: [InfoSchema],
    experienceLevel: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5]
    },
    memberRating: {
        type: Number,
        //enum: [0,1, 2, 3, 4, 5]
    },
    allRatedTasks:{
        type: Number
    },
    allRatedReco: {
        type: Number
    },
    averageRecoRate: {
        type: Number,
        // enum: [0,1, 2, 3, 4, 5]
    },
    memberHirePerHour:{
        type: Number,
    },
    //this should be pairs 
    skills: [SkillSchema],
    memberEvents:[InfoSchema],
    memberCertificates:[InfoSchema],
    memberCourses:[InfoSchema],
    memberCoursesAppliedIn:[InfoSchema],
    memberCoursesAcceptedIn:[InfoSchema],
    memberMasterclassesAppliedIn:[InfoSchema],
    memberMasterclassesAcceptedIn:[InfoSchema],
    memberWorksIn:[InfoSchema],
    memberVerified: {
        type: Boolean,
        default: false
    },
    /* ,
    skills: {
        type: [String],
        required: false,
        enum:[Skill.find()]

    }, */
    //End Member

    // Partner
    partnerName:{
        type:String,
        //required:true
    },
    partnerPhoneNumber: {
        type: String,
        required: false
    },
    partnerLocation:{
        type:String
    },
    partnerDateJoined: {
        type: Date,
        // default: Date.now
    },
    partnerPartners: [InfoSchema],
    fieldOfWork:[String],
    partnerEvents:[InfoSchema],
    partnerProjects: [InfoSchema],
    partnerTasks: [InfoSchema],
    // it be come an array 
    feedbackForm: [{
        memberinfo:{
            type:InfoSchema,
          //  required:true
        },
        feedback:{
            type:String,
            //required:true
        },
    }],
    partnerVerified: {
        type: Boolean,
        default: false
    },
    // End Partner

    // CoworkingSpace
    coworkingSpaceName: {
        type: String,
       // required: true
    },
    coworkingSpaceDateJoined:{
        type:Date
    },
    coworkingSpacePhoneNumber: {
        type: [String],
        required: false
    },
    coworkingSpaceLocation: {
        type: String,
       // required: true
    },
    // Should i change it to array of plans or it just Description
    coworkingSpaceBusinessPlans: {
        type: [String]
       // required: true
    },
    coworkingSpaceFacilites: {
        type: String,
      //  required: true
    },
    coworkingSpaceMaxNoRooms: {
        type: Number,
       // required: true
    },
    coworkingSpaceRooms: [RoomSchema],
    coworkingSpaceVerified: {
        type: Boolean,
        default: false
    },
    // End CoworkingSpace

    // EducationOrganization
    educationOrganizationName: {
        type: String,
      //  required: true
    },
    educationOrganizationPhoneNumber: {
        type: String,
        required: false
    },
    educationOrganizationLocation:{
        type:String
    },
    educationOrganizationCertificates: [InfoSchema],
    educationOrganizationTrainingPrograms: [TrainingProgramSchema],
    educationOrganizationCourses: [InfoSchema],
    educationOrganizationMasterClasses:[InfoSchema],
    educationOrganizationEducators:[InfoSchema],
    educationOrganizationVerified: {
        type: Boolean,
        default: false
    },
    educationOrganizationDateJoined:{
        type:Date
    },
    // End EducationalOrganization

})

const User= mongoose.model('users', UserSchema)
module.exports = User