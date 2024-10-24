import { User } from "@/app/types/users/users.types";

const USERS_API = "/api/users";

export const fetchUsers = async () => {
  return fetch(USERS_API).then((res) => res.json());
};

export const createUser = async (user: Omit<User, "id">) => {
  return fetch(USERS_API, {
    method: "POST",
    body: JSON.stringify(user),
  }).then((res) => res.json());
};
