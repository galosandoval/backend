# Back-End
How-To-Life-Hacker

## Documentation

Base URL for deployed API: https://life-hacker-backend.herokuapp.com/

## **Endpoints**

| Method | URL | Description | Requires Token |
|--------|-----|-------------|----------------|
| POST | /register | register a new user | - |
| POST | /login | login as existing user | - |
| POST | /howto | create a new howto | X |
| POST | /steps | creates a new step | X |
| GET | /howto | gets all howtos | X |
| GET | /howto/:id | gets a specific howto | X |
| GET | /howto/:id/steps | gets a specific howtos steps | X |
| GET | /steps | gets all steps | X |
| GET | /steps/:id | gets a specific step | X |
| GET | /user/ | gets all users | X |
| GET | /user/:id | gets specific user | X |
| GET | /user/:id/howto | gets all howtos authored by a user | X |
| PUT | /howto/:id | edit a howto | X |
| PUT | /steps/:id | edit a step | X |
| PUT | /user/:id | edit a user | X |
| DELETE | /howto/:id | delete a howto | X |
| DELETE | /steps/:id | delete a step | X |
| DELETE | /user/:id | delete a user | X |

Note: If you try to delete a user that has authored any how-tos, you will not be able to. You must first delete all of the user's howtos before deleting the user.

## **Table Requirements**

## **User**

| Name | Type | Required | Unique | Notes |
|------|------|----------|--------|-------|
| id | integer | yes | yes | auto generated by the API |
| username | string | yes | yes | - |
| email | string | yes | yes | - |
| password | string | yes | no | - |

# **How-To**

| Name | Type | Required | Unique | Notes |
|------|------|----------|--------|-------|
| id | integer | yes | yes | auto generated by the API |
| title | string | yes | no | - |
| category | string | yes | no | - |
| description | string | yes | no | - |
| user_id | integer | yes | no | Must be a valid user's id, this will be the author |

# **Steps**

| Name | Type | Required | Unique | Notes |
|------|------|----------|--------|-------|
| id | integer | yes | yes | auto generated by the API |
| howto_id | integer | yes | no | Must be a valid howto id |
| description | string | yes | no | - |

## **Login's**

If i need to update the database at any point during the week all users made up until that point will be deleted. These logins will always be available to use. Users have the choice to login with either username or email.
| username | email | password |
| ----- | -------- | ---- |
| thisishowwedo | thisishowwedo@gmail.com | password |
| gottacatchemall | gottacatchemall@gmail.com | password |

## **Requests and Returns**

### POST /register
Request body:
```
{
    "username": "test",
    "email": "test@gmail.com,
    "password": "password"
}
```
Returns:
```
{
    "data": {
        "id": 10,
        "username": "test",
        "email": "test@gmail.com",
        "password": "$2a$08$LxYkKoSLPQc4wBoGmagqquC.H1GPbauvXasanIvVLkN8hAZhGriyG"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxMCwidXNlcm5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTYwMDc5MTczMywiZXhwIjoxNjAwODIwNTMzfQ.4o4JluGl3OE-wI3ALcO3GhAGvIvmM5mfWMYcJjOEU54"
}
```

### POST /login
Request body:
```
{
    "username": "test",
    "email": "test@gmail.com,
    "password": "password"
}
```
Returns:
```
{
    "message": "Welsome to our API",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxMCwidXNlcm5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTYwMDc5MTc5NSwiZXhwIjoxNjAwODIwNTk1fQ.PUe65QPPUEFMawIkLum4ymRB8cu9IZiQ5efZfV0R-dA"
}
```


### POST /howto
Request body:
```
{
    "title":"New how to",
    "category":"New category",
    "description":"New description",
    "user_id":1
}
```
Returns:
```
{
    "message": "Congrats, you added a new howto",
    "addition": {
        "id": 4,
        "title": "New how to",
        "category": "New category",
        "description": "New description",
        "user_id": 1
    }
}
```

### POST /steps
Request body:
```
{
    "howto_id":4,
    "description":"test"
}
```
Returns:
```
{
    "message": "Congrats, you added a new step",
    "addition": {
        "id": 15,
        "howto_id": 4,
        "description": "test"
    }
}
```

### GET /howto
Returns:
```
{
    "howto": [
        {
            "id": 1,
            "title": "How to Register to Vote",
            "category": "Voting",
            "description": "If you're eligible, it's part of your civic duty to vote on Election Day. ",
            "user_id": 1
        },
        {
            "id": 2,
            "title": "How to Make a Great Pokemon Team",
            "category": "Pokemon",
            "description": "Do you feel like after becoming the champion, there's something wrong? Is that gym leader/Pokémon League member driving you nuts? Well, here's a guide on how to fix that!",
            "user_id": 2
        },
        {
            "id": 3,
            "title": "How to Find Out if You Have Already Had Coronavirus",
            "category": "COVID 19",
            "description": "To see if you’ve had COVID-19 in the past, you can get an antibody test from your local healthcare provider. ",
            "user_id": 1
        },
        {
            "id": 4,
            "title": "New how to",
            "category": "New category",
            "description": "New description",
            "user_id": 1
        }
    ]
}
```

