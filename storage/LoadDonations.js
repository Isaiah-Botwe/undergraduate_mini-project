const { storage } = require('./Dbstorage');
const v4 = require('uuid').v4

const panford = {'Title':  'Sick ', 'Goal': 500000, 'Theme':"Donate to save life", 'totalAmount': 0, 'mobileNumber': '05914556', 'Description': 'This patient is sick at the health care and requiures a donation to be released from the health sector ', 'ID': v4().toString(), 'picName': 'sick.jpg'};

const church= {'Title':  'church ', 'Goal': 500000, 'Theme':"Donate to build the church ", 'totalAmount': 0, 'mobileNumber': '0243852710', 'Description': 'This church foundation is building a church that require a support from the native church members or any other person who is willing to donate  ', 'ID': v4().toString(), 'picName': 'church.jpg'};

(async () => {
    //let add = await Promise.all([storage.addDonation(church), storage.addDonation(orphanage)])
    await Promise.all([storage.addDonation(panford), storage.addDonation(church),])
    await storage.quitQ()
})()
    //go  to church
