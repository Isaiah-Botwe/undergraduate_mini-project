const { json } = require("body-parser")
const { storage } = require('../storage/Dbstorage')
const { request } = require("express")
const u4 = require('uuid').v4


class User {

    static add(req, res) {
        (async()=> {
       const {Name, Password, Cpassword, Email} = req.body
       if(Password != Cpassword)
        res.render('signup', {notmatch: true, message:"Passwords dont match"})
        else{
            let result =  await storage.findOne({'Email': Email})
            if(result) {
                res.render('signup', {notmatch: true, message:"Usere Exists"})
            }
            else {
                let result = await storage.add({'Name': Name, 'Password': Password, 'Email': Email})
                res.redirect('/login')
            }
        }
        })()   
    } 

    static login(req, res){
        (async () => {
            const {Email, Password, Login} = req.body
            console.log(Email)
            let result = await storage.findOne({'Email': Email})
            if(!result)
            res.render('login', {notmatch: true, message:"User not found"})
            else {
                if(result.Password != Password)
                res.render('login', {notmatch: true, message:"Password Not Found"})
                else {
                    let ses_id = u4().toString()
                    let updated_user = await storage.update({'Email': Email}, {$set: {'Ses_id' : ses_id}})
                    let result = await storage.findOne({'Email': Email})
                    res.cookie('idan_id', ses_id)
                    res.redirect('/uhome')  
                }
            }
        })()
    }

    static uHome(req, res) {
        (async ()=> {
        let ses_id = req.cookies['idan_id']
        if (ses_id) {
            let result = await storage.findOne({'Ses_id': ses_id})
            let donations = await storage.allDonations()
            res.render('Description', {Name: result.Name, donations: donations})
        } else 
            res.redirect('/login')
        })()
    }

    static donationDescription(req, res) {
        ( async () => {
            let authenticated = req.cookies['idan_id']
            if (authenticated) {
                let donation_id = req.params['id'];
                let result =  await storage.findDonation({'ID': donation_id});
                res.render('donationDescription', {donation: result})
            } else {
                res.redirect('/login')
            }
        })()
    }

    static payingUser(req, res) {
        let ses_id  = req.cookies['idan_id']
        if(ses_id) {
            let id = req.params['id']
            res.render('newPayUser', {id: id})
        } else {
            res.redirect('/login')
        }
    }

    static payingBank(req, res) {
        ( async ()=> {
        let ses_id  = req.cookies['idan_id']
        if(ses_id) {
            //Get donation Id from request param
            let id = req.params['id']
            //Get number for donation id
            let Bank = await storage.findDonation({'ID': id})
            //Get user inputed amount and number from body
            const us = req.body
            //Update html page using donation information
            res.render('payingBank', {user:us, Bank: Bank})


        } else {
            res.redirect('/login')
        }
        })()
    }

    static checkOut(req, res) {
        ( async ()=> {
        let ses_id  = req.cookies['idan_id']
        if(ses_id) {
            //Get donation Id from request param
            let id = req.params['id']
            //Get number for donation id
            let Bank = await storage.findDonation({'ID': id})
            //Get user inputed amount and number from
            const us = req.body
            //Get user details from DB
            let user_instance = await storage.findOne({'Ses_id': ses_id})
            //Add information to pending Account
            storage.addPending({'user_email': user_instance.Email, 'donation_id': id, 'user_number': us.number, 'user_name_on_Transaction': us.Name, 'ref': us.ref , 'Bank_number': Bank.mobileNumber, 'date': Date.now().toString()})
            //Update html page using donation information
            res.render('Thanks', {Name: user_instance.Name})
        } else {
            res.redirect('/login')
        }
        })()
    }
}
module.exports.user = User