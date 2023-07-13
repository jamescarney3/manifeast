export interface Action<P = void> {
  type: string;
  data?: P;
}
