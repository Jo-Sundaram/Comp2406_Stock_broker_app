import json 
from pymongo import MongoClient 
from bson.json_util import loads
  
  
# Making Connection 
myclient = MongoClient("mongodb://localhost:27017/")  
   
# database  
db = myclient["webdevproject"] 
   
# Created or Switched to collection  
# names: GeeksForGeeks 
Collection = db["stocks"] 
  
# Loading or Opening the json file 
json_data = '''[{
  "_id": {
    "$oid": "5f8b044b5138c1578cd77ce6"
  },
  "stockFullName": "TESLA",
  "stockAbbreviation": "TSLA",
  "eventSubscriptions": [],
  "buyOrders": [
    {
      "_id": {
        "$oid": "5f934b8d70beb2336ccc81ad"
      },
      "orderID": "dO6i1KKmqRmr",
      "userID": "jo",
      "shares": 6,
      "price": 6
    }
  ],
  "sellOrders": [
    {
      "_id": {
        "$oid": "5f934b8170beb2336ccc81ab"
      },
      "orderID": "PDctwdbUbz4q",
      "userID": "jo",
      "shares": 8,
      "price": 2
    }
  ],
  "createdAt": {
    "$date": "2020-10-17T14:48:43.085Z"
  },
  "updatedAt": {
    "$date": "2020-10-23T21:30:53.937Z"
  },
  "__v": 0
},{
  "_id": {
    "$oid": "5f8b04515138c1578cd77ce7"
  },
  "stockFullName": "CIENA",
  "stockAbbreviation": "CIEN",
  "eventSubscriptions": [],
  "buyOrders": [
    {
      "_id": {
        "$oid": "5f934bae70beb2336ccc81af"
      },
      "orderID": "ScMmhWbdoOyp",
      "userID": "jo",
      "shares": 5,
      "price": 5
    }
  ],
  "sellOrders": [],
  "createdAt": {
    "$date": "2020-10-17T14:48:49.724Z"
  },
  "updatedAt": {
    "$date": "2020-10-23T21:31:26.560Z"
  },
  "__v": 0
},{
  "_id": {
    "$oid": "5f8b04595138c1578cd77ce8"
  },
  "stockFullName": "APPLE",
  "stockAbbreviation": "AAPL",
  "eventSubscriptions": [
    {
      "_id": {
        "$oid": "5f934bc470beb2336ccc81b1"
      },
      "subscriptionID": "Q1DeFwKkqgzS",
      "userID": "AAPL",
      "parameter": "incDollar",
      "triggerOrder": false
    }
  ],
  "buyOrders": [],
  "sellOrders": [
    {
      "_id": {
        "$oid": "5f934b7970beb2336ccc81a7"
      },
      "orderID": "4pEB2D64LHoM",
      "userID": "jo",
      "shares": 3,
      "price": 5
    }
  ],
  "createdAt": {
    "$date": "2020-10-17T14:48:57.309Z"
  },
  "updatedAt": {
    "$date": "2020-10-23T21:31:48.367Z"
  },
  "__v": 0
}]'''

data = loads(json_data)
      
# Inserting the loaded data in the Collection 
# if JSON contains data more than one entry 
# insert_many is used else inser_one is used 
if isinstance(data, list): 
    Collection.insert_many(data)   
else: 
    Collection.insert_one(data) 