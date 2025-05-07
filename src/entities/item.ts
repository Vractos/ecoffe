interface IItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export class Item {
  private _id: string;
  private _name: string;
  private _description: string;
  private _price: number;
  private _quantity: number;

  constructor(props: IItem) {
    this._validate(props);
    this._id = props.id;
    this._name = props.name;
    this._description = props.description;
    this._price = props.price;
    this._quantity = props.quantity;
  }

  private _validate(props: IItem) {
    if (props.name === "") {
      throw new Error("Name is required");
    }
    if (props.price < 0) {
      throw new Error("Price cannot be negative");
    }
    if (props.quantity < 0) {
      throw new Error("Quantity cannot be negative");
    }
  }

  get id(): string {return this._id;}
  get name(): string {return this._name;}
  get description(): string {return this._description;}
  get price(): number {return this._price;}
  get quantity(): number {return this._quantity;}

  set name(name: string) {this._name = name;}
  set description(description: string) {this._description = description;}
  set price(value: number) {
    if (value < 0) {
      throw new Error("Price cannot be negative");
    }
    this._price = value;
  }
  set quantity(value: number) {
    if (value < 0) {
      throw new Error("Quantity cannot be negative");
    }
    this._quantity = value;
  }
}