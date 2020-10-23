
const helper = {


parseListItems : (list)=>{
    var parsedList = [];

    console.log('parse')
    // console.log(list)
    
    list.forEach(item =>{

        // console.log(item)
        // console.log(item.name)
        parsedList.push(item);

        // item.watchlist.forEach(subitem =>{
        //     parsedList.push(subitem);
        //     console.log("SUBITEM")
        //     console.log(subitem);
        // });

    });

    // parsedList.forEach(item =>{

    //     item.watchlist.forEach(subItem=>{
    //       console.log(subItem.stockID);

    //     })
      
    // });

    return parsedList;

    },



getStockItems: (list) =>{
    var list = []

    list.forEach(item =>{

        // console.log(item)
        // console.log(item.name)

        item.watchlist.forEach(subitem =>{
            list.push(subitem);
            console.log("SUBITEM")
            console.log(subitem);
        });

    });



    }

}



export default helper;