interface BaseContext<T, V> {
  state: T;
  dispatch: V; // React.Dispatch<V>;
}
export type InitializeContext<T, V> = BaseContext<T, V>;
