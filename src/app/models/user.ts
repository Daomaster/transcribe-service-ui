export class User {
  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }

  public username: string;
  public password: string;
}
