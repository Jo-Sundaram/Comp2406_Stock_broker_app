Project: Stock Broker Application
CHECK-IN # 2 -- October 23
-----
MY NAME:Jothika Sundaram 101147833
MY PARTNER: Samee Shahood 101143479 -- Submitted ZIP Folder with our project material
-----
Setting up and running server

STARTING BACKEND:
1) cd/Project/backend
2) npm install - install required libraries to run the backend (from package.json)
3) node server - start the backend server (mongoDB is required on your computer for the server to work)

Open new terminal (leave previous one open and running)
STARTING FRONTEND:
1) cd /Project/frontend
2) npm install - install required libraries to run the frontend (from package.json)
3) npm start

Open a third terminal (leave others open and running)
IMPORT DATA INTO MONGODB:
Python is required to import the stocks.json and users.json into the MongoDB. Since we do not have preset data in the backend or frontend, and are using dummy data, importing these objects are required.
1) pip install pymongo
Run the following scripts:
2) python import_stocks.py <- imports stock documents into MongoDB
3) python import_users.py <- import user documents into MongoDB

TESTING SERVER: (http://localhost:3000/home)
1) Make sure the backend and frontend are running, and navigate to http://localhost:3000/home
MAKE DEPOSIT / WITHDRAW FUNDS
- In order to withdraw funds, enter a number into the "Withdraw Funds" text field and submit. If the funds are greater than what is owned, the funds will not be withdrawn from the account
The user funds will update if the input is valid.
- In order to deposit funds, enter a number into the "Deposit Funds" text field and submit. The user funds will update if the input is valid with the new user funds

