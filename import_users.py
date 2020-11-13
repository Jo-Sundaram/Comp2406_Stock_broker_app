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
    "$oid": "5f999d70b697054d9cbffbbc"
  },
  "username": "Jothika",
  "email": "jo@admin.com",
  "password": "badpassword",
  "userFunds": 0,
  "notifications": [],
  "eventSubscriptions": [],
  "watchlistCollection": [],
  "stockPortfolio": [
    {
      "_id": {
        "$oid": "5f999d70b697054d9cbffbbd"
      },
      "stockID": "TSLA",
      "shares": 65
    }
  ],
  "unpBuyOrders": [],
  "pBuyOrders": [],
  "unpSellOrders": [
    {
      "_id": {
        "$oid": "5f99a1cccf30786874cdde6a"
      },
      "orderID": "4",
      "stockID": "TSLA",
      "shares": 15,
      "price": 32
    }
  ],
  "pSellOrders": [],
  "createdAt": {
    "$date": "2020-10-28T16:33:52.060Z"
  },
  "updatedAt": {
    "$date": "2020-10-28T16:52:28.451Z"
  },
  "__v": 0
},{
  "_id": {
    "$oid": "5f999d97b697054d9cbffbbe"
  },
  "username": "Anwar",
  "email": "anwar@admin.com",
  "password": "badpassword",
  "userFunds": 0,
  "notifications": [],
  "eventSubscriptions": [],
  "watchlistCollection": [],
  "stockPortfolio": [
    {
      "_id": {
        "$oid": "5f999d97b697054d9cbffbbf"
      },
      "stockID": "TSLA",
      "shares": 32
    }
  ],
  "unpBuyOrders": [],
  "pBuyOrders": [],
  "unpSellOrders": [
    {
      "_id": {
        "$oid": "5f99a20ecf30786874cdde6c"
      },
      "orderID": "2",
      "stockID": "TSLA",
      "shares": 18,
      "price": 16
    }
  ],
  "pSellOrders": [],
  "createdAt": {
    "$date": "2020-10-28T16:34:31.804Z"
  },
  "updatedAt": {
    "$date": "2020-10-28T16:53:34.254Z"
  },
  "__v": 0
},{
  "_id": {
    "$oid": "5f999da7b697054d9cbffbc0"
  },
  "username": "Hamza",
  "email": "hamza@admin.com",
  "password": "badpassword",
  "userFunds": 0,
  "notifications": [],
  "eventSubscriptions": [],
  "watchlistCollection": [],
  "stockPortfolio": [
    {
      "_id": {
        "$oid": "5f999da7b697054d9cbffbc1"
      },
      "stockID": "TSLA",
      "shares": 4
    }
  ],
  "unpBuyOrders": [],
  "pBuyOrders": [],
  "unpSellOrders": [
    {
      "_id": {
        "$oid": "5f99a23dcf30786874cdde6e"
      },
      "orderID": "3",
      "stockID": "TSLA",
      "shares": 12,
      "price": 19
    }
  ],
  "pSellOrders": [],
  "createdAt": {
    "$date": "2020-10-28T16:34:47.104Z"
  },
  "updatedAt": {
    "$date": "2020-10-28T16:54:21.065Z"
  },
  "__v": 0
},{
  "_id": {
    "$oid": "5f999db8b697054d9cbffbc2"
  },
  "username": "Nikhail",
  "email": "nikhail@admin.com",
  "password": "badpassword",
  "userFunds": 0,
  "notifications": [],
  "eventSubscriptions": [],
  "watchlistCollection": [],
  "stockPortfolio": [
    {
      "_id": {
        "$oid": "5f999db8b697054d9cbffbc3"
      },
      "stockID": "TSLA",
      "shares": 331
    }
  ],
  "unpBuyOrders": [],
  "pBuyOrders": [],
  "unpSellOrders": [
    {
      "_id": {
        "$oid": "5f99a255cf30786874cdde70"
      },
      "orderID": "1",
      "stockID": "TSLA",
      "shares": 19,
      "price": 32
    }
  ],
  "pSellOrders": [],
  "createdAt": {
    "$date": "2020-10-28T16:35:04.705Z"
  },
  "updatedAt": {
    "$date": "2020-10-28T16:54:45.343Z"
  },
  "__v": 0
},{
  "_id": {
    "$oid": "5f999dcbb697054d9cbffbc4"
  },
  "username": "Mirah",
  "email": "mirah@admin.com",
  "password": "badpassword",
  "userFunds": 0,
  "notifications": [],
  "eventSubscriptions": [],
  "watchlistCollection": [],
  "stockPortfolio": [
    {
      "_id": {
        "$oid": "5f999dcbb697054d9cbffbc5"
      },
      "stockID": "TSLA",
      "shares": 1
    }
  ],
  "unpBuyOrders": [],
  "pBuyOrders": [],
  "unpSellOrders": [
    {
      "_id": {
        "$oid": "5f99a2aecf30786874cdde72"
      },
      "orderID": "5",
      "stockID": "TSLA",
      "shares": 7,
      "price": 65
    }
  ],
  "pSellOrders": [],
  "createdAt": {
    "$date": "2020-10-28T16:35:23.879Z"
  },
  "updatedAt": {
    "$date": "2020-10-28T16:56:14.082Z"
  },
  "__v": 0
},{
  "_id": {
    "$oid": "5f999ddeb697054d9cbffbc6"
  },
  "username": "shane",
  "email": "shane@admin.com",
  "password": "badpassword",
  "userFunds": 0,
  "notifications": [],
  "eventSubscriptions": [],
  "watchlistCollection": [],
  "stockPortfolio": [
    {
      "_id": {
        "$oid": "5f999ddeb697054d9cbffbc7"
      },
      "stockID": "TSLA",
      "shares": 5
    }
  ],
  "unpBuyOrders": [],
  "pBuyOrders": [],
  "unpSellOrders": [
    {
      "_id": {
        "$oid": "5f99a2cccf30786874cdde74"
      },
      "orderID": "6",
      "stockID": "TSLA",
      "shares": 10,
      "price": 16
    }
  ],
  "pSellOrders": [],
  "createdAt": {
    "$date": "2020-10-28T16:35:42.600Z"
  },
  "updatedAt": {
    "$date": "2020-10-28T16:56:44.463Z"
  },
  "__v": 0
},{
  "_id": {
    "$oid": "5f99a6fecf30786874cdde76"
  },
  "username": "samee",
  "email": "samee@admin.com",
  "password": "badpassword",
  "userFunds": 1100,
  "notifications": [],
  "eventSubscriptions": [],
  "watchlistCollection": [],
  "stockPortfolio": [
    {
      "_id": {
        "$oid": "5f99a6fecf30786874cdde77"
      },
      "stockID": "TSLA",
      "shares": 2
    }
  ],
  "unpBuyOrders": [
    {
      "_id": {
        "$oid": "5f99abb6b0575273fccc4d6f"
      },
      "orderID": "1",
      "stockID": "TSLA",
      "shares": 12,
      "price": 75
    }
  ],
  "pBuyOrders": [],
  "unpSellOrders": [],
  "pSellOrders": [],
  "createdAt": {
    "$date": "2020-10-28T17:14:38.859Z"
  },
  "updatedAt": {
    "$date": "2020-10-28T17:34:46.111Z"
  },
  "__v": 0
},{
  "_id": {
    "$oid": "5f99a70acf30786874cdde78"
  },
  "username": "musa",
  "email": "musa@admin.com",
  "password": "badpassword",
  "userFunds": 1424,
  "notifications": [],
  "eventSubscriptions": [],
  "watchlistCollection": [],
  "stockPortfolio": [],
  "unpBuyOrders": [
    {
      "_id": {
        "$oid": "5f99abe9b0575273fccc4d71"
      },
      "orderID": "6",
      "stockID": "TSLA",
      "shares": 18,
      "price": 32
    }
  ],
  "pBuyOrders": [],
  "unpSellOrders": [],
  "pSellOrders": [],
  "createdAt": {
    "$date": "2020-10-28T17:14:50.512Z"
  },
  "updatedAt": {
    "$date": "2020-10-28T17:35:37.465Z"
  },
  "__v": 0
},{
  "_id": {
    "$oid": "5f99a76bb0575273fccc4d64"
  },
  "username": "martin",
  "email": "martin@admin.com",
  "password": "badpassword",
  "userFunds": 1830,
  "notifications": [],
  "eventSubscriptions": [],
  "watchlistCollection": [],
  "stockPortfolio": [],
  "unpBuyOrders": [
    {
      "_id": {
        "$oid": "5f99ac04b0575273fccc4d73"
      },
      "orderID": "3",
      "stockID": "TSLA",
      "shares": 5,
      "price": 34
    }
  ],
  "pBuyOrders": [],
  "unpSellOrders": [],
  "pSellOrders": [],
  "createdAt": {
    "$date": "2020-10-28T17:16:27.913Z"
  },
  "updatedAt": {
    "$date": "2020-10-28T17:36:04.773Z"
  },
  "__v": 0
},{
  "_id": {
    "$oid": "5f99a78fb0575273fccc4d67"
  },
  "username": "HamzaS",
  "email": "hamzas@admin.com",
  "password": "badpassword",
  "userFunds": 1616,
  "notifications": [],
  "eventSubscriptions": [],
  "watchlistCollection": [],
  "stockPortfolio": [
    {
      "_id": {
        "$oid": "5f99a78fb0575273fccc4d68"
      },
      "stockID": "TSLA",
      "shares": 34
    }
  ],
  "unpBuyOrders": [
    {
      "_id": {
        "$oid": "5f99ac32b0575273fccc4d75"
      },
      "orderID": "2",
      "stockID": "TSLA",
      "shares": 12,
      "price": 32
    }
  ],
  "pBuyOrders": [],
  "unpSellOrders": [],
  "pSellOrders": [],
  "createdAt": {
    "$date": "2020-10-28T17:17:03.301Z"
  },
  "updatedAt": {
    "$date": "2020-10-28T17:36:50.615Z"
  },
  "__v": 0
},{
  "_id": {
    "$oid": "5f99a7a1b0575273fccc4d69"
  },
  "username": "Matt",
  "email": "matt@admin.com",
  "password": "badpassword",
  "userFunds": 1860,
  "notifications": [],
  "eventSubscriptions": [],
  "watchlistCollection": [],
  "stockPortfolio": [
    {
      "_id": {
        "$oid": "5f99a7a1b0575273fccc4d6a"
      },
      "stockID": "TSLA",
      "shares": 1
    }
  ],
  "unpBuyOrders": [
    {
      "_id": {
        "$oid": "5f99ac48b0575273fccc4d77"
      },
      "orderID": "5",
      "stockID": "TSLA",
      "shares": 7,
      "price": 20
    }
  ],
  "pBuyOrders": [],
  "unpSellOrders": [],
  "pSellOrders": [],
  "createdAt": {
    "$date": "2020-10-28T17:17:21.209Z"
  },
  "updatedAt": {
    "$date": "2020-10-28T17:37:12.383Z"
  },
  "__v": 0
},{
  "_id": {
    "$oid": "5f99a7acb0575273fccc4d6b"
  },
  "username": "Tal",
  "email": "tal@admin.com",
  "password": "badpassword",
  "userFunds": 1808,
  "notifications": [],
  "eventSubscriptions": [],
  "watchlistCollection": [],
  "stockPortfolio": [
    {
      "_id": {
        "$oid": "5f99a7acb0575273fccc4d6c"
      },
      "stockID": "TSLA",
      "shares": 1
    }
  ],
  "unpBuyOrders": [
    {
      "_id": {
        "$oid": "5f99ac61b0575273fccc4d79"
      },
      "orderID": "4",
      "stockID": "TSLA",
      "shares": 6,
      "price": 32
    }
  ],
  "pBuyOrders": [],
  "unpSellOrders": [],
  "pSellOrders": [],
  "createdAt": {
    "$date": "2020-10-28T17:17:32.551Z"
  },
  "updatedAt": {
    "$date": "2020-10-28T17:37:37.858Z"
  },
  "__v": 0
},{
  "_id": {
    "$oid": "5f99a7c0b0575273fccc4d6d"
  },
  "username": "Carter",
  "email": "carter@admin.com",
  "password": "badpassword",
  "userFunds": 1811,
  "notifications": [],
  "eventSubscriptions": [],
  "watchlistCollection": [],
  "stockPortfolio": [],
  "unpBuyOrders": [
    {
      "_id": {
        "$oid": "5f99ac80b0575273fccc4d7b"
      },
      "orderID": "7",
      "stockID": "TSLA",
      "shares": 9,
      "price": 21
    }
  ],
  "pBuyOrders": [],
  "unpSellOrders": [],
  "pSellOrders": [],
  "createdAt": {
    "$date": "2020-10-28T17:17:52.627Z"
  },
  "updatedAt": {
    "$date": "2020-10-28T17:38:08.024Z"
  },
  "__v": 0
},{
  "_id": {
    "$oid": "5f99a7ceb0575273fccc4d6e"
  },
  "username": "Nikita",
  "email": "nikita@admin.com",
  "password": "badpassword",
  "userFunds": 1964,
  "notifications": [],
  "eventSubscriptions": [],
  "watchlistCollection": [],
  "stockPortfolio": [],
  "unpBuyOrders": [
    {
      "_id": {
        "$oid": "5f99ac91b0575273fccc4d7d"
      },
      "orderID": "8",
      "stockID": "TSLA",
      "shares": 2,
      "price": 18
    }
  ],
  "pBuyOrders": [],
  "unpSellOrders": [],
  "pSellOrders": [],
  "createdAt": {
    "$date": "2020-10-28T17:18:06.115Z"
  },
  "updatedAt": {
    "$date": "2020-10-28T17:38:25.816Z"
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