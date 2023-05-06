Chat-app

Made a live chat-app

Front end was created using React and Material UI and is deployed using Gh-pages
Back end was made using Node.js, Express, SocketIO, and Cors and it is deployed using Railway

Feel free to clone! 
How to run: 

front end

npm install @mui/icons-material @mui/material @emotion/styled @emotion/react
npm i socket.io-client react-router-dom

back end

npm i express socket.io cors

![LoginPage](https://user-images.githubusercontent.com/103802577/236588673-c9019e2c-cc9b-496b-8daf-ae140a403b1e.png)

The Login pages requires a username and chat room selected. Will send an alert if someone tries to join without those.
The sun icon is a dark mode toggle.

![loggedin](https://user-images.githubusercontent.com/103802577/236588937-7ec6cd18-8810-4e09-9be9-17e9a3be7622.png)

After user logs in, they will be put into a room which will be displayed at the top along with their name. The top right has the dark mode toggle.
When more users login, the active users section will populate each user.
IF someone were to open the url directly to the chat page, they will be redirected to the login page.

![messages](https://user-images.githubusercontent.com/103802577/236589292-93f640c1-f89b-4df9-963c-2d9adf33e06c.png)

Messages will be stored into a list that populates in the messages box with each send. If a user is already connected, they will see 
the x joined and left the chat messages.
The messages will auto scroll to the bottom

---

Some features I'd like to add later:
1. pictures and emoji support
2. If someone clicks the back button, the user isn't disconnected. Need to fix this.
3. Better mobile support. Looks kind of messy. Perhaps I can change the active users into button that will pop out into a modal.
