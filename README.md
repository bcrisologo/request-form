# Request-Form
A simple request form template for businesses that provide services.

Default index page as shown below.
![](https://github.com/bcrisologo/request-form/blob/master/public/images/default-index-page.png)


Once the entries are completed and the user chooses **Submit**, it redirects to a success page.
![](https://github.com/bcrisologo/request-form/blob/master/public/images/successful-submission.png)


On the List of Forms page, all entries in the database are listed as a table with the option of **Edit** and **Delete**.  

If you select the 'Delete' button, a confirmation pop-up will be triggered.
![](https://github.com/bcrisologo/request-form/blob/master/public/images/forms-list-page.png)

**Update (06/04/2020):** Added sort by 'First', 'Last', 'Organization', or 'Date' table headers.

When choosing 'Edit', you are redirected to the data block's entries and the ability to update the information.

If you choose 'Cancel' on the page, a confirmatio pop-up will be triggered.  If you choose 'Cancel', it will redirect to the List of Forms page.  If you choose 'Update', the entries will be updated in the database.
![](https://github.com/bcrisologo/request-form/blob/master/public/images/edit-form-page.png)


## Setup
Install the necessary packages and dependencies
```
npm install
```
To run the form, simply use:
```
nodemon
```

## Database Notes
The current database setup is using a local MongoDB connection as seen on **app.js** line below.
```javascript
const url = 'mongodb://localhost/requestform';
```
There is the option of changing from local to MongoDB Atlas by changing the line to something similar shown.
```javascript
const url = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/request-form?retryWrites=true&w=majority';
```
You will need to setup the correct database user credentials and ensure that you have a MongoDB Atlas account.

There are articles online that shows how to setup the connection to Atlas similar to [this tutorial](https://studio3t.com/knowledge-base/articles/connect-to-mongodb-atlas/).


This project was built using Express, NodeJS, MongoDB and Bootstrap.
