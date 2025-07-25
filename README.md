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

## DB Model (v3)
[![capstone-db-v3.png](https://i.postimg.cc/Yqr9JZS2/capstone-db-v3.png)](https://postimg.cc/6TPtZHRF)

## API Reference

### User Entity (/user)

- Get user by email

```http
  GET /get-user-by-email/{userEmail}
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| - | user email | 200 user body, 404 user not found & 500 Internal Server Error | The same user, any doctor & admin |

- Create User

```http
  POST /create-new-user
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| user body | - | 201 user body, 409 the user already exists & 500 Internal Server Error | The same user & admin |

- Update User Info

```http
  POST /update-user-info
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| user body | - | 200 user body & 500 Internal Server Error | The same user & admin |

- Delete User

```http
  POST /delete-user
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| user email | - | 204 no body & 500 Internal Server Error | The same user & admin |

### Appointment Entity (/appointment)

- Get All Patient Appointments

GET /get-all-patient-appointments/{patientId}
| Body | Headers | Response | Authorization |
| :--- | :------ | :------- | :------------ |
| - | patientId (path param) | 200 appointment list, 500 Internal Server Error | The patient, doctors & admin |

Curl:
curl -X GET "https://your-api-domain/appointment/get-all-patient-appointments/{patientId}" -H "Authorization: Bearer <token>"


- Get Active Patient Appointments

GET /get-active-patient-appointments/{patientId}
| Body | Headers | Response | Authorization |
| :--- | :------ | :------- | :------------ |
| - | patientId (path param) | 200 appointment list, 500 Internal Server Error | The patient, doctors & admin |

Curl:
curl -X GET "https://your-api-domain/appointment/get-active-patient-appointments/{patientId}" -H "Authorization: Bearer <token>"


- Get Active Doctor Appointments

GET /get-active-doctor-appointments/{doctorId}
| Body | Headers | Response | Authorization |
| :--- | :------ | :------- | :------------ |
| - | doctorId (path param) | 200 appointment list, 500 Internal Server Error | The doctor of the appointment, admin |
Curl:
curl -X GET "https://your-api-domain/appointment/get-active-doctor-appointments/{doctorId}" -H "Authorization: Bearer <token>"



- Get All Doctor Appointments

GET /get-all-doctor-appointments/{doctorId}
| Body | Headers | Response | Authorization |
| :--- | :------ | :------- | :------------ |
| - | doctorId (path param) | 200 appointment list, 500 Internal Server Error | The doctor of the appointment, admin |

Curl:
curl -X GET "https://your-api-domain/appointment/get-all-doctor-appointments/{doctorId}" -H "Authorization: Bearer <token>"


- Create a New Appointment

POST /create-new-appointment
| Body | Headers | Response | Authorization |
| :--- | :------ | :------- | :------------ |
| { patientId, doctorId, status (optional), reason, scheduleDate } | - | 201 appointment body, 400 bad request (invalid date), 409 patient already has appointment, 500 Internal Server Error | The same user & admin |

Curl:
curl -X POST "https://your-api-domain/appointment/create-new-appointment" -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"patientId":123,"doctorId":456,"status":"PENDING","reason":"Checkup","scheduleDate":"2025-08-01T10:00:00Z"}'


- Reschedule an Appointment

PUT /reschedule-appointment
| Body | Headers | Response | Authorization |
| :--- | :------ | :------- | :------------ |
| { id, scheduleDate } | - | 200 updated appointment body, 400 bad request (invalid date), 500 Internal Server Error | The user and the doctor of the appointment, admin |

Curl:
curl -X PUT "https://your-api-domain/appointment/reschedule-appointment" -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"id":789,"scheduleDate":"2025-08-05T14:00:00Z"}'


- Change Appointment Status

PUT /change-appointment-status
| Body | Headers | Response | Authorization |
| :--- | :------ | :------- | :------------ |
| { id, status } | - | 200 updated appointment body, 500 Internal Server Error | The user and the doctor of the appointment, admin |

Curl:
curl -X PUT "https://your-api-domain/appointment/change-appointment-status" -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"id":789,"status":"CANCELLED"}'

### Medical History Entity (/medical-history)

- Get complete patient medical history

```http
  GET /get-patient-medical-history/{patientId}
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| - | user id | 200 Medical History list & 500 Internal Server Error | The same user, any doctor & admin |

- Create Medical History

```http
  POST /create-medical-history
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| medical history body | - | 201 medical history body & 500 Internal Server Error | Any doctor & admin |

### Medicine Entity (/medicine)

- Get The Complete Medicine Inventory

```http
  GET /get-all-medicine
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| - | - | 200 Medicine list & 500 Internal Server Error | Doctor, Pharmacist and Admin |

- Register New Medicine

```http
  POST /register-new-medicine
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| medicine body | - | 201 medicine body & 500 Internal Server Error | pharmacist & admin |

- Restock Medicine

```http
  PUT /restock-medicine
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| medicine id & quantity | - | 200 medicine body, 400 Bad Quantity & 500 Internal Server Error | pharmacist & admin |

### Prescription Entity (/prescription)

- Get Prescriptions By Patient

```http
  GET /get-prescriptions-by-patient/{patientId}
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| - | patient id | 200 Prescription list & 500 Internal Server Error | The patient, Doctor, Pharmacist and Admin |

- Get Prescriptions By Id

```http
  GET /get-prescriptions-by-id/{prescriptionId}
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| - | prescription id | 200 Prescription body, 404 The prescription doesn't exist & 500 Internal Server Error | The patient, Doctor, Pharmacist and Admin |

- Get Medicine By Prescription Id

```http
  GET /get-medicine-by-prescription/{prescriptionId}
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| - | prescription id | 200 Medicine List & 500 Internal Server Error | The patient, Doctor, Pharmacist and Admin |

- Create Prescription

```http
  POST /create-prescription
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| Prescription body | - | 201 Prescription body & 500 Internal Server Error | Doctors and Admin |

- Add Medicine To Prescription

```http
  POST /add-medicine-to-prescription
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| Medicine_Prescription body | - | 201 Medicine_Prescription body & 500 Internal Server Error | Doctors and Admin |

- Dispense Prescription

```http
  POST /dispense-prescription/{prescriptionId}
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| - | prescription id | 200 Prescription body & 500 Internal Server Error | Pharmacist and Admin |
