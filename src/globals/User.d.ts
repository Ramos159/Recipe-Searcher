declare type User = {
  readonly username: string;
  readonly email: string;
  readonly favorites: Recipe[];
} | null;
