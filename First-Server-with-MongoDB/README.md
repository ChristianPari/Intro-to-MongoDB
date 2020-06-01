This is my first Express server implementing a MongoDB Atlas cluster as my Database! It will be a simple database containing users that have a name and an email. I will be using this simple project to really get down the basics and then once completed I will recreate this one or create a server with a new concept.

<h2>May 31, 2020</h2>
<b>6:00pm - 8:30pm</b><br>

First I intiliazed my project folder with npm and installed the packages I will be using for this project:
- Express
- Mongoose
- Dotenv
- Nodemon
- Morgan
- Validator

Next I setup my folders ahead of time; routes (route handling), middleware, public (serving static files), and models (for my moongoose Schema models).<br>

Began with creating my main server file being app.js and required all my packages and configured dotenv, then connected my Mongo Atlas cluster to my server. The database I am using was empty at first so I wanted to create new data to save to the collection. So I created a new file in my models folder titled 'User', and within I created a Schema for how a User document should look. Keeping it simple for my first time working with this I gave the Scehma name and email properties and declared the types, required and uniqueness. For the email though, I used the validator package which has a built-in method to check the value of the email property and ensures that it is a valid email structure, if not it throws an error.<br>

Then I exported the model from the file to be used elsewhere when I need it which I next created a POST request to my 'user' route. Within the 'user' route I created my const variables of the packages I will need and got started on my router.post request. To allow myself to use the 'await' expression I declare the request as async and then use 'try catch statement'; try => to create a new user from the request body data and then save it to the database, returns 201...catch => any errors that occur and return a json response with the error message.<br>

After testing and ensuring this worked, I moved onto the next request which was to GET a specific user from the database. This route had a request paramter (user_id) and then inside a middleware function I search the database using mongooses' 'find' method and search for the id that was requested, Atlas assigns each entry its' own unqiue ID so that is the one I used for this testing. I assign the data (wether was found or not) to a request property I created named foundUser and then within the actual callback function of the request I check if the request property is undefined; if so return 404, if not then return 200 with the document/users data.

