"use client";
import { UserListProps } from "./UserList.types";
import { useEffect, useState } from "react";
import { fetchUsers } from "@/app/services/api/users.api";
import { User } from "@/app/types/users/users.types";
import { adoptError } from "@/app/utils";
import { UserForm } from "../UserForm";

const UserList: React.FC<UserListProps> = (props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setError(null);
        setUsers(data);
      })
      .catch((err) => {
        setUsers([]);
        setError(adoptError(err));
      });
  }, []);

  const addUser = (user: Omit<User, "id">) => {
    const newUser = {
      id: users.length + 1,
      ...user,
    };
    setUsers((prev) => [...prev, newUser]);
  };
  return (
    <div className="w-full h-full">
      {error && <p>{error.message}</p>}
      <h1 className="text-lg">User List</h1>
      <div className="flex justify-between w-full flex-col md:flex-row mr-auto">
        <ul className="flex flex-col min-h-[400px] max-w-lg w-full">
          {users.map((user) => (
            <li key={user.id} className="py-4 text-md">
              <span>{user.name}</span>
              <p>{user.email}</p>
            </li>
          ))}
        </ul>
        <div className="my-4 flex flex-col py-4">
          <UserForm addUser={addUser} />
        </div>
      </div>
    </div>
  );
};

UserList.displayName = "UserList";
export default UserList;
