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

## Unit/Integration testing: Testing Express Applications: Chapter 9
- Added test sample using Mocha and Chai
- Added sample integration testing using supertest
```
  capitalize
    √ Capitalizes words
    √ Capitalizes a sentence
    √ Leaves the empty string as is

  plain text response
    √ returns a plain text response (136ms)
    √ returns your User Agent


  5 passing (347ms)
```
- Used cheerio (Similar to JQuery for Node to traverse dom)
```
  capitalize
    √ Capitalizes words
    √ Capitalizes a sentence
    √ Leaves the empty string as is

  plain text response
    √ returns a plain text response (155ms)
    √ returns your User Agent (40ms)

  html response
    √ returns an HTML response (48ms)
    √ returns your User Agent (64ms)


  7 passing (493ms)
```

## Implementing Security to Application: Chapter 10
- Learnt to use https with express and using HSTS
- Used csrf prevention using csurf module
- Used few basic safeguards using helmet
```
app.use(helmet.frameguard("sameorigin")); // using same origin policy
app.use(helmet.noSniff()); // Don't let browsers infer the file type
app.use(helmet.xssFilter()); // Against the cross site scripting attack. It does not complety prevents from the attack but provides some safeguards.
```