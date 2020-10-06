





let stocks = {
    AXP:{
            id: 0,
            symbol: "AXP",
            name: "AMERICAN EXPRESS",
            buyOrders:{			
                userID:[],
                shares:[],
                price:[]
            },
            sellOrders:{	
                shares:[],
                price:[]
            },
            eventSubscriptions:{		
                userID:[],
                parameters:[]
            },
                       

        },
    AAPL:{
            id: 0,
            symbol: "AAPL",
            name: "APPLE",
            buyOrders:{			
                userID:[],
                shares:[],
                price:[]
            },
            sellOrders:{	
                shares:[],
                price:[]
            },
            eventSubscriptions:{		
                userID:[],
                parameters:[]
            },
                       

        },
    IBM:{
            id: 0,
            symbol: "IBM",
            name: "IBM",
            buyOrders:{			
                userID:[],
                shares:[],
                price:[]
            },
            sellOrders:{	
                shares:[],
                price:[]
            },
            eventSubscriptions:{		
                userID:[],
                parameters:[]
            },
                       

        },
    MSFT:{
            id: 0,
            symbol: "MSFT",
            name: "MICROSOFT",
            buyOrders:{			
                userID:[],
                shares:[],
                price:[]
            },
            sellOrders:{	
                shares:[],
                price:[]
            },
            eventSubscriptions:{		
                userID:[],
                parameters:[]
            },
                       

        },
    NKE:{
            id: 0,
            symbol: "NKE",
            name: "NIKE",
            buyOrders:{			
                userID:[],
                shares:[],
                price:[]
            },
            sellOrders:{	
                shares:[],
                price:[]
            },
            eventSubscriptions:{		
                userID:[],
                parameters:[]
            },
                       

        },
    TSLA:{
            id: 0,
            symbol: "TSLA",
            name: "TESLA",
            buyOrders:{			
                userID:[],
                shares:[],
                price:[]
            },
            sellOrders:{	
                shares:[],
                price:[]
            },
            eventSubscriptions:{		
                userID:[],
                parameters:[]
            },
                       

        },
    DOW:{
            id: 0,
            symbol:"DOW",
            name: "DOW",
            buyOrders:{			
                userID:[],
                shares:[],
                price:[]
            },
            sellOrders:{	
                shares:[],
                price:[]
            },
            eventSubscriptions:{		
                userID:[],
                parameters:[]
            },
                       

        }
}

function init(){
  

    console.log("stocks loaded");
 


}




document.getElementById("search-enter").addEventListener('click', ()=>{

    let table = document.getElementById("stock-history");

    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = "$10";
    cell2.innerHTML = "Joanne";
    cell3.innerHTML = "Ryan";

    console.log("helo")


});