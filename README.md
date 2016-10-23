# express_in_action_mongo
Simple learning app for express and mongoDB

The purpose of this app to learn using mongoDB together with express. Learnt the passport authentication module to authenticate user. All the URL starting with /users require authentication. /login, /signup are only public URL.

> Followed the book Express in action

## In this App, I have used
- mongoose to access mongoDB
- express router to setup routes
- connect-flash to show flash message
- EJS templating engine to render HTML
- passport and express-session for login/login with facebook feature


## This app has simple implementation of
- Users list (need authentication)
- Add users (need authentication)
- User's profile when clicked on user (need authentication)
- Edit/Delete user profile. Can add display name and bio additionally after signup (need authentication)
- Login page, which includes local login and facebook login option
- Signup for local login (only username and password is asked)
- logout