This project is a full stack React/MongoDB application that allows users to register, log in, and then create, read, update and delete posts. It is very simple, showcasing the bare minimum needed to get things working. It is not meant to be a production ready application.

The main features that it showcases are:

1. User registration and login approximated by storing the user's email in localstorage. There is no encryption or tokens, and no route protection, so it is completely insecure, but it shows the basic concept of how to do it. The front end does conditionally render certain components based on whether the user is logged in or not, such as the create post and commenting systems, and additionally only shows edit and delete buttons if the user is the one who created the post. The app is refreshed every time the user logs in or out, so that the components that are conditionally rendered are updated. This is done using a function that is passed down from App.js that the relevant components call when the user logs in or out.

2. Posts and Comments reference the user that created them using ID's, which allows the use of populate to get the user's name and email. Populate is a method that allows you to get the data from a referenced document. In this case, the user's name and email are stored in the user document, and the post and comment documents reference the user document by ID. This means that when you get the post or comment, you can get the user's name and email by using populate, rather than having to store the user's name and email in the post and comment documents themselves. This is a good way to avoid redundancy, and makes it easier to update the user's name and email, as you only have to update it in one place.

3. Comments are subdocuments of posts, and are created and deleted by add or removing them from the post document itself. This is a good way to do it, as it allows you to get all the comments for a post by getting the post, and then getting the comments from the post document itself.

I will continue to add to this, such as more robust error handling and validation, image upload, and a proper authentication system, but it should serve as a basic framework that can help you figure out how to do things.

## Setup

1. Clone the repo
1. Create a `.env` file in the `back` directory and add the following:

```bash
DB_STRING=<your_mongo_uri>
PORT=3001
```

3. Run `npm install` in the `back` directory
1. Run `npx nodemon server.js` in the `back` directory to start the server
1. Run `npm install` in the `front` directory
1. Run `npm start` in the `front` directory to start the client
1. Register a user and then log in
1. Try it out!
