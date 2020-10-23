import json 
from pymongo import MongoClient 
from bson.json_util import loads
  
  
# Making Connection 
myclient = MongoClient("mongodb://localhost:27017/")  
   
# database  
db = myclient["webdevproject"] 
   
# Created or Switched to collection  
# names: GeeksForGeeks 
Collection = db["users"] 
  
# Loading or Opening the json file 
json_data = '''[{
  "_id": {
    "$oid": "5f890e53bb89e66e947f5651"
  },
  "username": "sameeshahood",
  "email": "sameeshahood11@gmail.com",
  "password": "password",
  "userFunds": 22,
  "watchlist": [],
  "notifications": [],
  "eventSubscriptions": [
    {
      "_id": {
        "$oid": "5f90f6e13258ed29ecef582b"
      }
    },
    {
      "_id": {
        "$oid": "5f90f71a3258ed29ecef582d"
      }
    },
    {
      "_id": {
        "$oid": "5f90f74a3258ed29ecef582f"
      }
    },
    {
      "_id": {
        "$oid": "5f90f7a13258ed29ecef5831"
      },
      "stockID": "TSLA",
      "parameter": "decdivide",
      "triggerOrder": false
    }
  ],
  "stockPortfolio": [],
  "unpBuyOrders": [],
  "unpSellOrders": [],
  "pBuyOrders": [],
  "pSellOrders": [],
  "createdAt": {
    "$date": "2020-10-16T03:06:59.676Z"
  },
  "updatedAt": {
    "$date": "2020-10-22T03:08:17.723Z"
  },
  "__v": 0
},{
  "_id": {
    "$oid": "5f890ebbbb89e66e947f5652"
  },
  "username": "jothikasundaram",
  "email": "jothikasundaram@gmail.com",
  "password": "password",
  "userFunds": 939,
  "watchlist": [
    {
      "_id": {
        "$oid": "5f92020e76ba070aa446d9b7"
      },
      "stockID": "TSLA"
    }
  ],
  "notifications": [],
  "eventSubscriptions": [
    {
      "_id": {
        "$oid": "5f934bc470beb2336ccc81b0"
      },
      "subscriptionID": "Q1DeFwKkqgzS",
      "stockID": "AAPL",
      "parameter": "incDollar",
      "value": 15,
      "triggerOrder": false
    }
  ],
  "stockPortfolio": [
    {
      "_id": {
        "$oid": "5f8b99f087e15278f4bead78"
      },
      "stockID": "AAPL",
      "stockName": "Apple",
      "shares": 6
    },
    {
      "_id": {
        "$oid": "5f8b99f087e15278f4bead79"
      },
      "stockID": "TSLA",
      "stockName": "Tesla",
      "shares": 24
    }
  ],
  "unpBuyOrders": [
    {
      "_id": {
        "$oid": "5f934b8d70beb2336ccc81ac"
      },
      "orderID": "dO6i1KKmqRmr",
      "stockID": "TSLA",
      "shares": 6,
      "price": 6
    },
    {
      "_id": {
        "$oid": "5f934bae70beb2336ccc81ae"
      },
      "orderID": "ScMmhWbdoOyp",
      "stockID": "CIEN",
      "shares": 5,
      "price": 5
    }
  ],
  "unpSellOrders": [
    {
      "_id": {
        "$oid": "5f934b7970beb2336ccc81a6"
      },
      "orderID": "4pEB2D64LHoM",
      "stockID": "AAPL",
      "shares": 3,
      "price": 5
    },
    {
      "_id": {
        "$oid": "5f934b8170beb2336ccc81aa"
      },
      "orderID": "PDctwdbUbz4q",
      "stockID": "TSLA",
      "shares": 8,
      "price": 2
    }
  ],
  "pBuyOrders": [],
  "pSellOrders": [],
  "createdAt": {
    "$date": "2020-10-16T03:08:43.963Z"
  },
  "updatedAt": {
    "$date": "2020-10-23T21:31:48.365Z"
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