const mongoose = require('mongoose');
const UserDetailsSchema=new mongoose.Schema({
    name:'string',
    email:{type:"string",unique:true},
    mobile:'string',
    password:'string',
    file:{type:'string',require:true},
    userType:"string"

},{
    collection:"UserInfo"
}
);
mongoose.model("UserInfo",UserDetailsSchema)