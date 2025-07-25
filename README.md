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
### Get User by Email

- **Endpoint:** GET /get-user-by-email/{userEmail}
- **Response:** 200 user body, 404 User not found, 500 Internal Server Error
- **Authorization:** The same user, any doctor & admin

**cURL Request:**

curl -X GET "http://localhost:8080.com/get-user-by-email/{userEmail}" -H 

### Create New User

- **Endpoint:** POST /create-new-user
- **Body:** name, lastname, email, birthDate, role
- **Response:** 201 user body, 409 User already exists, 500 Internal Server Error
- **Authorization:** The same user & admin

**cURL Request:**

curl -X POST "http://localhost:8080.com/create-new-user" -H "Content-Type: application/json" -d '{"name":"John","lastname":"Doe","email":"john.doe@example.com","birthDate":"1990-01-01","role":"USER"}'

### Update User Info

- **Endpoint:** PUT /update-user-info
- **Body:** email, other fields to update
- **Response:** 200 user body, 500 Internal Server Error
- **Authorization:** The same user & admin

**cURL Request:**

curl -X PUT "http://localhost:8080.com/update-user-info" -H "Content-Type: application/json" -d '{"email":"john.doe@example.com","name":"Johnathan"}'

### Delete User

- **Endpoint:** DELETE /delete-user
- **Body:** email
- **Response:** 204 No Content, 500 Internal Server Error
- **Authorization:** The same user & admin

**cURL Request:**

curl -X DELETE "http://localhost:8080.com/delete-user" -H "Content-Type: application/json" -d '{"email":"john.doe@example.com"}'

### Get User Name by ID

- **Endpoint:** GET /get-user-name-by-id/{userId}
- **Response:** 200 user name, 404 User not found, 500 Internal Server Error
- **Authorization:** The same user, any doctor & admin

**cURL Request:**

curl -X GET "http://localhost:8080.com/get-user-name-by-id/{userId}" -H 

### Get User by ID

- **Endpoint:** GET /get-user-by-id/{userId}
- **Response:** 200 user body, 404 User not found, 500 Internal Server Error
- **Authorization:** The same user, any doctor & admin

**cURL Request:**

curl -X GET "http://localhost:8080.com/get-user-by-id/{userId}" -H 

### Get Doctors Available

- **Endpoint:** GET /get-doctors-available
- **Response:** 200 list of available doctors, 500 Internal Server Error
- **Authorization:** Any user

**cURL Request:**

curl -X GET "http://localhost:8080.com/get-doctors-available" -H 


### Appointment Entity (/appointment)
### Get All Patient Appointments

- **Endpoint:** GET /get-all-patient-appointments/{patientId}
- **Response:** 200 appointment list, 500 Internal Server Error
- **Authorization:** The patient, doctors & admin

**cURL Request:**

curl -X GET "http://localhost:8080.com/get-all-patient-appointments/{patientId}" -H 

### Get Active Patient Appointments

- **Endpoint:** GET /get-active-patient-appointments/{patientId}
- **Response:** 200 appointment list, 500 Internal Server Error
- **Authorization:** The patient, doctors & admin

**cURL Request:**

curl -X GET "http://localhost:8080.com/get-active-patient-appointments/{patientId}" -H 

### Get Active Doctor Appointments

- **Endpoint:** GET /get-active-doctor-appointments/{doctorId}
- **Response:** 200 appointment list, 500 Internal Server Error
- **Authorization:** The doctor of the appointment admin

**cURL Request:**

curl -X GET "http://localhost:8080.com/get-active-doctor-appointments/{doctorId}" -H 

### Get All Doctor Appointments

- **Endpoint:** GET /get-all-doctor-appointments/{doctorId}
- **Response:** 200 appointment list, 500 Internal Server Error
- **Authorization:** The doctor of the appointment admin

**cURL Request:**

curl -X GET "http://localhost:8080.com/get-all-doctor-appointments/{doctorId}" -H 

### Create a New Appointment

- **Endpoint:** POST /create-new-appointment
- **Body:** patientId, doctorId, status, reason, scheduleDate
- **Response:** 201 appointment body, 409 conflict, 500 Internal Server Error
- **Authorization:** The same user & admin

**cURL Request:**

curl -X POST "http://localhost:8080.com/create-new-appointment" -H "Content-Type: application/json" -d '{"patientId":1,"doctorId":2,"status":"PENDING","reason":"Checkup","scheduleDate":"2023-12-01T10:00:00Z"}'

### Reschedule an Appointment

- **Endpoint:** PUT /reschedule-appointment
- **Body:** id, scheduleDate
- **Response:** 200 appointment body, 400 bad request, 500 Internal Server Error
- **Authorization:** The user and the doctor of the appointment admin

**cURL Request:**

curl -X PUT "http://localhost:8080.com/reschedule-appointment" -H "Content-Type: application/json" -d '{"id":1,"scheduleDate":"2023-12-01T10:00:00Z"}'

### Change Appointment Status

