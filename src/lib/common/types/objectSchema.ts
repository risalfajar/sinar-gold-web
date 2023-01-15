import {BasicType, Type} from "read-excel-file/types"

export interface SchemaEntry<T> {
    prop: keyof T;
    type?: BasicType | Type<T>;
    oneOf?: T[];
    required?: boolean;

    validate?(value: T): void;
}

export type ObjectSchema<T> = Record<string, SchemaEntry<T>>
