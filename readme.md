i do not know how to format a readme file

Jothika Sundaram [your number xd]
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
2. node install(?)
3. node server

After starting the server is started, localhost:5000 should go live.

Next start the frontend
1. cd frontend
2. Install all required libraries using npm install
3. Start the frontend, npm install
4. Navigate to localhost:3000

Backend

