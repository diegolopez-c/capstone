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

  return await response.json();
}

async function fetchUserId(email) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/user/get-user-by-email/${email}`,
    {
      method: "GET",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch user by email");
  }

  const app = await response.json();

  return app.id;
}

async function fetchUserById(id) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/user/get-user-by-id/${id}`,
    {
      method: "GET",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch user by id");
  }

  const app = await response.json();

  return app;
}

export { fetchUserName, fetchUserId, fetchUserById };
