# react-comments-module
A simple **Comments** implementation for embedding into other apps. This code is provided as plug and play to allow you to inject a **Comments section** in your app.

- Facebook and Google login
- Reply to comments
- Light on dependencies
- Comments managed by consummer or provide an endpoint for the app to CRUD comments
- Plug and play

**Demo:** [react comments module](https://react-comment.herokuapp.com/)

### Run it locally to see what it can do
`npm install && npm run dev`

### Use it (https://www.npmjs.com/package/react-comments-module)
`npm install react-comments-module`

### Example
```
import React from 'react';
import { ReactComment } from 'react-comments-module';
...

<ReactComment
  configuration={
    {
     apiUrl: "/articles/12345/comments"
     showCount: true,
     facebookClientId: "12345678910111213",
     googleClientId: "12345678910111213-ghvhbdskjbsadjabsd.apps.googleusercontent.com",
     writeCommentPrompt: "Write a comment using :  ",
     allowEdit: true,
     allowDelete: true,
     allowReply: true
    }
  }
/>
```

#### When using **apiUrl** 
* `GET, POST, PATCH, DELETE` will be executed against **apiUrl** like:
* `GET /articles/12345/comments` will get you all comments
* `POST /articles/12345/comments` will add a new comment
* `DELETE /articles/12345/comments/23` will remove comment with id 23
