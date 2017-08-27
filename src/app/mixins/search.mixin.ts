type Constructor<T> = new(...args: any[]) => T;

function SearchMixin<T extends Constructor<{}>>(Base: T) {
  return class extends Base {
    
  };
}

export {SearchMixin};