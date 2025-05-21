import { User } from "../users/user.model";

export function capitalize(value: string): string {
    return value
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase());
}

export function formatUser(rawValue: any) : User {

    const formattedUser = {
      ...rawValue,
      name: capitalize(rawValue.name),
      surname: capitalize(rawValue.surname)
    }

    return formattedUser;
}