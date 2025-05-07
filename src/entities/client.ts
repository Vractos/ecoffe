interface IClient {
  id: string;
  name: string;
  email: string;
}

export class Client {
  private _id: string;
  private _name: string;
  private _email: string;

  constructor(props: IClient) {
    this._validate(props);
    this._id = props.id;
    this._name = props.name;
    this._email = props.email;
  }

  private _validate(props: IClient) {
    if (props.name === "") {
      throw new Error("Name is required");
    }
    if (props.email === "") {
      throw new Error("Email is required");
    }
  }
  get id(): string {return this._id;}
  get name(): string {return this._name;}
  get email(): string {return this._email;}

  set name(name: string) {this._name = name;}
  set email(email: string) {
    if (email === "") {
      throw new Error("Email is required");
    }
    this._email = email;
  }
}