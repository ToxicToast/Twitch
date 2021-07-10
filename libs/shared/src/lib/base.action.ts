interface BaseAction<T, V> {
  type: T;
  payload: V;
}

export type DispatchAction<T, V> = BaseAction<T, V>;
