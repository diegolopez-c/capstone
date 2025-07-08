const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create multiple doctors and patients
  const doctors = await prisma.user.createMany({
    data: [
      {
        email: "doctor1@example.com",
        name: "John",
        lastname: "Doe",
        birthDate: new Date("1980-01-01"),
        role: "DOCTOR",
      },
      {
        email: "doctor2@example.com",
        name: "Jane",
        lastname: "Smith",
        birthDate: new Date("1985-05-15"),
        role: "DOCTOR",
      },
      {
        email: "doctor3@example.com",
        name: "Emily",
        lastname: "Brown",
        birthDate: new Date("1975-03-22"),
        role: "DOCTOR",
      },
    ],
  });

  const patients = await prisma.user.createMany({
    data: [
      {
        email: "patient1@example.com",
        name: "Alice",
        lastname: "Johnson",
        birthDate: new Date("1990-07-20"),
        role: "PATIENT",
      },
      {
        email: "patient2@example.com",
        name: "Bob",
        lastname: "Williams",
        birthDate: new Date("1988-11-11"),
        role: "PATIENT",
      },
      {
        email: "patient3@example.com",
        name: "Charlie",
        lastname: "Davis",
        birthDate: new Date("1995-05-05"),
        role: "PATIENT",
      },
    ],
  });

  // Fetch created doctors and patients to get their IDs
  const allDoctors = await prisma.user.findMany({
    where: { role: "DOCTOR" },
  });

  const allPatients = await prisma.user.findMany({
    where: { role: "PATIENT" },
  });

  // Create doctor availability for each doctor
  for (const doctor of allDoctors) {
    await prisma.doctorAvailability.createMany({
      data: [
        {
          doctorId: doctor.id,
          dayOfWeek: 1, // Monday
          startTime: new Date("2023-10-09T08:00:00Z"),
          endTime: new Date("2023-10-09T16:00:00Z"),
        },
        {
          doctorId: doctor.id,
          dayOfWeek: 3, // Wednesday
          startTime: new Date("2023-10-11T08:00:00Z"),
          endTime: new Date("2023-10-11T16:00:00Z"),
        },
        {
          doctorId: doctor.id,
          dayOfWeek: 5, // Friday
          startTime: new Date("2023-10-13T08:00:00Z"),
          endTime: new Date("2023-10-13T16:00:00Z"),
        },
      ],
    });
  }

  // Create appointments for each patient with random doctors
  for (const patient of allPatients) {
    for (let i = 0; i < 3; i++) {
      const randomDoctor =
        allDoctors[Math.floor(Math.random() * allDoctors.length)];
      await prisma.appointment.create({
        data: {
          patientId: patient.id,
          doctorId: randomDoctor.id,
          status: "PENDING",
          reason: "General Checkup",
          scheduleDate: new Date(`2023-10-${10 + i}T09:00:00Z`),
        },
      });
    }
  }

  // Create medical history for each patient
  for (const patient of allPatients) {
    const randomDoctor =
      allDoctors[Math.floor(Math.random() * allDoctors.length)];
    await prisma.medicalHistory.create({
      data: {
        patientId: patient.id,
        doctorId: randomDoctor.id,
        diagnosis: "Routine Check",
        notes: "Patient is in good health.",
        createdAt: new Date(),
      },
    });
  }

  // Create medicines
  const medicines = await prisma.medicine.createMany({
    data: [
      {
        name: "Aspirin",
        quantity: 200,
        criticalThreshold: 20,
        expiryDate: new Date("2024-12-31"),
      },
      {
        name: "Ibuprofen",
        quantity: 150,
        criticalThreshold: 15,
        expiryDate: new Date("2025-06-30"),
      },
      {
        name: "Paracetamol",
        quantity: 300,
        criticalThreshold: 30,
        expiryDate: new Date("2023-11-30"),
      },
    ],
  });

  // Fetch created medicines to get their IDs
  const allMedicines = await prisma.medicine.findMany();

  // Create prescriptions and link medicines
  for (const patient of allPatients) {
    const randomDoctor =
      allDoctors[Math.floor(Math.random() * allDoctors.length)];
    const medicalHistory = await prisma.medicalHistory.findFirst({
      where: { patientId: patient.id },
    });

    const prescription = await prisma.prescription.create({
      data: {
        patientId: patient.id,
        doctorId: randomDoctor.id,
        medicalHistoryId: medicalHistory.id,
        status: "ISSUED",
      },
    });

    for (const medicine of allMedicines) {
      await prisma.prescriptionMedicine.create({
        data: {
          prescriptionId: prescription.id,
          medicineId: medicine.id,
          dosage: "100mg",
          frequency: "Twice a day",
          duration: "14 days",
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
