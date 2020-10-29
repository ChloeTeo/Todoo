module.exports = {
    createUser :{
        successCreate: { mesg : "Successfully create your own account"},
        errorCreate: {mesg: "Please try to create new account"},
    },
    existingID : {
        idredundant : {mesg: "The email address is already exist"},
        notexisted: { mesg: "We cannot find your account with this email address."},
        existedlogin: {mesg: "Successfully login!"},
        passWrong: {mesg: "The password is wrong. Please reenter again"}
    },
    todo : {
        success : {mesg: "Successfully added."},
        edited: {mesg: "Edited"}
    },
    dbError : { mesg: "There is something error occuring. Sorry, please try again"}
}