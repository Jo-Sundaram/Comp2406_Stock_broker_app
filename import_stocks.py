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
  "buyOrders": [],
  "sellOrders": [
    {
      "_id": {
        "$oid": "5f91e6ab76ba070aa446d9aa"
      },
      "orderID": "ZfL0OmKXVdwB",
      "userID": "jo",
      "shares": 6,
      "price": 6
    }
  ],
  "createdAt": {
    "$date": "2020-10-17T14:48:43.085Z"
  },
  "updatedAt": {
    "$date": "2020-10-22T20:09:34.408Z"
  },
  "__v": 0
},{
  "_id": {
    "$oid": "5f8b04515138c1578cd77ce7"
  },
  "stockFullName": "CIENA",
  "stockAbbreviation": "CIEN",
  "eventSubscriptions": [
    {
      "_id": {
        "$oid": "5f9200c176ba070aa446d9b6"
      },
      "userID": "CIEN",
      "parameter": "",
      "triggerOrder": false
    }
  ],
  "buyOrders": [
    {
      "_id": {
        "$oid": "5f91e6c176ba070aa446d9b2"
      },
      "orderID": "aogilje3wupa",
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
    "$date": "2020-10-22T21:59:29.191Z"
  },
  "__v": 0
},{
  "_id": {
    "$oid": "5f8b04595138c1578cd77ce8"
  },
  "stockFullName": "APPLE",
  "stockAbbreviation": "AAPL",
  "eventSubscriptions": [],
  "buyOrders": [
    {
      "_id": {
        "$oid": "5f91e6bb76ba070aa446d9b0"
      },
      "orderID": "YKgSb28EQHvo",
      "userID": "jo",
      "shares": 2,
      "price": 2
    }
  ],
  "sellOrders": [
    {
      "_id": {
        "$oid": "5f91e6b376ba070aa446d9ae"
      },
      "orderID": "B8heuGBGGBc2",
      "userID": "jo",
      "shares": 5,
      "price": 5
    }
  ],
  "createdAt": {
    "$date": "2020-10-17T14:48:57.309Z"
  },
  "updatedAt": {
    "$date": "2020-10-22T20:08:27.690Z"
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