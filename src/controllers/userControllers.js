const userModel=require('../models/userModels');
const {v4 : uuidv4}= require('uuid');
const createUser = async (req, res) => {
    try {
        let userRequest = req.body
        let{firstName,lastName,emailID,mobileNumber,address,DateOfBarth}=userRequest;
        let customerID = uuidv4();
       const userData={firstName,lastName,emailID,mobileNumber,address,customerID,DateOfBarth}
        const dataCreated = await userModel.create(userData);

        return res.status(201).send({ status: true, message: 'User created successfully', data: dataCreated });
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

const getUser = async (req, res) => {
    try {
      let userData = await userModel.find({status:"ACTIVE"}).select({ createdAt: 0, updatedAt: 0, __v: 0,_id:0 });
      return res.status(200).send({ status: true, Alluser: userData });
    } catch (error) {
      return res.status(500).send({ status: false, error: error.message });
    }
  };

  const deleteUser= async function (req, res) {

    try {

        const id = req.params.customerID
      
        let userData = await userModel.findOne({customerID: id })
        
        if (userData) {
            if(userData.status==="ACTIVE")
                    await userModel.findOneAndUpdate({customerID: id},{status:"INACTIVE"});
                    return res.status(200).send({ status: true, Message: "blog Deleted" })
        } else {
            return res.status(404).send({ Message: "blog document not exist" })
        }
    } catch (err) {
        return res.status(500).send({ Message: "something went wrong" })


    }
}

module.exports={createUser,getUser,deleteUser}