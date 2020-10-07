Jothika Sundaram 101147833
Samee Shahood 101143479

Project selected: Stock Broker Application
Project type: Paired project

Materials submitted for the check-in:
/Project_Checkin_1
/Project

-----------------------------------------------------------

/Project_Checkin_1:  contains strictly the HTML/CSS mock-up pages, along with JS functionality.

login.html
The user will need to to input their account email and password in order to login. Upon logging in, they will be re-directed to ./index.html
Users will also have the option to navigate to a registration link which redirects to ./register.html

register.html
Users will be able to fill out the form on this page to create an account in order to login to the website. Upon registering, the user will be re-directed to the login page.

Index.html
Linked scripts: /static/js/script.js
This is the landing page for logged in users. Here, users can view their dashboard that contains the following:
-  User funds, option to deposit and withdraw funds
- User stock portfolio, and the stocks the user owns. The user can also place sell orders for these stocks.
- Both unprocessed buy and sell orders the user has in place
- The event subscriptions and the watchlists the user has active. 

Javascript functionality:
- Textbox input and button handler events for deposit/withdraw 
- Can deposit and withdraw money from user’s cash balance which updates displayed balance
- Validates user input to ensure they enter only positive numbers and cannot withdraw more than their current balance

search.html
Linked scripts: /static/js/search.js
Users can search for a specific stock and view that stock’s details, including:
- The current highest buy order and lowest sell order (Highest bid, ask)
- The history of processed users, including the price sold for
- The option for the user to place a buy order for the stock
- The option for the user to create an event subscription for the stock, with certain parameters to choose from.


Javascript functionality:
-  Textbox input and button handler events for stock search bar. Stocks are searched by symbol, not by full name
- Alerts user if their inputted stock is not found
- Updates Highest Bid / Ask and History of Processed Orders with queried stock’s information.
This stock object contains dummy data for the following stocks: [AXP, AAPL, IBM, MSFT, NKE, TSLA, DOW] 

Navigation Bar : Features the option to Search Stocks, view user’s dashboard (Your Stocks), Edit Watchlist and Edit Event Subscriptions.
Currently only Search Stocks and Your Stocks redirect to their respective pages. The event subscription page and watchlist page are planned to give users the option to add/delete/edit their subscription/watchlist.


/static/css/ :
index.css - the css used by index.html
logreg.css - the css used by logreg.css
stock.css - the css used by stock.html
navbar.css - the css used by the navigation bar featured on and index.html search.html
all.min.css - FontAwesome icon resources

/webfonts - FontAwesome icon Resources




-----------------------------------------------------------


/Project: We have started our React app using a MERN stack setup; a backend (MongoDB, ExpressJS and NodeJS) with a user and stock schema, and GET and POST functions for the User and Stock models.



Starting the app:

/backend


1. Make sure your command line is in the backend (cd backend)
2. Install all required libraries (npm install in the command line)
3. Start the backend server, using node server

After starting the server is started, http://localhost:5000 should go live.

/frontend

1.  Make sure your command line is in the frontend (cd frontend)
2. Install all required libraries (npm install in the command line)
3. Start the react server
4. Navigate to http://localhost:3000/login

----------
Project Files: 

Backend Code: 

server.js
In server.js, a local server is opened on port 5000 in order to allow for communication with MongoDB, using mongoose, cors, expressJS and nodeJS. A "users" route, where all user information would be accessed, and a "stock" route, where stock information would be accessed, are initialized in the server here.

models/user.model.js
The model, or schema, for a user object in mongoDB. The purpose of this schema is to serve as a required format/template for all user objects in the database to follow.
The structure details of the user schema is on the rough outline provided.


models/stocks.model.js
The model, or schema, for a stock object in mongoDB. The purpose of this schema is to serve as a required format/template for all stock objects in the database to follow. The structure details of the stock schema is on the rough outline provided. 

