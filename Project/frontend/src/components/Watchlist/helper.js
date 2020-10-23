
const helper = {


parseList : (list)=>{
    var parsedList = [];

    console.log('parse')
    console.log(list)
    
    list.forEach(item =>{

        console.log(item)
        item.watchlist.forEach(subitem =>{
            parsedList.push(subitem);
            console.log("parsing")
            console.log(subitem);
        });

    });

    return parsedList;

    }

}

export default helper;