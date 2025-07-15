function calculateAgeWithBirthDate(birthDate) {
  const today = new Date();
  const birthdate = new Date(birthdateString);

  let age = today.getFullYear() - birthdate.getFullYear();

  const monthDifference = today.getUTCMonth() - birthdate.getUTCMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthdate.getDate())
  ) {
    age--;
  }

  return age;
}

export { calculateAgeWithBirthDate };
