export interface ListItem {
  id: string;
  name: string;
  status: boolean;
  code: string;
  type: string;
  recipentPaymentType: string;
  price: number;
}

export type List = ListItem[];
