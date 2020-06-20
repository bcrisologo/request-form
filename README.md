# Request-Form with Administrator Authorization
A simple request form template for businesses that provide services to clients.  An administrator is also created to access the submitted forms that are restricted access from the general public.

* **Update (06/04/2020):** 
  * Added sort by 'First', 'Last', 'Organization', or 'Date' table headers.  

* **Update (06/07/2020):** 
  * Updated Forms List page to include Search through Names and Organization fields.

* **Update (06/14/2020):** 
  * Added an "Admin Login" feature that restricts access of the submitted forms list ('/forms') unless Admin user has inserted credentials.
  * All pages (except for the Success page and the Login page) have a navigation bar placing the "Company Name"
  * All pages that has access to the database has a "Logout" button on the navigation bar.
* **Update (06/16/2020):**
  * Added "Admin Settings" page that allows the change of password for the admin account but needs verification before it can be changed
  * Updated navbar and CSS style for "Admin Settings" and "Logout" buttons
* **Update (06/18/2020):**
  * Updated error message display on incorrect admin password change

Default index page as shown below.
![](https://github.com/bcrisologo/request-form/blob/master/public/images/default-index-page.png)


Once the entries are completed and the user chooses **Submit**, it redirects to a success page.
![](https://github.com/bcrisologo/request-form/blob/master/public/images/successful-submission.png)


To access the list of submitted requests, user has to select the "Admin Login" button on the navigation bar.  The Admin login page can be seen below.
![](https://github.com/bcrisologo/request-form/blob/master/public/images/admin-login-page.png)


When admin credentials are submitted succesfully, the client will be redirected to the List of Forms page.

On the List of Forms page, all entries in the database are listed as a table with the option of **Edit** and **Delete**.  If you select the 'Delete' button, a confirmation pop-up will be triggered.
![](https://github.com/bcrisologo/request-form/blob/master/public/images/forms-list-page.png)

When choosing 'Edit', you are redirected to the data block's entries and the ability to update the information.

If you choose 'Cancel' on the page, a confirmation pop-up will be triggered.  If you choose 'Cancel', it will redirect to the List of Forms page.  If you choose 'Update', the entries will be updated in the database.
![](https://github.com/bcrisologo/request-form/blob/master/public/images/edit-form-page.png)

The Forms List page has a Search bar that can query keywords in the First Name, Last Name, and Organization fields.
![](https://github.com/bcrisologo/request-form/blob/master/public/images/search-results-page.png)

The Admin Settings page is currently only allowed to change the user "admin" password.  But it needs a verification of the old password before it can be changed successfully, otherwise the password will log in the console as "IncorrectPasswordError".  As seen below is the current view page for the Admin settings.
![](https://github.com/bcrisologo/request-form/blob/master/public/images/adminsettings-page.png)

Once successful change of password, a redirect triggers showing successful change as seen below.
![](https://github.com/bcrisologo/request-form/blob/master/public/images/adminsettings-success-page.png)


## Setup
You need MongoDB installed locally to be able to generate the database configured.

Install the necessary packages and dependencies.
```
npm install
```
To run the form, simply use:
```
npm start
```
If you have nodemon installed ([link to nodemon usage here](https://www.npmjs.com/package/nodemon)), you can simply run ```nodemon``` to initiate the web server.

The web page can be accessed in the browser via "localhost:3000"

## Database Notes
The current database setup is using a local MongoDB connection as seen on **app.js** line below.
```javascript
const url = 'mongodb://localhost/requestform';
```
There is the option of changing from local to MongoDB Atlas by changing the line to something similar shown below:
```javascript
const url = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/request-form?retryWrites=true&w=majority';
```
You will need to setup the correct database user credentials and ensure that you have a MongoDB Atlas account.  There are articles online that shows how to setup the connection to Atlas similar to [this tutorial](https://studio3t.com/knowledge-base/articles/connect-to-mongodb-atlas/).

## Admin Login Notes
The default procedure is for the route file ```/routes/index.js``` to create the admin user with the username ```admin``` and password with a hash and salt field in the Schema when the login page is loaded.  There is also a check that prevents the recreation of the same user upon reboot of the web server.

You can edit the default username and password creation as seen in the line below:
```javascript
await AdminModel.register({username: 'admin', active: false}, 'testing');
```

## Footnotes:
This project was built using Express, NodeJS, MongoDB and Bootstrap.  Passport is the choice of authorization access for the Admin login.

Source code for sorting table arrangement was [referenced here](https://www.kryogenix.org/code/browser/sorttable/).

Possible features to be implemented:
- [x] ~~Allow the Admin to change password once logged in~~
- [ ] Add different authorized users (Admin of page and another lower-level access user) to perform certain tasks

Bug fixes:
- [x] ~~Error message when admin user password change verification fails (Updated 06/18/2020)~~
