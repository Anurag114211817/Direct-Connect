export class User {
  _id: string = '';
  firstName: string = '';
  lastName: string = '';
  username: string = '';
  email: string = '';
  profileImg: string = '';
}

export class Response {
  success: boolean = true;
  status: number = 200;
  data: Partial<User> = {};
}
