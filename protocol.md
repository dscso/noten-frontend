# Loginrequest
    /login [POST]

### Parameter:
    username: (mail)
    password: (password)

### Response:
```JSON
{
    tocken: "token valid for 30 days",
    expiration: "UNIX timestamp"
}
```
The token will be saved as a cookie (called *token*) and will be send with every further request
# Userinfo
    /me [GET]

### Parameter
    token
### Response
```JSON
{
    firsname: "The first name",
    surname: "The family name",
    uid: "the user id in the database used to make requests",
    type: "1 SEKI, 2 SekII, 3 teacher, 4 admin",
}
```

This request returns general userinfo used by the webiterface

# Teacher get classes
    /teacher/<teacherid>/courses [GET]
### Parameter
    token
### Response
```JSON
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

This will be fetched when the teacher is logging in and the client shows all courses the teacher teaches

# get Students of course
    /courses/<courseid>/students [GET]
### Parameter
    token
### Repsonse
```JSON
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
