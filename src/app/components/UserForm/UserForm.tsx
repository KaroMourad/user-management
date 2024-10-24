import { User } from "@/app/types/users/users.types";
import { UserFormProps } from "./UserForm.types";
import { useCallback, useId, useState } from "react";
import { createUser } from "@/app/services/api/users.api";

const UserForm: React.FC<UserFormProps> = (props) => {
  const { addUser } = props;
  const [user, setUser] = useState<Omit<User, "id">>({
    name: "",
    email: "",
  });
  const [error, setError] = useState<Error | null>(null);

  const onNameChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setUser((prev) => ({
        ...prev,
        name: e.target.value.trim(),
      }));
    },
    []
  );

  const onEmailChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setUser((prev) => ({
        ...prev,
        email: e.target.value.trim(),
      }));
    },
    []
  );

  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    if (user.name && user.email) {
      setError(null);
      addUser(user);
      createUser(user)
        .then(() => {
          setUser({ name: "", email: "" });
        })
        .catch((err) => {
          setError(err);
        });
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col my-4 w-[280px] border p-4"
    >
      <h2 className="text-md">
        For Creating a user fill name and email of the user
      </h2>
      <div className="flex items-center mt-4 justify-between">
        <label htmlFor="name">Name: </label>
        <input
          id="name"
          type="text"
          value={user?.name}
          onChange={onNameChange}
          aria-label="name"
          className="ml-4 text-black"
        />
      </div>
      <div className="flex items-center  justify-between mt-2 ">
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          type="email"
          value={user?.email}
          onChange={onEmailChange}
          aria-label="email"
          className="ml-4 text-black"
        />
      </div>
      <div className="mt-4 flex items-center justify-end w-full">
        <button type="submit" disabled={!user.name || !user.email}>
          Create User
        </button>
      </div>
      {error && <p className="red-500 text-sm">{error.message}</p>}
    </form>
  );
};

UserForm.displayName = "UserForm";
export default UserForm;
