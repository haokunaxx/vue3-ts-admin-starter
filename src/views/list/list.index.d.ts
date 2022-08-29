import type { ListItem } from '@/mock/list/list'

export type LabelKey = Omit<ListItem, 'id'>

// export interface FormItemBase<R> {
//   label: string;
//   labelKey: keyof R;
//   placeholder?: string;
//   options?: {
//     id?: string;
//     label: string;
//     value: string;
//     disabled?: boolean;
//   }[];
// }

// export enum FormItemTypes {
//   CheckboxGroup = 'checkboxGroup',
//   Select = 'select',
//   Input = 'input'
// }

// type CheckboxGroupValue = string[];
// type SelectValue = string[]
// type InputValue = string

// interface TypeGeneric<T, U, R> extends FormItemBase<R> {
//   type: T;
//   value?: U;
//   defaultValue?: U;
// }

// export type FormItemType<T> = TypeGeneric<FormItemTypes.CheckboxGroup, CheckboxGroupValue,T>
//   | TypeGeneric<FormItemTypes.Input, InputValue,T>
//   | TypeGeneric<FormItemTypes.Select, SelectValue,T>

// export type FormTypes<T> = FormItemType<T>[]

export interface FormItemBase {
  label: string;
  labelKey: keyof LabelKey;
  placeholder?: string;
  options?: {
    id?: string;
    label: string;
    value: string;
    disabled?: boolean;
  }[];
}

export enum FormItemTypes {
  CheckboxGroup = 'checkboxGroup',
  Select = 'select',
  Input = 'input'
}

type CheckboxGroupValue = string[];
type SelectValue = string[]
type InputValue = string

interface TypeGeneric<T, U> extends FormItemBase {
  type: T;
  value?: U;
  defaultValue?: U;
}

export type FormItemType = TypeGeneric<FormItemTypes.CheckboxGroup, CheckboxGroupValue>
  | TypeGeneric<FormItemTypes.Input, InputValue>
  | TypeGeneric<FormItemTypes.Select, SelectValue>

export type FormTypes = FormItemType[]