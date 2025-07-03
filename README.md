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

- Create Appointment

```http
  POST /create-new-appointment
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| appointment body | - | 201 appointment body, 400 bad request, 409 the patient already has an appointment & 500 Internal Server Error | The same user & admin |


- Change Appointment Status

```http
  PUT /change-appointment-status
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| id + new status | - | 200 appointment body & 500 Internal Server Error | The user and the doctor of the appointment admin |

- Reschedule Appointment

```http
  PUT /reschedule-appointment
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| id + new schedule date | - | 200 appointment body, 400 date not valid & 500 Internal Server Error | The user and the doctor of the appointment admin |

- Get All Doctor Appointments

```http
  GET /get-all-doctor-appointments/{doctorId}
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| -  | doctorId | 200 appointment list & 500 Internal Server Error | The doctor of the appointment admin |

- Get Active Doctor Appointments (RESCHEDULED, CONFIRMED, PENDING)

```http
  GET /get-active-doctor-appointments/{doctorId}
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| -  | doctorId | 200 appointment list & 500 Internal Server Error | The doctor of the appointment admin |

- Get All Patient Appointments

```http
  GET /get-all-patient-appointments/{patientId}
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| -  | patientId | 200 appointment list & 500 Internal Server Error | The patient, doctors & admin |

- Get Active Patient Appointments (RESCHEDULED, CONFIRMED, PENDING)

```http
  GET /get-active-patient-appointments/{patientId}
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| -  | patientId | 200 appointment list & 500 Internal Server Error | The patient, doctors & admin |

### Medical History Entity (/medical-history)

- Get complete patient medical history

```http
  GET /get-patient-medical-history/{patientId}
```

| Body      | Headers | Response     | Authorization                |
| :-------- | :-------- | :------- | :------------------------- |
| - | user id | 200 Medical History list & 500 Internal Server Error | The same user, any doctor & admin |

- Create User

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
