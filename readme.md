i do not know how to format a readme file

Jothika Sundaram 101147833
Samee Shahood 101143479

Project selected: Stock Broker Application

We are providing two seperate files for the checkin.
"The Project_Checkin_1" features strictly the HTML/CSS mock-up pages, along with the JS functionality.

"Project" has a MERN stack setup; a backend (MongoDB, ExpressJS and NodeJS) with a user and stock schema, and GET and POST functions for the users and stocks.

Project_Checkin_1 File:
login.html
The user will need to to input their account email and password in order to login. Upon logging in, they will be re-directed to the index.html page.
Users will also have the option to navigate to a registration link.

register.html
Users will be able to fill out the form on this page to create an account in order to login to the website. Upon registering, the user will be re-directed to the login page.

index.html
This is the landing page for logged in users. Here, users can view the following:
- Their user funds, and the option to deposit and withdraw funds
- The users stock portfolio, and the stocks the user owns.
- Both unprocessed buy and sell users the user has in place
- The event subscriptions and the watchlists the user has active. 

stock.html
The users will be able to view a stock page here.
On the stock page, users will be able to see:
- The current highest buy order and lowest sell order (Highest bid, ask)
- The history of processed users, including the the price sold for
- The option for the user to place a buy order for the stock
- The option for the user to create an event subscription for the stock, with certain parameters to choose from.

The the navigation bar features the option to search stocks, edit watchlists, and view owned stocks. Only searching stocks and view owned stocks work currently. The create event subscription page
and create watchlist page will look similar to the users ability to view their watchlist, however with the option to add/delete/edit their subscription/watchlist.

static/css files:
index.css - the css used by index.html
logreg.css - the css used by logreg.css
stock.css - the css used by stock.html
navbar.css - the css used by the navigation bar featured on stock.html and index.html
all.min.css - used for icons on the navigation bar

Project Files
This contains a functioning backend (in the backend folder), which runs on ExpressJS, NodeJS and MongoDB, and a frontend that runs on React.

In order to start the application the user will need to install packages first.

1. cd backend
2. npm install(?)
3. node server

After starting the server is started, localhost:5000 should go live.

Next start the frontend
1. cd frontend
2. Install all required libraries using npm install
3. Start the frontend, npm install
4. Navigate to localhost:3000

Backend Code:
server.js
In server.js, a local server is opened on port 5000 in order to allow for communication with MongoDB, using mongoose, cors, expressJS and nodeJS. A "users" route, where all user infromation would be accessed, and a "stock" route, where stock information would be accessed, are initialized in the server here.

models/user.model.js
The model, or schema, for a user object in mongoDB in posted here. The purpose of this schema is to serve as a required format/template for all user objects in the database to follow.
The structure details of the user schema is on the rough outline provided.


models/stocks.model.js
The model, or schema, for a stock  object in mongoDB in posted here. The purpose of this schema is to serve as a required format/template for all stock  objects in the database to follow. The structure details of the stock schema is on the rough outline provided. 

routes/users.js
Here, both GET and POST requests are stored for the user collection in the database. When creating a POST request, the user would have to follow the users/add address and follow the user schema model in order to create a user. Otherwise, when creating GET request, the program would follow the user schema model in order to get each user in the database.(users route)

routes/stocks.js
Here, both GET and POST requests are stored for the stock collection in the database. When creating a POST request, the user would have to follow the stocks/add address and follow the user schema model in order to create a stock. Otherwise, when creating GET request, the program would follow the user schema model in order to get each stock in the database.(users route)

For creating both stocks and users through POST requests, the program requires for both that the model schema be followed. There are parameters within both models stock and user stock to prevent duplicate users or stocks.

In order to test the backend, an application such as Postman (or other API development tools) would be required.
If the backend is correctly running, follow the following instructions
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
5. Enter the request URL to "http://localhost:5000/users", and set the request type to GET, and send the request. The 
item you just POSTed to the database will appear.

If you try adding an item with an email/username that already exists to the database through this route, an error will appear as duplicate users are not permitted.

For stocks, follow the same instructions for the users, but instead use http://localhost:5000/stocks/add and http://localhost:5000/users. 