- **Endpoint:** PUT /change-appointment-status
- **Body:** id, status
- **Response:** 200 appointment body, 500 Internal Server Error
- **Authorization:** The user and the doctor of the appointment admin

**cURL Request:**

curl -X PUT "http://localhost:8080.com/change-appointment-status" -H "Content-Type: application/json" -d '{"id":1,"status":"CONFIRMED"}'


### Medical History Entity (/medical-history)

### Get Patient Medical History

- **Endpoint:** GET /get-patient-medical-history/{patientId}
- **Response:** 200 patient medical history, 500 Internal Server Error
- **Authorization:** The same user, any doctor & admin

**cURL Request:**

curl -X GET "http://localhost:8080.com/get-patient-medical-history/{patientId}" -H 

### Get Medical History by ID

- **Endpoint:** GET /get-medical-history-by-id/{medicalHistoryId}
- **Response:** 200 medical history, 500 Internal Server Error
- **Authorization:** The same user, any doctor & admin

**cURL Request:**

curl -X GET "http://localhost:8080.com/get-medical-history-by-id/{medicalHistoryId}" -H 

### Create Medical History

- **Endpoint:** POST /create-medical-history
- **Body:** patientId, doctorId, diagnosis, notes
- **Response:** 201 medical history, 500 Internal Server Error
- **Authorization:** Any doctor & admin

**cURL Request:**

curl -X POST "http://localhost:8080.com/create-medical-history" -H "Content-Type: application/json" -d '{"patientId":1,"doctorId":2,"diagnosis":"Flu","notes":"Patient has mild symptoms."}'

### Medicine Entity (/medicine)
### Get All Medicine

- **Endpoint:** GET /get-all-medicine
- **Response:** 200 list of all medicines, 500 Internal Server Error
- **Authorization:** Any user

**cURL Request:**

curl -X GET "http://localhost:8080.com/get-all-medicine" -H 

### Register New Medicine

- **Endpoint:** POST /register-new-medicine
- **Body:** name, criticalThreshold, quantity, expiryDate
- **Response:** 201 new medicine, 409 Medicine already exists, 500 Internal Server Error
- **Authorization:** Pharmacist & admin

**cURL Request:**

curl -X POST "http://localhost:8080.com/register-new-medicine" -H "Content-Type: application/json" -d '{"name":"Aspirin","criticalThreshold":10,"quantity":50,"expiryDate":"2024-12-31"}'

### Restock Medicine

- **Endpoint:** PUT /restock-medicine
- **Body:** id, quantity
- **Response:** 200 updated medicine, 400 Quantity exceeds stock, 500 Internal Server Error
- **Authorization:** Pharmacist & admin

**cURL Request:**

curl -X PUT "http://localhost:8080.com/restock-medicine" -H "Content-Type: application/json" -d '{"id":1,"quantity":20}'

### Populate Database with FDA Medicine

- **Endpoint:** POST /populate
- **Response:** 201 Medicines created successfully, 500 Internal Server Error
- **Authorization:** Admin

**cURL Request:**

curl -X POST "http://localhost:8080.com/populate" -H 


### Prescription Entity (/prescription)
### Get Prescriptions by Patient

- **Endpoint:** GET /get-prescriptions-by-patient/{patientId}
- **Response:** 200 list of prescriptions, 500 Internal Server Error
- **Authorization:** The patient, doctor, pharmacist, and admin

**cURL Request:**

curl -X GET "http://localhost:8080.com/get-prescriptions-by-patient/{patientId}" -H 

### Get Prescription by ID

- **Endpoint:** GET /get-prescription-by-id/{prescriptionId}
- **Response:** 200 prescription, 404 Prescription not found, 500 Internal Server Error
- **Authorization:** The patient, doctor, pharmacist, and admin

**cURL Request:**

curl -X GET "http://localhost:8080.com/get-prescription-by-id/{prescriptionId}" -H 

### Get Medicine by Prescription

- **Endpoint:** GET /get-medicine-by-prescription/{prescriptionId}
- **Response:** 200 list of medicines, 500 Internal Server Error
- **Authorization:** The patient, doctor, pharmacist, and admin

**cURL Request:**

curl -X GET "http://localhost:8080.com/get-medicine-by-prescription/{prescriptionId}" -H 

### Create Prescription

- **Endpoint:** POST /create-prescription
- **Body:** patientId, doctorId, medicalHistoryId, status
- **Response:** 201 new prescription, 500 Internal Server Error
- **Authorization:** Doctors and admin

**cURL Request:**

curl -X POST "http://localhost:8080.com/create-prescription" -H "Content-Type: application/json" -d '{"patientId":1,"doctorId":2,"medicalHistoryId":3,"status":"ISSUED"}'

### Add Medicine to Prescription

- **Endpoint:** POST /add-medicine-to-prescription
- **Body:** medicineId, prescriptionId, dosage, frequency, duration, comments
- **Response:** 201 new medicine prescription, 500 Internal Server Error
- **Authorization:** Doctors and admin

