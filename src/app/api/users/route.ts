import { User } from "@/app/types/users/users.types";

const USERS: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
  },
  {
    id: 4,
    name: "Emily Brown",
    email: "emily.brown@example.com",
  },
  {
    id: 5,
    name: "Alex Wilson",
    email: "alex.wilson@example.com",
  },
];

export async function GET(request: Request) {
  return Response.json(USERS);
}

export async function POST(request: Request) {
  const res = await request.json();
  console.log("create a user", res);
  return Response.json(res);
}
