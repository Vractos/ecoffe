import { OrderItem } from './orderItem';

export enum OrderStatus {
  PENDING = 0,      // Pendente
  IN_PROGRESS = 1,  // Em Preparo
  COMPLETED = 2,    // Pronto
  DELIVERING = 3,   // A Caminho
  DELIVERED = 4,    // Entregue
  CANCELED = 5      // Cancelado
}

interface IOrder {
  id: string;
  customerId: string;
  orderItems: OrderItem[]; 
  observation?: string;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class Order {
  private _id: string;
  private _customerId: string;
  private _orderItems: OrderItem[];
  private _observation: string | undefined;
  private _status: OrderStatus;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: IOrder) {
    this._validate(props);
    this._id = props.id;
    this._customerId = props.customerId;
    this._orderItems = props.orderItems;
    this._observation = props.observation || undefined;
    this._status = props.status;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  private _validate(props: IOrder) {
    if (!props.customerId) {
      throw new Error("Customer ID is required");
    }
    if (props.orderItems.length === 0) {
      throw new Error("At least one item is required");
    }
    if (props.status === undefined) {
      throw new Error("Status is required");
    }
  }

  get id(): string { return this._id; }
  get customerId(): string { return this._customerId; }
  get orderItems(): OrderItem[] {return this._orderItems}
  get observation(): string | undefined { return this._observation; }
  get status(): OrderStatus { return this._status; }
  get createdAt(): Date { return this._createdAt; }
  get updatedAt(): Date { return this._updatedAt; }

  set customerId(customerId: string) { this._customerId = customerId; }
  set orderItems(items: OrderItem[]) {
    if (items.length === 0) {
      throw new Error("At least one item is required");
    }
    
    this._orderItems.push(...items);
  }

   updateStatus(status: OrderStatus): void {
    if (status === OrderStatus.CANCELED && this._status !== OrderStatus.DELIVERED) {
      this._status = status;
      this._updatedAt = new Date();
      return;
    }
  
    if (status < this._status) {
      throw new Error("Cannot change to a previous status");
    }
    
    if (this._status === OrderStatus.CANCELED) {
      throw new Error("Cannot change status of a canceled order");
    }
    
    if (this._status === OrderStatus.DELIVERED) {
      throw new Error("Cannot change status of a delivered order");
    }
    
    // Update status
    this._status = status;
    this._updatedAt = new Date();
  }
  updateObservation(observation: string) {
    this._observation = observation;
  }

  static getStatusName(status: OrderStatus): string {
    const statusNames = [
      'Pendente',
      'Em Preparo',
      'Pronto',
      'A Caminho',
      'Entregue',
      'Cancelado'
    ];
    return statusNames[status];
  }

}