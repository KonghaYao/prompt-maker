export const allowToRun = <T extends (...args: any) => any>(func: T, valid: (...args: Parameters<T>) => boolean | string | Error | Promise<boolean | string | Error>) => {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    const isAllow = await valid(...args)
    if (isAllow === true) { return func(...(args as any[])) }
    throw isAllow
  }
}
export const logAsyncState = <T extends (...args: any) => Promise<any>>(func: T, p: (promise: ReturnType<T>) => void) => {
  return (...args: Parameters<T>): ReturnType<T> => {
    const res = (func(...(args as any[])) as ReturnType<T>)
    p(res)
    return res
  }
}

interface Signal<T> {
    (): T
    (val: T): void
    (val: (lastVal: T) => T): void
}
export const refToSignal = <T>(ref: Ref<T>): Signal<T> => {
  return (...args: any[]): any => {
    if (args.length === 0) {
      return ref.value
    } else if (typeof args[1] === 'function') {
      ref.value = args[1](ref.value)
    } else {
      ref.value = args[1]
    }
  }
}
