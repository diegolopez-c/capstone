[![Clinic-All-Logo](https://i.postimg.cc/zB3rRfCN/Clinic-All-2.png)](https://postimg.cc/tZ0fKpvv)

# ClinicAll

Diego Lopez's Meta University 2025 capstone project repository



## Run Locally

Clone the project

```bash
  git clone git@github.com:diegolopez-c/capstone.git
```

Go to the project directory

```bash
  cd capstone
```

### Run the frontend

Go to the frontend directory

```bash
  cd frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

### Run the backend

Go to the backend directory

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Tech Stack

**Auth:** Auth0

**Client:** React, TailwindCSS, HeroUI

**Server:** Node, Express

**Database:** PostgeSQL

## Documentation

[Project Plan](https://docs.google.com/document/d/1qoJoXPJok7kwXCJf8AldgJLe2GkBrBhhVwUY3S81nwI/edit?usp=sharing)

[Challenge Timeline](https://docs.google.com/document/d/1daAiCJdwR45KClxXHhtcAx46PyK93lW91kUE1lQ22-A/edit?usp=sharing)


## API Reference

### User Entity

- Get user by email

```http
  GET /get-user-by-email/:userEmail
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| - | user body | 200 + user body | The same user, any doctor & admin |

- Create User

```http
  POST /create-new-user
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| user body | - | 201 + user body | The same user & admin |

- Update User Info

```http
  POST /update-user-info
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| user body | - | 200 + user body | The same user & admin |

- Delete User

```http
  POST /delete-user
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| user email | - | 204 | The same user & admin |

### Appointment Entity

