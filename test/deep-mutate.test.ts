import mutate from '../src/deep-mutate'

/**
 * Dummy test
 */
describe('mutate test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  test('First level obj update', () => {
    const frozen = Object.freeze({ name: 'foo', lastname: 'bar' })
    const result = mutate(frozen, { name: 'faa' })
    expect(result.name).toBe('faa')
    expect(Object.isFrozen(result)).toBeTruthy()
  })
  test('Second level obj update', () => {
    const frozen = Object.freeze({
      name: 'Bruce',
      lastname: 'Waine',
      address: { city: 'Gotham', country: 'US', street: 'Mountain Drive' }
    })
    const result = mutate(frozen, { name: 'faa', address: { street: '1007 Mountain Drive' } })
    expect(result.name).toBe('faa')
    expect(result.address.street).toBe('1007 Mountain Drive')
    expect(result).toEqual({
      name: 'faa',
      lastname: 'Waine',
      address: { city: 'Gotham', country: 'US', street: '1007 Mountain Drive' }
    })
    expect(Object.isFrozen(result)).toBeTruthy()
  })
  test('First level obj update with undefined', () => {
    const frozen = Object.freeze({
      name: 'Bruce',
      lastname: 'Waine',
      address: { city: 'Gotham', country: 'US', street: 'Mountain Drive' }
    })
    const result = mutate(frozen, { name: undefined, address: { street: '1007 Mountain Drive' } })
    expect(result.name).toBe(undefined)
    expect(result.address.street).toBe('1007 Mountain Drive')
    expect(result).toEqual({
      name: undefined,
      lastname: 'Waine',
      address: { city: 'Gotham', country: 'US', street: '1007 Mountain Drive' }
    })
    expect(Object.isFrozen(result)).toBeTruthy()
  })
  test('Second level obj update with undefined', () => {
    const frozen = Object.freeze({
      name: 'Bruce',
      lastname: 'Waine',
      address: { city: 'Gotham', country: 'US', street: 'Mountain Drive' }
    })
    const result = mutate(frozen, { name: 'faa', address: { street: undefined } })
    expect(result.name).toBe('faa')
    expect(result.address.street).toBe(undefined)
    expect(result).toEqual({
      name: 'faa',
      lastname: 'Waine',
      address: {
        city: 'Gotham',
        country: 'US',
        street: undefined
      }
    })
    expect(Object.isFrozen(result)).toBeTruthy()
  })

  test('undefined for partial', () => {
    expect(mutate({ name: 'Batman' }, undefined)).toEqual({ name: 'Batman' })
  })
  test('undefined for obj', () => {
    expect(mutate({ name: 'Batman' }, undefined)).toEqual({ name: 'Batman' })
  })
  test('First level obj update with array', () => {
    const frozen = Object.freeze({
      name: ['Bruce'],
      lastname: 'Waine',
      address: { city: 'Gotham', country: 'US', street: 'Mountain Drive' }
    })
    const result = mutate(frozen, { name: ['Batman'], address: { street: '1007 Mountain Drive' } })
    expect(result.name).toEqual(['Batman'])
    expect(result.address.street).toBe('1007 Mountain Drive')
    expect(result).toEqual({
      name: ['Batman'],
      lastname: 'Waine',
      address: { city: 'Gotham', country: 'US', street: '1007 Mountain Drive' }
    })
    expect(Object.isFrozen(result)).toBeTruthy()
  })
})