PLACING SELL ORDERS: (http://localhost:3000/home)
- Select a stock you would like to sell
- Input price/share you would like to sell the stock for, and the number of shares you would like to sell
- Submit. You will see the sell order appear under "Unprocessed Sell Orders" on the home page, and the number of stocks owned decrease by the number of shares you own decrease by the number
of shares you inputted
- If you do not have a sufficient number of shares, the sell order will not be placed and the user will be warned

SEARCH FOR AND SELECT A STOCK: (http://localhost:3000/search)
- Click the search bar at the top of the website and select any stock (the search function will filter the dropdown)

PLACE BUY ORDER FOR SELECTED STOCK: (http://localhost:3000/search)
- Enter the number of shares and offer per share for the stock you are placing a buy order for, and submit. If the user has insufficient funds, the user will appear and the buy order will not
be submitted
to the database.

CREATE EVENT SUBSCRIPTION FOR SELECTED STOCK: (http://localhost:3000/search)
- Enter the parameter, and the value for the event subscription for the selected stock, and enter submit. The event subscription will be stored in the database.

ADD STOCK TO WATCHLIST (http://localhost:3000/search)
Add the stock selected to the watchlist by clicking on the “Select a watchlist” dropdown, select the desired watchlist to add the stock to, and submit. The stock will be added to the user watchlist array in the database.

Navigate back to the home page
You will see the event subscription created, and the buy order created appear on the home page.

CANCEL BUY/SELL ORDER: (http://localhost:3000/home)
Select an order to cancel, and submit. The order will be removed from the database, and will no longer appear on the users home page.

CREATE AN ACCOUNT:
Navigate to http://localhost:3000/register to create an account. If the username and email is unique, the account will be created, otherwise an warning message will appear and the account will not be created.

EDIT/REMOVE EVENT SUBSCRIPTIONS (http://localhost:3000/eventsubs)
Select a stock from the table to change the notification parameters. After selecting, enter a new parameter amount in the input field and click the “Edit Subscription” button. After the page reloads, the table should be updated with the new parameters. Remove a subscription by selecting the stock and clicking the “Remove Subscription” button.

CREATE AND EDIT AND REMOVE FROM WATCHLISTS (http://localhost:3000/watchlist)
Add a watchlist to the user account by inputting a name for the watchlist, and submitting. The watchlist should be added to the user account.
Select a watchlist to view by selecting it through the dropdown.
Delete a stock from the watchlist by selecting a stock, and submitting by pressing the remove stock button. The stock will be removed from the specific watchlist.
**Doesn’t account for duplicate stocks… yet.
-----

BUSINESS LOGIC:
Frontend Files:
/frontend/src/components/functions/requests.js

generateSellID/generateBuyID/generateESID(stockID, userID)
- Create unique ID for a buyOrder/sellOrder/event Subscription

getHighestAsk/getLowestBid(stockID)
- Fetches the highest bid/lowest ask for the requested stock. Used to get information to display on http://localhost:3000/search for the selected stock.


/frontend/src/components/Dashboard/home-page.component.js

Creating Sell Orders:
- aysnc onOrderSubmit(e) function
- Uses user input from text fields and radio buttons (onChangeOrderStock(e), onChangeOrderShares(e), onChangeOrderPrice(e)) to verify if a sell order with these parameters is possible,
then appends object to unpSellOrders array in user object with these parameters, and sellOrders array in stock object using the 'stocks/update/sellorder/:stockAbbreviation' and
the 'stocks/update/sellorder/:id'

Cancel Buy/Sell Order
- onCancelOrder(e) function
- Uses user input from text fields and radio buttons (onSelectCancel(e)) to find stock to cancel, then pulls that order from the order and unpOrder arrays in the relevant stock and user
objects.

Deposit/Withdraw Funds:
- onSubmitWith(e), onSubmitDep(e)
- Takes in user input for amount to withdraw/deposit from/to account. Does a post request to the user object with the updated userFunds.

componentDidMount()
- Gets user data to display on home page, suck as stock portfolio, unprocessed sell and buy orders, user funds and event subscriptions.


/frontend/src/components/Dashboard/search-page.component.js
Search Stocks
- handleChange = (stockID) =>
- <SelectSearch 
	options={this.state.stocks} 
	search
	onChange = {this.handleChange}
   	name="stocks" 
 	placeholder="Search for a stock" />
- Creates search dropdown with pre-loaded stocks to search from/ On selection, the components stockID variable will change to this stock. Allows for users to switch between stocks to commit functionality with

Create Buy Order
- onOrderSubmit
- Creates buyOrder using parameters inputted by user (onChangeOrderOffer(e), onChangeOrderShares(e)) for specific stock selected and userID, by pushing a new object to the buyOrder array in the relevant stock and user objects.

Create Event Subscription for stock
- onEsSubmit
- Creates event subscriptions using parameters inputted by user (onChangeEsAmount(e), onChangeEsParameter(e)) for specific stock selected and userID, by pushing a new object to the event Subscription array object in the relevant 
stock and user objects.

Add Stock to Watchlist
- onAddWatchList
- Adds selected stock (selected through the search by the user) to a pre-existing watchlist selected by the user.

componentDidMount()
- Gets user data such as user Funds for the component in order to check if buy orders placed are valid




/frontend/src/components/EventSubscriptions/event-subs.component.js
Edit a Subscription
- async onEdit(e) queries for the specific subscription the user wants to edit by using a subscription ID. It then updates the existing subscription with new notification parameters that the user would input. 

Remove a Subscription
- onRemove(e) queries for the specific subscription the user wants to remove using a subscription ID


------


/frontend/src/components/Dashboard/register-user.component.js
Create Account
- onCreateUser
- Gets parameters to create a user (onChangeEmail, onChangeUsername, onChangePassword) to create an account. Will only create an account if the username and email are unique (though a post request). If not, the user will receive
a warning and the account will not be created.

/frontend/src/components/Watchlist/watchlist-page.component.js

componentDidMount()
- Gets user’s existing watchlist collection to be rendered on the page 

Add a New Watchlist
- onAdd(e) appends an object containing a watchlist name and an empty watchlist array to the user’s watchlist collection.

Remove a Stock from a Watchlist
- onRemoveStock(e) is paired with onSelect(e) to do the process of removing a stock from a user’s watchlist
onSelect(e) detects the selected stock from the watchlist table and retrieves that stocks information such as it’s symbol and full name.
This information is then used in onRemoveStock(e) which queries the user’s watchlist collection to find and remove that stock from the given watchlist. 




REST API DETAILS


Backend Files:

/backend/routes/users.js

The routes/users.js file has files that pertains to making changes to the user collection, or a single user

router.route('/:id').get
- Get request that returns the user object whose ID matches the id requested (:id in the route)

router.route('/add').post
- Post request that adds a user to the user collection, typically called upon once a user registers for an account

router.route('/update/:id').post
- Post request that updates certain parameters in the user object, depending on what is sent
- ex: if the post request contains on {"eventSubscriptions": [{data}]}, the eventSubscription object in the user object will update to the value sent via the post request

router.route('/:id/update/ES/').post
- Post request that pushes a new object to the eventSubscriptions array in the user object given by the user :id in the request parameters

router.route('/:id/update/ES/update/').post
-  Post request that updates a specific event subscription with new notification parameters for the user given by the user :id in the request parameters

router.route('/:id/update/ES/update/remove').post
- Post request that removes a subscription from the user’s list of eventSubscription for the user given by the user :id in the request parameters

 router.route('/update/buyorder/:id').post
- Post request that pushes a new buy order to the unpBuyOrders (unprocessed buy orders) array in the user object for the user given by the user :id in the request parameters

router.route('/update/sellorder/:id').post
- Post request that pushes a new sell order to the unpSellOrders (unprocessed sell orders) array in the user object for the user given by the user :id in the request parameters

router.route('/delete/sellorder/:id').post
- Post request that pulls a sell order from the unpSellOrders by finding the orderID and deleting it from the array for the user given by the user :id in the request parameters

router.route('/delete/buyorder/:id').post
- Post request that pulls a buy order from the unpBuyOrders by finding the orderID and deleting it from the array for the user given by the user :id in the request parameters

router.route('/:id/watchlist/add').post
- Post request creates an empty watchlist and adds it to the watchlistCollection array for the user given by the user :id in the request parameters. This will also set a name attribute for the new watchlist so that they can be queried individually.

router.route('/:id/watchlist/').get
- Get request gets the entire watchlist collection of  the user given the user :id in the request parameters

router.route('/:id/watchlist/:wid').get
- Get request queries a specific watchlist by the name (:wid)  given in the request parameters  for the user given by the user :id  the request parameters


router.route('/:id/watchlist/update/add').post
- Post request pushes a new stock object to a specific watchlist with the watchlist name given in the request body for the user given by the user :id  the request parameters

router.route('/:id/watchlist/update/remove').post
- Post request queries a stock in a specific watchlist, both provided in the request body, and deletes that stock from that watchlist for the user given by the user :id  the request parameters

router.route('/:id/watchlist/remove').post
- Post request removes a watchlist by querying the watchlist name in the user’s watchlist collection, which is provided in the request body. 



/backend/routes/stocks.js

router.route('/:stockAbbreviation').get
- get request that returns the user object whose stock abbreviation matches the stock abbreviation requested (:stockAbbreviation in the route)

router.route('/update/:stockAbbreviation').post
- post request that updates certain parameters in the user object, depending on what is sent
- ex: if the post request contains on {"buyOrders": [{data}]}, the buyOrders object in the stock object will update to the value sent via the post request

router.route('/update/ES/:stockAbbreviation').post
- post request that pushes a new object to the eventSubscriptions array in the stocks object

router.route('/update/buyorder/:stockAbbreviation').post
- post request that pushes a new buy order to the buyOrders array in the stocks object

router.route('/update/sellorder/:stockAbbreviation').post
- post request that pushes a new sell order to the sellOrders array in the stocks object

router.route('/delete/sellorder/:stockAbbreviation').post
- post request that pulls a sell order from the sellOrders by finding the orderID and deleting it from the array

router.route('/delete/buyorder/:stockAbbreviation').post
- post request that pulls a sell order from the buyOrders by finding the orderID and deleting it from the array

router.route('/delete/buyorder/:stockAbbreviation').post
- post request that pulls a sell order from the buyOrders by finding the orderID and deleting it from the array





-----

In terms of additional expectations, we have made a React application setup with a working database. Data from the database is also rendered on the home page, such as unprocessed buy orders, sell orders, event subscriptions, user funds, etc. AJAX interactions on the React application, such as post and get requests, are done using Axios - which sends posts/get requests to the backend.

Data is rendered in the website through react using various component functions and get requests. For example, when rendering the users event subscriptions, a get request is made to acquire the users event subscriptions, and
displays the information acquired in the render() function within the component.

The rendering process is done using JSX, which is an inline markup language that gets transformed into Javascript. While JSX is not defined as a templating engine like Pug or Ejs, it allows developers to define inline HTML elements within Javascript expressions, which can then be rendered to a webpage directly through Javascript function calls. Templating engines such as  Pug are rendered by compiling separate pug template files within Javascript by requiring the pug module and calling pug.compile on a chosen template file. These templates can actually take in parameters which can be dynamically rendered on the page. JSX achieves the same goal. 

