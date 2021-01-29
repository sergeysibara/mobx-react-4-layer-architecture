export type ObjectType = Record<string, unknown> | null | undefined;

export type ErrorType = string | ObjectType;

export interface IIdentifiable {
  id: number;
}
