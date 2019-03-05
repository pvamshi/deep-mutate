// RecursivePartial handling array too

// export type RecursivePartial<T> = {
//   [P in keyof T]?: T[P] extends (infer U)[]
//     ? RecursivePartial<U>[]
//     : T[P] extends object
//     ? RecursivePartial<T[P]>
//     : T[P]
// }

export type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> }

function mutate<T>(obj: T, partial: RecursivePartial<T> | undefined | null): T {
  if (!partial || !obj) {
    return obj
  }

  const updated: any = {}
  for (const key in partial) {
    if (partial.hasOwnProperty(key)) {
      let element = partial[key]
      if (
        // tslint:disable-next-line: strict-type-predicates
        typeof element === 'undefined'
      ) {
        updated[key] = undefined
      } else if (
        // tslint:disable-next-line: strict-type-predicates
        typeof element === 'string' ||
        // tslint:disable-next-line: strict-type-predicates
        typeof element === 'number' ||
        element instanceof String ||
        element instanceof Number ||
        Array.isArray(element)
      ) {
        updated[key] = element
      } else {
        updated[key] = mutate(obj[key], element)
      }
    }
  }
  return Object.freeze({ ...obj, ...updated })
}

export default mutate
