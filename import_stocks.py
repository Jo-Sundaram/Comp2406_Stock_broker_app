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
  "eventSubscriptions": [
    {
      "_id": {
        "$oid": "5fa46b0e3e22aa65b01b94a8"
      },
      "subscriptionID": "5000",
      "userID": "5f999d97b697054d9cbffbbe",
      "type": "Bid",
      "parameter": "incDollar",
      "value": 5,
      "triggerOrder": false,
      "notifSent": 1
    }
  ],
  "buyOrders": [
    {
      "_id": {
        "$oid": "5f99abb6b0575273fccc4d70"
      },
      "orderID": "1",
      "userID": "5f99a6fecf30786874cdde76",
      "orderPlacement": 1,
      "shares": 12,
      "price": 75
    },
    {
      "_id": {
        "$oid": "5f99abe9b0575273fccc4d72"
      },
      "orderID": "6",
      "orderPlacement": 6,
      "userID": "5f99a70acf30786874cdde78",
      "shares": 18,
      "price": 32
    },
    {
      "_id": {
        "$oid": "5f99ac04b0575273fccc4d74"
      },
      "orderID": "3",
      "userID": "5f99a76bb0575273fccc4d64",
      "orderPlacement": 3,
      "shares": 5,
      "price": 34
    },
    {
      "_id": {
        "$oid": "5f99ac32b0575273fccc4d76"
      },
      "orderID": "2",
      "orderPlacement": 2,
      "userID": "5f99a78fb0575273fccc4d67",
      "shares": 12,
      "price": 32
    },
    {
      "_id": {
        "$oid": "5f99ac48b0575273fccc4d78"
      },
      "orderID": "5",
      "orderPlacement": 5,
      "userID": "5f99a7a1b0575273fccc4d69",
      "shares": 7,
      "price": 20
    },
    {
      "_id": {
        "$oid": "5f99ac61b0575273fccc4d7a"
      },
      "orderID": "4",
      "orderPlacement": 4,
      "userID": "5f99a7acb0575273fccc4d6b",
      "shares": 6,
      "price": 32
    },
    {
      "_id": {
        "$oid": "5f99ac80b0575273fccc4d7c"
      },
      "orderID": "7",
      "orderPlacement": 7,
      "userID": "5f99a7c0b0575273fccc4d6d",
      "shares": 9,
      "price": 21
    },
    {
      "_id": {
        "$oid": "5f99ac91b0575273fccc4d7e"
      },
      "orderID": "8",
      "orderPlacement": "8",
      "userID": "5f99a7ceb0575273fccc4d6e",
      "shares": 2,
      "price": 18
    },
    {
      "_id": {
        "$oid": "5fa5bcd938ca40416ceef119"
      },
      "orderID": "hbdGVW8bY2zk",
      "orderPlacement": 1,
      "userID": "5f999d97b697054d9cbffbbe",
      "shares": 5,
      "price": 5
    },
    {
      "_id": {
        "$oid": "5fa5bce838ca40416ceef11b"
      },
      "orderID": "AXxKidaXNLLW",
      "orderPlacement": 2,
      "userID": "5f999d97b697054d9cbffbbe",
      "shares": 5,
      "price": 5
    }
  ],
  "sellOrders": [
    {
      "_id": {
        "$oid": "5f99a1cccf30786874cdde6b"
      },
      "orderID": "4",
      "userID": "5f999d70b697054d9cbffbbc",
      "orderPlacement": 4,
      "shares": 15,
      "price": 32
    },
    {
      "_id": {
        "$oid": "5f99a20ecf30786874cdde6d"
      },
      "orderID": "2",
      "userID": "5f999d97b697054d9cbffbbe",
      "orderPlacement": 2,
      "shares": 18,
      "price": 16
    },
    {
      "_id": {
        "$oid": "5f99a23dcf30786874cdde6f"
      },
      "orderID": "3",
      "userID": "5f999da7b697054d9cbffbc0",
      "orderPlacement": 3,
      "shares": 12,
      "price": 19
    },
    {
      "_id": {
        "$oid": "5f99a255cf30786874cdde71"
      },
      "orderID": "1",
      "userID": "5f999db8b697054d9cbffbc2",
      "orderPlacement": 1,
      "shares": 19,
      "price": 32
    },
    {
      "_id": {
        "$oid": "5f99a2aecf30786874cdde73"
      },
      "orderID": "5",
      "userID": "5f999dcbb697054d9cbffbc4",
      "orderPlacement": 5,
      "shares": 7,
      "price": 65
    },
    {
      "_id": {
        "$oid": "5f99a2cccf30786874cdde75"
      },
      "orderID": "6",
      "userID": "5f999ddeb697054d9cbffbc6",
      "orderPlacement": 6,
      "shares": 10,
      "price": 16
    },
    {
      "_id": {
        "$oid": "5fa5be8a38ca40416ceef11e"
      },
      "orderID": "CNai1sB5KDaU",
      "orderPlacement": 1,
      "userID": "5f999d97b697054d9cbffbbe",
      "shares": 5,
      "price": 5
    }
  ],
  "createdAt": {
    "$date": "2020-10-17T14:48:43.085Z"
  },
  "updatedAt": {
    "$date": "2020-11-12T20:11:01.303Z"
  },
  "currentAsk": 0,
  "currentBid": 0,
  "openingAsk": 50,
  "openingBid": 50,
  "dailyHistory": [
    {
      "_id": {
        "$oid": "5fa6e972a4518341201ec3b6"
      },
      "day": 1,
      "lowestAsk": 22,
      "highestBid": 37,
      "highestAsk": 88,
      "lowestBid": 33,
      "sharesSold": 33
    },
    {
      "_id": {
        "$oid": "5fa6e972a4518341201ec3b7"
      },
      "day": 2,
      "lowestAsk": 23,
      "highestBid": 34,
      "highestAsk": 85,
      "lowestBid": 32,
      "sharesSold": 19
    },
    {
      "_id": {
        "$oid": "5fa6e972a4518341201ec3b8"
      },
      "day": 3,
      "lowestAsk": 21,
      "highestBid": 33,
      "highestAsk": 55,
      "lowestBid": 22,
      "sharesSold": 12
    },
    {
      "_id": {
        "$oid": "5fa6e972a4518341201ec3b9"
      },
      "day": 4,
      "lowestAsk": 15,
      "highestBid": 88,
      "highestAsk": 129,
      "lowestBid": 5,
      "sharesSold": 7
    },
    {
      "_id": {
        "$oid": "5fa6e972a4518341201ec3ba"
      },
      "day": 5,
      "lowestAsk": 5,
      "highestBid": 80,
      "highestAsk": 50,
      "lowestBid": 30,
      "sharesSold": 7
    }
  ],
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "symbol": "TSLA",
  "fulfilledOrders": [
  ],
  "history": [
  ],
  "unfulfilledOrders": []
},{
  "_id": {
    "$oid": "5fad7af586b60f59ac08ebf9"
  },
  "stockFullName": "Nike",
  "symbol": "NKE",
  "openingAsk": 125,
  "openingBid": 124,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [
  ],
  "history": [],
  "dailyHistory": [],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:12:05.994Z"
  },
  "updatedAt": {
    "$date": "2020-11-12T19:19:54.331Z"
  }
},{
  "_id": {
    "$oid": "5fad7b2086b60f59ac08ebfa"
  },
  "stockFullName": "Apple Inc",
  "symbol": "AAPL",
  "openingAsk": 119,
  "openingBid": 119,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:12:48.553Z"
  },
  "updatedAt": {
    "$date": "2020-11-12T18:12:48.553Z"
  }
},{
  "_id": {
    "$oid": "5fad7b3f86b60f59ac08ebfb"
  },
  "stockFullName": "Cisco Systems Inc",
  "symbol": "CSCO",
  "openingAsk": 38,
  "openingBid": 38,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:13:19.735Z"
  },
  "updatedAt": {
    "$date": "2020-11-12T18:13:19.735Z"
  }
},{
  "_id": {
    "$oid": "5fad7b8186b60f59ac08ebfc"
  },
  "stockFullName": "Dow Jones Industrial Average",
  "symbol": "DOW",
  "openingAsk": 29000,
  "openingBid": 29000,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:14:25.823Z"
  },
  "updatedAt": {
    "$date": "2020-11-12T18:14:25.823Z"
  }
},{
  "_id": {
    "$oid": "5fad7bac86b60f59ac08ebfd"
  },
  "stockFullName": "Microsoft Corporation",
  "symbol": "MCSFT",
  "openingAsk": 215.6,
  "openingBid": 215.6,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [
  ],
  "history": [],
  "dailyHistory": [],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:15:08.770Z"
  },
  "updatedAt": {
    "$date": "2020-11-12T19:20:54.064Z"
  }
},{
  "_id": {
    "$oid": "5fad7d1986b60f59ac08ebfe"
  },
  "stockFullName": "IBM Common Stock",
  "symbol": "IBM",
  "openingAsk": 114.32,
  "openingBid": 114.31,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:21:13.591Z"
  },
  "updatedAt": {
    "$date": "2020-11-12T18:21:13.591Z"
  }
},{
  "_id": {
    "$oid": "5fad7ea986b60f59ac08ebff"
  },
  "stockFullName": "Visa Inc",
  "symbol": "Visa",
  "openingAsk": 208.42,
  "openingBid": 208.42,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:27:53.552Z"
  },
  "updatedAt": {
    "$date": "2020-11-12T18:27:53.552Z"
  }
},{
  "_id": {
    "$oid": "5fad7ef886b60f59ac08ec00"
  },
  "stockFullName": "American Express Company",
  "symbol": "AXP",
  "openingAsk": 111.48,
  "openingBid": 110.48,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:29:12.040Z"
  },
  "updatedAt": {
    "$date": "2020-11-12T18:29:12.040Z"
  }
},{
  "_id": {
    "$oid": "5fad7f1986b60f59ac08ec01"
  },
  "stockFullName": "Amgen",
  "symbol": "AMGN",
  "openingAsk": 236.01,
  "openingBid": 236.88,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:29:45.123Z"
  },
  "updatedAt": {
    "$date": "2020-11-12T18:29:45.123Z"
  }
},{
  "_id": {
    "$oid": "5fad7f3986b60f59ac08ec02"
  },
  "stockFullName": "Boeing Co",
  "symbol": "BA",
  "openingAsk": 178.65,
  "openingBid": 178.88,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:30:17.751Z"
  },
  "updatedAt": {
    "$date": "2020-11-12T18:30:17.751Z"
  }
},{
  "_id": {
    "$oid": "5fad7f5b86b60f59ac08ec03"
  },
  "stockFullName": "Caterpillar Inc.",
  "symbol": "CAT",
  "openingAsk": 168.72,
  "openingBid": 168.42,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:30:51.224Z"
  },
  "updatedAt": {
    "$date": "2020-11-12T18:30:51.224Z"
  }
},{
  "_id": {
    "$oid": "5fad802486b60f59ac08ec05"
  },
  "stockFullName": "Chevron Corporation",
  "symbol": "CVX",
  "openingAsk": 80.67,
  "openingBid": 80.32,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:34:12.851Z"
  },
  "updatedAt": {
    "$date": "2020-11-12T18:34:12.851Z"
  }
},{
  "_id": {
    "$oid": "5fad811d20a6a356140108e8"
  },
  "stockFullName": "Goldman Sachs Group Inc",
  "symbol": "GS",
  "openingAsk": 213.95,
  "openingBid": 219.32,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:38:21.996Z"
  },
  "updatedAt": {
    "$date": "2020-11-12T18:38:21.996Z"
  }
},{
  "_id": {
    "$oid": "5fad817c20a6a356140108e9"
  },
  "stockFullName": "Home Depot Inc",
  "symbol": "HD",
  "openingAsk": 274.65,
  "openingBid": 274.32,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:39:56.789Z"
  },
  "updatedAt": {
    "$date": "2020-11-12T18:39:56.789Z"
  }
},{
  "_id": {
    "$oid": "5fad81b520a6a356140108ea"
  },
  "stockFullName": "Honeywell International Inc.",
  "symbol": "HON",
  "openingAsk": 193.51,
  "openingBid": 195.88,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:40:53.878Z"
  },
  "updatedAt": {
    "$date": "2020-11-12T18:40:53.878Z"
  }
},{
  "_id": {
    "$oid": "5fad83f320a6a356140108ec"
  },
  "stockFullName": "Intel Coprporation",
  "symbol": "INT",
  "openingAsk": 44.91,
  "openingBid": 44.9,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:50:27.521Z"
  },
  "updatedAt": {
    "$date": "2020-11-12T18:50:27.521Z"
  }
},{
  "_id": {
    "$oid": "5fad846a20a6a356140108ed"
  },
  "stockFullName": "Johnson & Johnson",
  "symbol": "JNJ",
  "openingAsk": 147.21,
  "openingBid": 145.9,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:52:26.431Z"
  },
  "updatedAt": {
    "$date": "2020-11-12T18:52:26.431Z"
  }
},{
  "_id": {
    "$oid": "5fad848620a6a356140108ee"
  },
  "stockFullName": "Coca-Cola Co",
  "symbol": "KO",
  "openingAsk": 52.59,
  "openingBid": 52.97,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:52:54.870Z"
  },
  "updatedAt": {
    "$date": "2020-11-12T18:52:54.870Z"
  }
},{
  "_id": {
    "$oid": "5fad84a220a6a356140108ef"
  },
  "stockFullName": "JPMorgan Chase & Co.",
  "symbol": "JPM",
  "openingAsk": 115.69,
  "openingBid": 120.5,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:53:22.540Z"
  },
  "updatedAt": {
    "$date": "2020-11-12T18:53:22.540Z"
  }
},{
  "_id": {
    "$oid": "5fad858620a6a356140108f1"
  },
  "stockFullName": "McDonald's Corp",
  "symbol": "MCD",
  "openingAsk": 211.69,
  "openingBid": 207.5,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:57:10.864Z"
  },
  "updatedAt": {
    "$date": "2020-11-12T18:57:10.864Z"
  }
},{
  "_id": {
    "$oid": "5fad85b720a6a356140108f2"
  },
  "stockFullName": "3M Co",
  "symbol": "MMM",
  "openingAsk": 166.29,
  "openingBid": 162.47,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:57:59.765Z"
  },
  "updatedAt": {
    "$date": "2020-11-12T18:57:59.765Z"
  }
},{
  "_id": {
    "$oid": "5fad85d320a6a356140108f3"
  },
  "stockFullName": "Merck & Co., Inc.",
  "symbol": "MRK",
  "openingAsk": 80.55,
  "openingBid": 77.82,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:58:27.014Z"
  },
  "updatedAt": {
    "$date": "2020-11-12T18:58:27.014Z"
  }
},{
  "_id": {
    "$oid": "5fad85ef20a6a356140108f4"
  },
  "stockFullName": "Procter & Gamble Co",
  "symbol": "PG",
  "openingAsk": 144.54,
  "openingBid": 141.33,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:58:55.525Z"
  },
  "updatedAt": {
    "$date": "2020-11-12T18:58:55.525Z"
  }
},{
  "_id": {
    "$oid": "5fad860820a6a356140108f5"
  },
  "stockFullName": "Travelers Companies Inc",
  "symbol": "TRV",
  "openingAsk": 139.51,
  "openingBid": 132.33,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:59:20.138Z"
  },
  "updatedAt": {
    "$date": "2020-11-12T18:59:20.138Z"
  }
},{
  "_id": {
    "$oid": "5fad863520a6a356140108f6"
  },
  "stockFullName": "UnitedHealth Group Inc",
  "symbol": "UNH",
  "openingAsk": 357.12,
  "openingBid": 355.22,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T19:00:05.052Z"
  },
  "updatedAt": {
    "$date": "2020-11-12T19:00:05.052Z"
  }
},{
  "_id": {
    "$oid": "5fad878c20a6a356140108f8"
  },
  "stockFullName": "salesforce.com, inc.",
  "symbol": "CRM",
  "openingAsk": 251.22,
  "openingBid": 250.22,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T19:05:48.302Z"
  },
  "updatedAt": {
    "$date": "2020-11-12T19:05:48.302Z"
  }
},{
  "_id": {
    "$oid": "5fad87ae20a6a356140108f9"
  },
  "stockFullName": "Verizon Communications Inc.",
  "symbol": "VZ",
  "openingAsk": 60.69,
  "openingBid": 52.69,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T19:06:22.159Z"
  },
  "updatedAt": {
    "$date": "2020-11-12T19:06:22.159Z"
  }
},{
  "_id": {
    "$oid": "5fad883720a6a356140108fc"
  },
  "stockFullName": "Walgreens Boots Alliance Inc",
  "symbol": "WBA",
  "openingAsk": 40.38,
  "openingBid": 40.12,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T19:08:39.867Z"
  },
  "updatedAt": {
    "$date": "2020-11-12T19:08:39.867Z"
  }
},{
  "_id": {
    "$oid": "5fad885820a6a356140108fd"
  },
  "stockFullName": "Walmart Inc",
  "symbol": "WMT",
  "openingAsk": 157.25,
  "openingBid": 147.22,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T19:09:12.301Z"
  },
  "updatedAt": {
    "$date": "2020-11-12T19:09:12.301Z"
  }
},{
  "_id": {
    "$oid": "5fad887420a6a356140108fe"
  },
  "stockFullName": " Walt Disney Co",
  "symbol": "DIS",
  "openingAsk": 132.88,
  "openingBid": 131.59,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T19:09:40.103Z"
  },
  "updatedAt": {
    "$date": "2020-11-12T19:09:40.103Z"
  }
}]'''

data = loads(json_data)
      
# Inserting the loaded data in the Collection 
# if JSON contains data more than one entry 
# insert_many is used else inser_one is used 
if isinstance(data, list): 
    Collection.insert_many(data)   
else: 
    Collection.insert_one(data) 