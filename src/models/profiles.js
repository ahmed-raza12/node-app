const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const WishList = require('./wishlist');

const profileSchema = new mongoose.Schema({
    name: {
        type: String
    },
    age: {
        type: Number,
        min: 0
    },
    graduate: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not correct")
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')) {throw Error('password can not contain "password"')}
        }

    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, { toObject: {
    virtuals: true}, timestamps: true})
// here two things to know 
// if u want to refer slave, u need reference then populate it
// if u connect master with slaves and get data, u need virtual relation & populate it // Get all Wished of user-loggedIn
// make virtual relation here!
profileSchema.virtual('wishList', {
    ref: 'WishList',
    localField: "_id",
    foreignField: 'wishedBy'
})

profileSchema.pre('save', async function(next){
    const profile = this // fun should not be arrow
    if(profile.isModified('password')) {
        profile.password = await bcrypt.hash(profile.password, 8)
    }
    next()
})

profileSchema.pre('remove', async function(next){
    const profile = this // fun should not be arrow
    
    await WishList.deleteMany({
        wishedBy: profile._id
    }) 
    
    next()
})

profileSchema.statics.findByCredentials = async (email, password) => {
    const profile = await Profiles.findOne({email})
    console.log(profile, 'pro');
    
    if(!profile) {
        throw Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, profile.password)

    if(!isMatch){
        throw Error('Unable to login')
    }
    return profile
}

profileSchema.methods.generateAuthToken = async function() {
    const profile = this;
    const token = jwt.sign({_id: profile._id.toString()}, process.env.JWT_SECRET);

    profile.tokens = profile.tokens.concat({token})
    await profile.save()
    return token
}

profileSchema.methods.toJSON = function() {
    const profile = this;
    const publicProfileData = profile.toObject()

    delete publicProfileData.password
    delete publicProfileData.tokens
    delete publicProfileData.avatar

    console.log(publicProfileData)
    return publicProfileData
}

// profileSchema.statics.toJSON = function(record) {
//     const profiles = record;
//     const publicProfileFields = profiles.map((p) => {
//         const obj = p.toObject()
//         delete obj.password
//         delete obj.tokens
//         return obj
//     })

//     return publicProfileFields
// }


const Profiles = mongoose.model('Profiles', profileSchema)

module.exports = Profiles