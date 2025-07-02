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

## DB Model
[![capstone-db-v2.png](https://i.postimg.cc/KzxBHHDJ/capstone-db-v2.png)](https://postimg.cc/PLVCLKcw)

## API Reference

### User Entity

- Get user by email

```http
  GET /get-user-by-email/{userEmail}
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| - | user email | 200 + user body | The same user, any doctor & admin |

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

- Create Appointment

```http
  POST /create-new-appointment
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| appointment body | - | 201 + appointment body | The same user & admin |


- Change Appointment Status

```http
  PUT /change-appointment-status
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| id + new status | - | 200 + appointment body | The user and the doctor of the appointment admin |

- Reschedule Appointment

```http
  PUT /reschedule-appointment
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| id + new schedule date | - | 200 + appointment body | The user and the doctor of the appointment admin |

- Get All Doctor Appointments

```http
  GET /get-all-doctor-appointments/{doctorId}
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| -  | doctorId | 200 + appointment list | The doctor of the appointment admin |

- Get Active Doctor Appointments (RESCHEDULED, CONFIRMED, PENDING)

```http
  GET /get-active-doctor-appointments/{doctorId}
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| -  | doctorId | 200 + appointment list | The doctor of the appointment admin |

- Get All Patient Appointments

```http
  GET /get-all-patient-appointments/{patientId}
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| -  | patientId | 200 + appointment list | The patient, doctors & admin |

- Get Active Patient Appointments (RESCHEDULED, CONFIRMED, PENDING)

```http
  GET /get-active-patient-appointments/{patientId}
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| -  | patientId | 200 + appointment list | The patient, doctors & admin |

### Medical History Entity

- Get complete patient medical history

```http
  GET /get-patient-medical-history/{patientId}
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| - | user id | 200 + medical history list | The same user, any doctor & admin |

- Create User

```http
  POST /create-medical-history
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| medical history body | - | 201 + medical history body | Any doctor & admin |