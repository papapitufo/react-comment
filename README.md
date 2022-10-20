# react-comments-module
A simple **Comments** implementation for articles, blogs, forums. This code is provided as plug and play to allow you to inject a **Comments section** in your app.

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

### If apiUrl doesn't do it for you
Pass a **CommentStore** to ReactComment.configuration

```
function CommentStore() {
    return {
        all:    () => {},
        add:    (payload) => {},
        remove: (id) => {},
        edit:   (id, payload) => {}
    }
}

<ReactComment
  configuration={
    {
      commentStore: CommentStore
    }
  }
/>

```
### Rendering
We use Material UI (mui) to help us out with our post rendering (see demo), but if you hate google you can extend **Model** and override **painter()**
to use your own magic.

```
import { Model } from 'react-comments-module';
class MagicModel extends Model {
  painter(props) {
    const { name, picture, id, comment, createdAt, userId } = this.attributes;
    return (
      <div>
        {comment}
      </div>
    )
  }
}

<ReactComment
  configuration={
    {
      CommentModel: MagicModel
    }
  }
/>
```
> See the Model to find out what attributes we expect to see when CRUDing. You can modify, map, or override the Model as your backend requires

### Events
We include some postEvents for those actions that are directly related to comments updates

```
<ReactComment
  onCommentAdded={commentAdded}
  onCommentUpdated={commentUpdated}
  onCommentRemoved={commentRemoved} 
/>
```
### Identity
We include an identity provider that presents itself as a convenient action to get Facebook and Googles userName and picture.
We want to include an anonymous provider for those cases when a formal identity is not needed. (later)
In case the IdentityProvider doesn't work for you, import the login button flows from 'social-login-react' and create your own identityProvider

```
import { FacebookSignIn, GoogleSignIn } from 'social-login-react';
function IdentityResolver(props) {
  //onIdentityObtained will seed the current context with the identity passed
  return (
    <FacebookSignIn
      appId={facebookClientId}
      onSuccessLogin={(data) => {
        props.onIdentityObtained({ picture: data.picture.data.url, ...data})
    }}
  />
  )
}

<ReactComment
  configuration={
    {
      IdentityProvider: IdentityResolver
    }
  }
/>

```
### TODO
We are using Facebooks [lexical editor](https://github.com/facebook/lexical) which is still in Beta.
This package itself will remain in Beta (or early dev) until issues list marked as 'feature' are all resolved. 

Issues list includes:
* Add anonymous Signin
* Allow customize Social Login buttons 
* Multiple levels of reply threading (forum style)
* and more ....