**cURL Request:**

curl -X POST "http://localhost:8080.com/add-medicine-to-prescription" -H "Content-Type: application/json" -d '{"medicineId":1,"prescriptionId":2,"dosage":"500mg","frequency":"twice a day","duration":"7 days","comments":"Take with food"}'

### Dispense Prescription

- **Endpoint:** PUT /dispense-prescription/{prescriptionId}
- **Response:** 200 updated prescription, 500 Internal Server Error
- **Authorization:** Pharmacist and admin

**cURL Request:**

curl -X PUT "http://localhost:8080.com/dispense-prescription/{prescriptionId}" -H 


### Symptom Entity (/symptom)
### Get All Symptoms

- **Endpoint:** GET /get-all-symptoms
- **Response:** 200 list of symptoms, 500 Internal Server Error
- **Authorization:** Any user

**cURL Request:**

curl -X GET "http://localhost:8080.com/get-all-symptoms" -H 

### Create New Symptom

- **Endpoint:** POST /create-new-symptom
- **Body:** name, description
- **Response:** 201 new symptom, 500 Internal Server Error
- **Authorization:** Admin

**cURL Request:**

curl -X POST "http://localhost:8080.com/create-new-symptom" -H "Content-Type: application/json" -d '{"name":"Headache","description":"Pain in the head"}'

### Create New Symptom History

- **Endpoint:** POST /create-new-symptom-history
- **Body:** Array of symptom history objects
- **Response:** 201 new symptom histories, 500 Internal Server Error
- **Authorization:** Admin

**cURL Request:**

curl -X POST "http://localhost:8080.com/create-new-symptom-history" -H "Content-Type: application/json" -d '[{"symptomId":1,"patientId":2,"date":"2023-12-01"}]'

### Create New Symptom-Medicine Interaction

- **Endpoint:** POST /create-new-symptom-medicine-interaction
- **Body:** medicineId, symptomId, description
- **Response:** 201 new interaction, 500 Internal Server Error
- **Authorization:** Admin

**cURL Request:**

curl -X POST "http://localhost:8080.com/create-new-symptom-medicine-interaction" -H "Content-Type: application/json" -d '{"medicineId":1,"symptomId":2,"description":"May cause dizziness"}'

### Interactions Entities (/interaction)
### Find Medicine-Symptom Interactions

- **Endpoint:** POST /find-medicine-symptom-interactions
- **Body:** medicineIds (array), symptomIds (array)
- **Response:** 200 list of interactions, 400 Invalid input, 500 Internal Server Error
- **Authorization:** Any user

**cURL Request:**

curl -X POST "http://localhost:8080.com/find-medicine-symptom-interactions" -H "Content-Type: application/json" -d '{"medicineIds":[1,2],"symptomIds":[3,4]}'

### Create New Medicine Interaction

- **Endpoint:** POST /create-new-medicine-interaction
- **Body:** medicineAId, medicineBId, description
- **Response:** 201 new interaction, 500 Internal Server Error
- **Authorization:** Admin

**cURL Request:**

curl -X POST "http://localhost:8080.com/create-new-medicine-interaction" -H "Content-Type: application/json" -d '{"medicineAId":1,"medicineBId":2,"description":"Interaction description"}'

### Find Medicine Interactions

- **Endpoint:** POST /find-medicine-interactions
- **Body:** medicineIds (array)
- **Response:** 200 list of interactions, 400 Invalid input, 500 Internal Server Error
- **Authorization:** Any user

**cURL Request:**

curl -X POST "http://localhost:8080.com/find-medicine-interactions" -H "Content-Type: application/json" -d '{"medicineIds":[1,2,3]}'

### Availability Entity (/availability)
### Create or Update Doctor Schedule

- **Endpoint:** POST /create-doctor-schedule
- **Body:** doctorId, dayOfWeek, startTime, endTime
- **Response:** 200 updated schedule, 201 new schedule, 500 Internal Server Error
- **Authorization:** Admin

**cURL Request:**

curl -X POST "http://localhost:8080.com/create-doctor-schedule" -H "Content-Type: application/json" -d '{"doctorId":1,"dayOfWeek":1,"startTime":"09:00","endTime":"17:00"}'

### Get Doctor Days Available

- **Endpoint:** GET /get-doctor-days-available/{doctorId}
- **Response:** 200 list of available days, 500 Internal Server Error
- **Authorization:** Any user

**cURL Request:**

curl -X GET "http://localhost:8080.com/get-doctor-days-available/{doctorId}" -H 

### Get Doctor Available Hours for a Day

- **Endpoint:** POST /get-doctor-available-hours-for-a-day
- **Body:** doctorId, day
- **Response:** 200 list of available hours, 500 Internal Server Error
- **Authorization:** Any user

**cURL Request:**

curl -X POST "http://localhost:8080.com/get-doctor-available-hours-for-a-day" -H "Content-Type: application/json" -d '{"doctorId":1,"day":"2023-12-01"}'

