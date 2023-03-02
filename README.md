# Members Only Site

This is a messaging board app built with Express.js, Node.js, Passport.js, and Pug. It allows users to sign up, log in, and create messages on a message board. Users can also enter a secret passcode to become an admin and gain access to the delete function for removing messages. Additionally, users must enter another secret passcode to become a true member and gain access to view the usernames and timestamps of other users posting on the message board.

**Without membership:**

![](/public/images/1.png)

**After membership:**

![](/public/images/3.png)

# Technologies
- Express.js (API and routing)
- Node.js (Server-side hosting and function)
- Passport.js (User authentication and authorization)
- MongoDB (Non-relational database)

# Features
- User authentication and authorization using Passport.js
- Ability for users to sign up, log in, and create messages
- Admin access to delete messages using a secret passcode (PASSCODE: `yourmomiscool`)
- Member access to view usernames and timestamps using a secret passcode (PASSCODE: `administhecoolest`)

# Installation

1. Clone the repository
```console
git clone https://github.com/qymmore/members-only.git
```
2. Install dependencies
```console
npm install
```
3. Start the server
```console
DEBUG=members-only:* npm run devstart
```
4. Visit http://localhost:3000 in your browser to use the app.

# Usage
To use the app, follow these steps:

- Sign up for an account using a username and a secure password.
- Log in to your account using your username and password.
- Create a message by entering your desired message text and clicking the "Create Message" button.
- To view usernames and timestamps as a member, enter the secret passcode provided to you.
- To delete a message as an admin, enter the secret passcode provided to you and click the "Delete" button next to the message you want to remove.

# Contributions
If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request. Contributions are always welcome!
