const { query } = require('express')
const { MongoClient } = require('mongodb')
class DbStorage {
    url = 'mongodb://localhost:27017/library'
    constructor() {
        (async () => {
            this.client = new MongoClient("mongodb://0.0.0.0:27017/test")
            await this.client.connect()
            return this
        })()
    }

    add = async (obj) => {
        let result = await this.client.db('donation').collection('users').insertOne(obj)
        return result
    }

    isAlive = async () => {
        let result = await this.client.db('donation').collection('users').insertOne({"name": "kofi"})
        return result.insertedId ? true : false
    }

    findOne= async (query) => {
        let result = await this.client.db('donation').collection('users').findOne(query)
        return result
    }

    update= async (filter, details) => {
        let result  = await this.client.db('donation').collection('users').findOneAndUpdate(filter, details)
        return result
    }

    addDonation = async (obj) => {
        let result = await this.client.db('donation').collection('donations').insertOne(obj)
        return result
    }

    quitQ = async () => {
        await this.client.close()
    }

    findDonation= async (query) => {
        let result = await this.client.db('donation').collection('donations').findOne(query)
        return result
    }

    allDonations = async () => {
        let result = await this.client.db('donation').collection('donations').find().toArray()
        return result
    }

    addPending = async (obj) => {
        let result = await this.client.db('donation').collection('pendings').insertOne(obj)
        return result
    }
}

let storage = new DbStorage()
module.exports.storage = storage