### GET /api/users
Returns:
```
{
    "users": [
        {
            "id": 1,
            "username": "user",
            "password": "$2a$08$E1Mb2BVrVHK58uLzBXqLMe26YxPfCr6cZv9R8e/mQU149KRbt5lSy",
            "isAdmin": false
        },
        {
            "id": 2,
            "username": "admin",
            "password": "$2a$08$8VcxZDSmdRdn84DQFKvlxeGyoBgSM5DWC/k8kpKSpfIjUKoym3cqK",
            "isAdmin": true
        },
        {
            "id": 3,
            "username": "christian",
            "password": "$2a$08$OjzHVTJ4aHSp5Um0Rbx4pOSFMAwo4N6HyWxsZYZvCbSqHeah/phZe",
            "isAdmin": true
        },
        {
            "id": 4,
            "username": "dave",
            "password": "$2a$08$TYVHWtzV4ffoFuKvBIW7r.nBs0dP7bcx1IY5rBwsOgxx84JXqlrze",
            "isAdmin": false
        },
        {
            "id": 5,
            "username": "dave1",
            "password": "$2a$08$.gzYBf9eeb/OsQEhsFWHF.HR1nO9AAEudBKyQqHzTD28GCiZ/O0lW",
            "isAdmin": true
        },
        {
            "id": 6,
            "username": "example",
            "password": "$2a$08$Swr0TBG39oQS.S5QWWbbre/A6VtKH32/bk0Vr1nUD5vgDnkFtbQy.",
            "isAdmin": true
        },
        {
            "id": 7,
            "username": "example2",
            "password": "$2a$08$21MSmMRVC6E8rgaxzpmjtewo.WrjsCu9C0c6bLgKTI7QKBqED7tYe",
            "isAdmin": false
        }
    ]
}
```

### GET /api/users/:id
Returns:
```
{
    "user": {
        "id": 3,
        "username": "christian",
        "password": "$2a$08$OjzHVTJ4aHSp5Um0Rbx4pOSFMAwo4N6HyWxsZYZvCbSqHeah/phZe",
        "isAdmin": true
    }
}
```

### GET /api/howtos/:id
Returns:
```
{
    "howto": {
        "id": 1,
        "title": "How to Win a Game of Chess",
        "author": "christian",
        "user_id": 3,
        "category": "games",
        "content": "Step 1: Tell your opponent that you are a grand master in order to psych them out. Step 2: If your opponent calls your bluff, try your best to win. Step 3: If you start getting close to losing, flip the board and say that you're late for a chess meeting. Step 4: Checkmate."
    }
}
```

### GET /api/users/:id/howtos
Returns:
```
{
    "howtos": [
        {
            "title": "test",
            "author": "admin",
            "user_id": 2,
            "category": "test",
            "content": "test"
        }
    ]
}
```

### PUT /api/users/:id
Request body:
```
{
    "username": "christian39",
    "password": "testing",
    "isAdmin": true
}
```
Returns:
```
{
    "message": "User with id 5 updated successfully",
    "user": {
        "id": 5,
        "username": "christian39",
        "password": "testing",
        "isAdmin": true
    }
}
```

### PUT /api/howtos/:id
Request body:
```
{
    "user_id": 2,
    "title": "testing",
    "category": "testing",
    "content": "testing"
}
```
Returns:
```
{
    "message": "Howto with id 7 successfully updated",
    "howto": {
        "id": 7,
        "title": "testing",
        "author": "admin",
        "user_id": 2,
        "category": "testing",
        "content": "testing"
    }
}
```

### DELETE /api/users/:id
Returns:
```
{
    "message": "User with id 7 successfully deleted",
    "deletedUser": {
        "id": 7,
        "username": "example2",
        "password": "$2a$08$21MSmMRVC6E8rgaxzpmjtewo.WrjsCu9C0c6bLgKTI7QKBqED7tYe",
        "isAdmin": false
    }
}
```

### DELETE /api/howtos/:id
Returns:
```
{
    "message": "Howto with id 7 deleted successfully",
    "deletedHowto": {
        "id": 7,
        "title": "testing",
        "author": "admin",
        "user_id": 2,
        "category": "testing",
        "content": "testing"
    }
}
```