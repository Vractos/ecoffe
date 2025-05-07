interface IOrderItem {
  id: string;
  orderId: string;
  itemId: string;
  quantity: number;
  price: number;
}

export class OrderItem {
  private _id: string;
  private _orderId: string;
  private _itemId: string;
  private _quantity: number;
  private _unitPrice: number;
  
  constructor(props: IOrderItem) {
    this._validate(props);
    this._id = props.id;
    this._orderId = props.orderId;
    this._itemId = props.itemId;
    this._quantity = props.quantity;
    this._unitPrice = props.price;
  }
  
  private _validate(props: IOrderItem) {
    if (props.quantity <= 0) {
      throw new Error("Quantity must be greater than zero");
    }
    if (props.price < 0) {
      throw new Error("Unit price cannot be negative");
    }
  }
  
  get id(): string { return this._id; }
  get orderId(): string { return this._orderId; }
  get itemId(): string { return this._itemId; }
  get quantity(): number { return this._quantity; }
  get price(): number { return this._unitPrice; }
  
  set quantity(value: number) {
    if (value <= 0) {
      throw new Error("Quantity must be greater than zero");
    }
    this._quantity = value;
  }
  
  set price(value: number) {
    if (value < 0) {
      throw new Error("Unit price cannot be negative");
    }
    this._unitPrice = value;
  }
}