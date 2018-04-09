const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    username:{type:String, required:[true, "Username is required."], unique:true},
    picture:{type:String, required:false},
    email:{type:String, required:[true, "Email is required."], validate: {validator: function(email){
        return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/.test(email);
        // (above) puts eamil through validation function to check format
    }}, message:"Email must be valid", unique:true},
    password:{type:String, required:[true, "Password is required"], minlength:[10, "Password must be at least 10 characters."]},
    phone:{type:String, required:false},
    games:[{type:Schema.Types.ObjectId, ref:"Game"}],
    bio:{type:String, required:false},
    system:{type:String, required:false},
}, {timestamps:true});

// pre method has access to user pior to given key; i.e. "save"
UserSchema.pre('save', function(next){
    // give variable user access to 'this', which obtains user info
    // otherwise scope of user wil be lost within the hashPassword method
    var user = this;
    this.hashPassword(user.password, function(err, hash){
        if(err){
            console.log(err);
            next(err);
        } else {
            user.password = hash;         
            next();
        }
    });
});

// adding password hashing method to the UserSchema
UserSchema.methods.hashPassword = function(newPassword, callBack){
    bcrypt.hash(newPassword, 11, function(err, hash){
        if(err){
            // if there is an error it will return in the callback w/o the hash
            console.log(err);
            return callBack(err);
        } else {
            // returns null so callback knows there is no error, and sends hashed password
            return callBack(null, hash);
        }
    });
};

const GameShcema = mongoose.Schema({
    name:{type:String, required:[true, "Game name is required."]},
    console:{type:String, required:[true, "Console is required."]},
    condition:{type:String},
    price:{type:Number},
    year:{type:String},
    picture:{type:String, required:false},
    _user: {type:Schema.Types.ObjectId, ref:"User"}
}, {timestamps:true});

mongoose.model("User", UserSchema);
mongoose.model("Game", GameShcema);