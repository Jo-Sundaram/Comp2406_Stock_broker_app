
  let portfolio = {
        userfunds:{
            balance: 0,
            value: 100
        }

    }

  

function init(){
  

    console.log("loaded");



  


}



document.getElementById("deposit").addEventListener('click', ()=>{

    let balance = document.getElementById("balance");
    let input = document.getElementById("deposit-input");
    let val = parseInt(input.value);
    let currentBalance = portfolio.userfunds.balance;
    try{
         
        if (isNaN(val) || val <1) throw "Please enter a valid number";
        

    }catch (err){

        alert(err);
        val = 0;
    }finally{ 
        input.value = "";
     
    }
    
    portfolio.userfunds.balance += parseInt(val);
    newBalance = portfolio.userfunds.balance;


    
    balance.innerText = "Cash balance: $" + newBalance;

    console.log(portfolio.userfunds.balance);

    
});



document.getElementById("withdraw").addEventListener('click', ()=>{

    let balance = document.getElementById("balance");
    let input = document.getElementById("withdraw-input");
    let currentBalance = portfolio.userfunds.balance;

    
    let val = parseInt(input.value);

    
    balance.innerText = "Cash balance: $" + val;

    try{
          
        if (isNaN(val) || val <1) throw "Please enter a valid number";
        if(val > currentBalance) throw "You cannot withdraw more than your current balance"
        

    }catch (err){

        alert(err);
        val = 0;
    }finally{ 
        input.value = "";
     
    }
    
    portfolio.userfunds.balance -= parseInt(val);
    newBalance = portfolio.userfunds.balance;


    
    balance.innerText = "Cash balance: $" + newBalance;

    console.log(portfolio.userfunds.balance);

    
});



