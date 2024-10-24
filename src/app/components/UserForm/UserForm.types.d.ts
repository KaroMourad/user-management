import { User } from "@/app/types/users/users.types";

export interface UserFormProps {
  addUser: (user: Omit<User, "id">) => void;
}