routes/users.js
Here, both GET and POST requests are stored for the user collection in the database. When creating a POST request, the user would have to follow the users/add address and follow the user schema model in order to create a user. Otherwise, when creating GET request, the program would follow the user schema model in order to get each user in the database.


routes/stocks.js
Here, both GET and POST requests are stored for the stock collection in the database. When creating a POST request, the user would have to follow the stocks/add address and follow the user schema model in order to create a stock. Otherwise, when creating GET request, the program would follow the user schema model in order to get each stock in the database.

For creating both stocks and users through POST requests, the program requires for both that the model schema be followed. There are parameters within both models stock and user stock to prevent duplicate users or stocks.

-------------
In order to test the backend, an application such as Postman (or other API development tools) would be required.
If the backend is correctly running, follow the following instructions:

1. Open Postman/your API development tool, and enter the request URL to "http://localhost:5000/users/add", and set the request type to POST.

2. Go to the "Body" tab, and ensure you're set to raw, JSON test.
3. Enter the following into the text box:
{
    "username": "SameeShahood",
    "email": "sameeshahood@test.com",
    "password": "password",
    "userFunds": 0,
    "watchlist": [],
    "notifications": [],
    "eventSubscriptions": [],
    "stockPortfolio": [],
    "unpBuyOrders": [],
    "unpSellOrders": [],
    "pBuyOrders": [],
    "pSellOrders": []
}
4. Send the request.
5. Enter the request URL to "http://localhost:5000/users", and set the request type to GET, and send the request. The item you just POSTed to the database will appear.

If you try adding an item with an email/username that already exists to the database through this route, an error will appear as duplicate users are not permitted.



For stocks, follow the same instructions for the users, but instead use http://localhost:5000/stocks/add and http://localhost:5000/stocks. 

In the textbox when sending a POST request to stocks/add, use:
{
    "stockFullName": "CIENA",
    "stockAbbreviation": "$CIEN",
    "eventSubscriptions" : [],
    "sellOrders" : [],
    "buyOrders": []
}
You can test the POST request by create stock objects of your own! The server should not accept stocks with duplicate names or abbreviations.

If you'd like to input objects into the array objects (such as watchlist, sellOrders, etc.), they would need to follow the same structure provided in the schema.
---------
Frontend Code:

src/App.js
All the websites routes and components are imported into the application here. The /register path would lead the user to the registration page,
the /login path would lead the user to the login page, and the /home page would lead the user to the landing page after login.

src/components/

login-user.component.js (based off login.html in the Project_checkin_1 folder)
This is the component that allows for the user to login on the website. Currently this component has no user authentication system, but this will be implemented in the future. Upon logging in, the user will be re-directed to the home page.

register-user.component.js (based off register.html in the Project_checkin_1 folder)
This is the component for users to register their accounts on. Currently, users can actually be created here as there is functionality implemented in order to take in user input in the form provided, and send the data to the backend and add the user to the database (through a POST request sent to http://localhost:5000/users/add). There is no validation here that will prevent the user from sending a POST request with invalid entires, however if a duplicate is sent through the POST request, the user will not be created on the mongoDB. (The user will not be notified, but this will be fixed in the future).

home-page.comnent.js (based off index.html in the Project_checkin_1 folder)
This is the landing page for the user upon logging in. Here the user will be able to view their account information.

navbar.component.js (based off the navigation 
This is the component that features the HTML for the navigation bar. It can be seen by the user on pages that logged in users can only see. This component is used as an extension to other components in the application. 

In order to use the frontend:

1. Make sure the application is running (npm start after cd frontend)

2. Navigate to http://localhost:3000/login in your browser once the react application is running

3. Since the register function can add users, create an account by clicking the "Sign Up" re-direct, or navigating to http://localhost:3000/register. There is no validation in place, however if you go to postman and do a GET request for users, you will see your account added to the database (unless it has a duplicate email or username!)

4. You can navigate to the home page by either clicking the login button on the login page (there is no login functionality yet), or by navigating to http://localhost:3000/home.
