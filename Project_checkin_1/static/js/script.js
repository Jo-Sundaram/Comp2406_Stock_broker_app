
  let portfolio = {
        userfunds:{
            balance: 100,
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
    
    portfolio.userfunds.balance += parseInt(input.value);

    val = portfolio.userfunds.balance;


    
    balance.innerText = "Current balance: $" + val;

    console.log(portfolio.userfunds.balance);

    
});



document.getElementById("withdraw").addEventListener('click', ()=>{

    let balance = document.getElementById("balance");
    let input = document.getElementById("withdraw-input");

    portfolio.userfunds.balance -= parseInt(input.value);
    val = portfolio.userfunds.balance;


    
    balance.innerText = "Current balance: $" + val;

    console.log(portfolio.userfunds.balance);

    
});



