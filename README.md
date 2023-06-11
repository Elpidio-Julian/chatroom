# **Chat Application Using [Socket.io](https://socket.io/docs/v4/)**

Chat application built using PERN stack

# **Broad Requirements:**
>*User Demands:*
 >1. ability to send and receive messages
 >2. live message feedback
 >3. private messaging
 >4. options for room joining/leaving
 >5. Keep track of rooms for user

>*Server Demands:*
 >1. ability to receive and send messages
 >2. Possible addition of backing up messages using a postgresql database

## Client Approach using [React](https://react.dev/reference/react)

1. Ability to connect to socket
2. Ability to 'message' socket
    - form input for typing messages and submitting them
3. Ability to receive 'message' events from socket
    - Requires window for viewing messages

## New Feature Planning
    1. side panel react component
        - holds conversations with contacts
        - allows for new conversations to be started
        - requires conversation state
        - will need to receive private messages
        - will need to be able to interact with chat window to change to different conversations
    2. user authentication 
        - frontend user state management
        - database auth
        - password encryption with bcrypt
        
    3. private messaging
    4. message edits
    5. message storage and automatic deletion after two weeks

## Testing build
 1. run 'npm run build'
 2. run 'npm run seed' for first time seeding
 3. run 'npm run server'
 4. open localhost:3000/chat for chat window route

## Starting database
 1. sudo service postgresql start
 2. database name is 'chat-storage'

## database tables
users will require and id, username, and password

- id SERIAL PRIMARY KEY
- username VARCHAR(255) UNIQUE NOT NULL
##### encrypt passwords with bcrypt
- password VARCHAR(255) NOT NULL

messages will require, id, authorId, date, and the message

- id SERIAL PRIMARY KEY
- "authorId" INTEGER REFERENCES users( id )
- date_sent DATE NOT NULL DEFAULT CURRENT_DATE
- message TEXT NOT NULL

private_messages will require id, authorId, receiverId, date, and the message
- id SERIAL PRIMARY KEY
- "authorId" INTEGER REFERENCES users( id )
- "receiverId" INTEGER REFERENCES users( id )
- date_sent DATE NOT NULL DEFAULT CURRENT_DATE
- message TEXT NOT NULL

groups will require id, date, name
- id SERIAL PRIMARY KEY
- name VARCHAR(255) NOT NULL
- date_created DATE NOT NULL DEFAULT CURRENT_DATE

group_messages will require id, group_id, authorId, date, and the message
- id SERIAL PRIMARY KEY
- group_id INTEGER REFERENCES groups( id )
- "authorId" INTEGER REFERENCES users( id )
- date_sent DATE NOT NULL DEFAULT CURRENT_DATE
- message TEXT NOT NULL

### **Helpful Links**

#### *Documentation for packages*
- [Bootstrap docs](https://getbootstrap.com/docs/5.3/getting-started/introduction/)

- [Socket.io docs](https://socket.io/docs/v4/)

- [React docs](https://react.dev/reference/react)

- [Express docs](https://expressjs.com/en/4x/api.html)

#### *Helpful articles*

- [Rendering react app using express server in node](https://levelup.gitconnected.com/how-to-render-react-app-using-express-server-in-node-js-a428ec4dfe2b)

- [Pushing updates using mercure( for possible mobile push notification addition in order to bypass the disadvantage of socket.io requiring a constant connection )](https://symfony.com/doc/current/mercure.html#running-a-mercure-hub)

- [Socket.io advantages/disadvantages at scale](https://ably.com/topic/scaling-socketio#who-uses-socket-io-at-scale)