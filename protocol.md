# Loginrequest
    /login [POST]

### Parameter:
    username: (mail)
    password: (password)

### Response: 200/401
```JS
{
    tocken: "token valid for 30 days",
    expiration: "UNIX timestamp in seconds",
    firstname: "The first name",
    surname: "The family name",
    uid: "the user id in the database used to make requests",
    type: "1 SEKI, 2 SekII, 3 teacher, 4 admin",
}
```
The token will be saved as a cookie (called *token*) and will be send with every further request
# Userinfo
    /user/<userid> [GET]

### Parameter
    token
### Response 200/403/403
```JS
{
    firsname: "The first name",
    surname: "The family name",
    uid: "the user id in the database used to make requests",
    type: "1 SEKI, 2 SekII, 3 teacher, 4 admin",
}
```

This request returns general userinfo used by the webiterface

# Teacher get courses
    /teacher/<teacherid>/courses [GET]
### Parameter
    token
### Response 200/403/404
```JS
{
    courses: [{
        subject: "the kind of the course (math, physics etc.)",
        cid: "the id",
        generation: "SEKI/SEKII"
    }{
        ...
    }]
}
```

This will be fetched when the teacher is logging in and the client shows all courses the teacher teaches. **classes he teaches like ma-4 etc.**

# get Students of course
    /courses/<courseid>/students [GET]
### Parameter 200/403/404
    token
### Repsonse
```JS
{
    subject: "...",
    cid: "...",
    generation: "",
    students: [{
        firsname: "The first name",
        surname: "The family name",
        uid: "the id of the student"
    },{
        ...
    }]
}
```
This is used to render the colums of the table with the grades
# Error message

```JS
{
    error: 401/404,
    msg: "Humanreadable Message",
}