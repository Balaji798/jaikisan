const validator = require("email-validator");
const userModel= require('../models/userModels');
const cartModel= require('../models/cartModels');
const ObjectId= require('mongoose').Types.ObjectId;

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.length === 0) return false
    return true;
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
}

const isValidMobileNum = function (value) {
    if (!(/^[6-9]\d{9}$/.test(value))) {
        return false
    }
    return true
}

const isValidSyntaxOfEmail = function (value) {
    if (!(validator.validate(value))) {
        return false
    }
    return true
}
const isAlphabet = function (value) {
    let regex = /^[A-Za-z ]+$/
    if (!(regex.test(value))) {
        return false
    }
    return true
}



const checkUser = async (req, res, next) => {
    try {
       
        let userData = req.body
      
        
        if (!isValidRequestBody(userData)) {
            return res.status(400).send({ status: false, message: "Please provide data for successful registration" });
        }
        let { firstName, lastName, emailID, mobileNumber,address,DateOfBarth } = userData;

        if (!isValid(firstName)) {
            return res.status(400).send({ status: false, message: "Please provide first Name " });
        }
        if (!isValid(lastName)) {
            return res.status(400).send({ status: false, message: "Please provide last Name " });
        }
        if (!isAlphabet(firstName)) {
            return res.status(400).send({ status: false, message: "You can't use special character or number in fname" });
        }
        if (!isAlphabet(lastName)) {
            return res.status(400).send({ status: false, message: "You can't use special character or number in lname" });
        }
        if (!isValid(emailID)) {
            return res.status(400).send({ status: false, message: "Please provide Email id " });;
        }
        if (!isValidSyntaxOfEmail(emailID)) {
            return res.status(404).send({ status: false, message: "Please provide a valid Email Id" });
        }
        if (!isValid(mobileNumber)) {
            return res.status(400).send({ status: false, message: "Please provide mobile number " });
        }
        if (!isValidMobileNum(mobileNumber)) {
            return res.status(400).send({ status: false, message: '1 Please provide a valid modile number' })
        }
        
        if (!isValid(address)) {
            return res.status(400).send({ status: false, message: "Please provide address or address field" });;
        }
        if (!isValid(DateOfBarth)) {
            return res.status(400).send({ status: false, message: "Please provide Date Of Barth" });;
        }
        if(!(/^(([0-9])|([0-2][0-9])|([3][0-1]))\/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\/\d{4}$/.test(DateOfBarth))){
            return res.status(400).send({status:false,message:"please provide valid  date of barth"});
        }
        let isDBexists = await userModel.find();
        let dbLen = isDBexists.length
        if (dbLen != 0) {
            const DuplicateEmail = await userModel.find({ emailID: emailID });
            const emailFound = DuplicateEmail.length;
            if (emailFound != 0) {
                return res.status(400).send({ status: false, message: "This email Id already exists with another user" });
            }
            const duplicatePhone = await userModel.findOne({ mobileNumber: mobileNumber })
            if (duplicatePhone) {
                return res.status(400).send({ status: false, message: "This mobile number already exists with another user" });
            }
        }
        next();
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

const checkCart=async (req,res,next)=>{
    try{
 
        let cartData = req.body
      
        if (!isValidRequestBody(cartData)) {
            return res.status(400).send({ status: false, message: "Please provide data for successful registration" });
        }
        let {customerName,cartType,vision,customerID}=cartData;
        if (!isValid(customerName)) {
            return res.status(400).send({ status: false, message: "Please provide fname or fname field" });
        }
        let customer=await userModel.findOne({customerID:customerID});
        if(customer.firstName!=customerName){
            return res.status(400).send({status:false,message:"Customer Name is not valid please provid valid customer name "});
        }
        if (!isValid(cartType)) {
            return res.status(400).send({ status: false, message: "Please provide fname or fname field" });
        }

        if (!isValid(vision)) {
            return res.status(400).send({ status: false, message: "Please provide fname or fname field" });
        }
        next()
    }catch(err){
        res.status(500).send(err.message);
    }
}

module.exports={checkUser,checkCart};