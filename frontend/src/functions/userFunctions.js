async function fetchUserName(userId) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/user/get-user-name-by-id/${userId}`,
    {
      method: "GET",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch doctor's name");
  }

  return response.json();
}

async function fetchUserId(email) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/user/get-user-by-email/${email}`,
    {
      method: "GET",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch doctor's name");
  }

  const app = await response.json();

  return await app.id;
}

export { fetchUserName, fetchUserId };
