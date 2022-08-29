export interface IVirtualMachine {
  id: string;
  state: VMState;
  connection: Connection;
  screenshot: string;
};

const virtualMachine = RecordFactory<IVirtualMachine>({
  id: '',
  state: VMState.Pending,
  connection: new Connection({}),
  screenshot: ''
});

export class VirtualMachine extends virtualMachine implements IVirtualMachine {
  id: string;
  state: VMState;
  connection: Connection,
  screenshot: string;

  constructor(config: Partial<IVirtualMachine>) {
    super(config);
  }
}

// 

interface Constructable<T> {
  new (...args: any[]): T;
}

interface StaticallyTypedRecord<T> extends Constructable<T> {
  get<K extends keyof T>(key: K): T[K];
  set<K extends keyof T, V extends keyof T[K]>(key: K, value: V);
  setIn<K1 extends keyof T, V extends keyof T[K1]>(keys: [K1], value: V);
  setIn<K1 extends keyof T, K2 extends keyof T[K1], V extends keyof T[K1][K2]>(keys: [K1, K2], value: V);
  setIn<K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], V extends keyof T[K1][K2][K3]>(keys: [K1, K2, K3], value: V);
  withMutations(cb: (r: StaticallyTypedRecord<T>) => StaticallyTypedRecord<T>);
  toJS(): T;
}

export const RecordFactory = <T>(seed: T): StaticallyTypedRecord<T> => {
  return (Record(seed) as any) as StaticallyTypedRecord<T>;
}

const vm = new VirtualMachine({ id: '123', screenshot: '...' });
