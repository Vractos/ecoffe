import { v4 as uuidv4 } from 'uuid';

export const ORDER_STATUS = {
  PENDING: 'Pendente',
  IN_PROGRESS: 'Preparando',
  COMPLETED: 'Pronto',
  DELIVERING: 'A Caminho',
  DELIVERED: 'Entregue',
  CANCELED: 'Cancelado'
} as const;

export type OrderStatus = typeof ORDER_STATUS[keyof typeof ORDER_STATUS];
interface IOrder {
  id?: string;
  client: string;
  item: string;
  quantity: number;
  observation?: string;
  status: OrderStatus;
  createdAt?: Date;
}
export class Order {
  private _id: string;
  private _client: string;
  private _item: string;
  private _quantity: number;
  private _observation: string | undefined;
  private _status: OrderStatus;
  private _createdAt: Date

  constructor(props: IOrder) {
    this._validate(props);
    this._id = props.id === undefined ? uuidv4() : props.id;
    this._client = props.client;
    this._item = props.item;
    this._quantity = props.quantity;
    this._observation = props.observation;
    this._status = props.status;
    this._createdAt = props.createdAt === undefined ? new Date() : props.createdAt
  }

  private _validate(props: IOrder) {
    if (props.client == "") {
      throw new Error("Client name is required");
    }

    if (props.item == "") {
      throw new Error("Item is required")
    }

    if (props.quantity <= 0) {
      throw new Error("Quantity required")
    }

    if (props.status === undefined) {
      throw new Error("Status is required");
    }
  }

  get id(): string { return this._id; }
  get client(): string { return this._client; }
  get item(): string { return this._item; }
  get observation(): string | undefined { return this._observation; }
  get quantity(): number { return this._quantity; }
  get status(): OrderStatus { return this._status; }
  get createdAt(): Date { return this._createdAt; }

  set status(status: OrderStatus) {
    if (status === ORDER_STATUS.CANCELED && this._status !== ORDER_STATUS.DELIVERED) {
      this._status = status;
    }

    if (this._status === ORDER_STATUS.CANCELED) {
      throw new Error("Order already canceled");
    }
    if (this._status === ORDER_STATUS.DELIVERED) {
      throw new Error("Order already delivered");
    }

    this._status = status;
  }

  set observation(observation: string) {
    this._observation = observation;
  }
}
