

let stocks = {
    AXP:{
            id: 0,
            symbol: "AXP",
            name: "AMERICAN EXPRESS",
            buyOrders:{			
                userID:["Jim"],
                shares:[5],
                price:[30]
            },
            sellOrders:{	
                userID:["Bill"],
                shares:[6],
                price:[60]
            },
            eventSubscriptions:{		
                userID:[],
                parameters:[]
            },
                       

        },
    AAPL:{
            id: 1,
            symbol: "AAPL",
            name: "APPLE",
            buyOrders:{			
                userID:["Bill"],
                shares:[6],
                price:[45]
            },
            sellOrders:{	
                userID:["Joe"],
                shares:[7],
                price:[40]
            },
            eventSubscriptions:{		
                userID:[],
                parameters:[]
            },
                       

        },
    IBM:{
            id: 2,
            symbol: "IBM",
            name: "IBM",
            buyOrders:{			
                userID:["Joanne"],
                shares:[4],
                price:[34]
            },
            sellOrders:{	
                userID:["Ryan"],
                shares:[8],
                price:[40]
            },
            eventSubscriptions:{		
                userID:[],
                parameters:[]
            },
                       

        },
    MSFT:{
            id: 3,
            symbol: "MSFT",
            name: "MICROSOFT",
            buyOrders:{			
                userID:["Lisa"],
                shares:[3],
                price:[58]
            },
            sellOrders:{
                userID:["Bill"],	
                shares:[7],
                price:[45]
            },
            eventSubscriptions:{		
                userID:[],
                parameters:[]
            },
                       

        },
    NKE:{
            id: 4,
            symbol: "NKE",
            name: "NIKE",
            buyOrders:{			
                userID:["Neil"],
                shares:[5],
                price:[45]
            },
            sellOrders:{
                userID:["Tracy"],	
                shares:[9],
                price:[25]
            },
            eventSubscriptions:{		
                userID:[],
                parameters:[]
            },
                       

        },
    TSLA:{
            id: 5,
            symbol: "TSLA",
            name: "TESLA",
            buyOrders:{			
                userID:["Elon"],
                shares:[100],
                price:[500]
            },
            sellOrders:{
                userID:["Bezos"],	
                shares:[100],
                price:[1000000]
            },
            eventSubscriptions:{		
                userID:[],
                parameters:[]
            },
                       

        },
    DOW:{
            id: 6,
            symbol:"DOW",
            name: "DOW",
            buyOrders:{			
                userID:["Peter"],
                shares:[3],
                price:[56]
            },
            sellOrders:{
                userID:["Wendy"],	
                shares:[6],
                price:[66]
            },
            eventSubscriptions:{		
                userID:[],
                parameters:[]
            },
                       

        }
}

let nextID =7;



function init(){
  

    console.log("stocks loaded");
 


}



document.getElementById("search-enter").addEventListener('click',()=>{
    let input = document.getElementById("searchbar");

    let stock = input.value;

    // console.log(searchStock(stock));

    extractData(searchStock(stock));
    



});




/* document.getElementById("search-enter").addEventListener('click', ()=>{

    let table = document.getElementById("stock-history");

    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = "$10";
    cell2.innerHTML = "Joanne";
    cell3.innerHTML = "Ryan";

    console.log("helo")


}); */



function searchStock(query){
    console.log(stocks[(query.toUpperCase())]);

    let queriedStock = stocks[(query.toUpperCase())];
    try{
       
        if(queriedStock == undefined) throw "Stock not found"
            
        
        
    }catch(err){
        alert(err);
        return -1;
    }   

    

    return queriedStock;

}


function extractData(queriedStock){

    if (queriedStock==-1){
        return;
    }


    let table = document.getElementById("stock-history");
    let highestBid = document.getElementById("bid")
    let ask = document.getElementById("ask")

    let sellOrders = queriedStock.sellOrders;
    let buyOrders = queriedStock.buyOrders;
    console.log(table.rows.length )

    if(table.rows.length >1){
        table.deleteRow(1)
    }

    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = sellOrders.price[0];
    cell2.innerHTML = sellOrders.shares[0];
    cell3.innerHTML = buyOrders.userID[0];
    cell4.innerHTML = sellOrders.userID[0];

  
    highestBid.innerHTML = "Highest Bid: $"+buyOrders.price[0];
    ask.innerHTML = "Ask: $"+sellOrders.price[0];

    

}