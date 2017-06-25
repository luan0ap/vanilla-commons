import {addMilliseconds} from '../lib/date'

describe('addMilliseconds main functionality', () => {
  it('should addMilliseconds of a date', () => {
    const date = new Date('December 17, 1995 03:24:00')
    const actual = addMilliseconds(1000 * 60, date)
    const expected = new Date('December 17, 1995 03:25:00')
    expect(actual.getTime()).toBe(expected.getTime())
  })

  it('should remove milliseconds of a date', () => {
    const date = new Date('December 17, 1995 03:24:00')
    const actual = addMilliseconds(1000 * -60, date)
    const expected = new Date('December 17, 1995 03:23:00')
    expect(actual.getTime()).toBe(expected.getTime())
  })

  it('should be curried', () => {
    const date = new Date('December 17, 1995 03:24:00')
    const actual = addMilliseconds(1000 * 60)(date)
    const expected = new Date('December 17, 1995 03:25:00')
    expect(actual.getTime()).toBe(expected.getTime())
  })
})

describe('addMilliseconds arguments validation errors', () => {
  it('should throw a TypeError when unexpected argument types', () => {
    expect(() => {
      addMilliseconds({}, new Date())
    }).toThrow(TypeError)
    expect(() => {
      addMilliseconds(null, new Date())
    }).toThrow(TypeError)
    expect(() => {
      addMilliseconds(() => {}, new Date())
    }).toThrow(TypeError)
    expect(() => {
      addMilliseconds(42, {})
    }).toThrow(TypeError)
    expect(() => {
      addMilliseconds(42, null)
    }).toThrow(TypeError)
    expect(() => {
      addMilliseconds(42, 42)
    }).toThrow(TypeError)
    expect(() => {
      addMilliseconds(42, () => {})
    }).toThrow(TypeError)
  })

  it('should throw a TypeError when one of the arguments is not defined', () => {
    expect(() => {
      addMilliseconds(undefined, new Date())
    }).toThrow(TypeError)
    expect(() => {
      addMilliseconds(23)(undefined)
    }).toThrow(TypeError)
  })

  it('should throw errors with friendly messages when the first argument has an unexpected type', () => {
    const expected = expect(() => {
      addMilliseconds({}, new Date())
    })

    expected.toThrow(/1st/)
    expected.toThrow(/`addMilliseconds`/)
    expected.toThrow(/unexpected type/)
    expected.toThrow(/number is expected/)
  })

  it('should throw errors with friendly messages when the first argument is not defined', () => {
    const expected = expect(() => {
      addMilliseconds(undefined, undefined)
    })

    expected.toThrow(/1st/)
    expected.toThrow(/`addMilliseconds`/)
    expected.toThrow(/is not defined/)
    expected.toThrow(/number is expected/)
  })

  it('should throw errors with friendly messages when the second argument has an unexpected type', () => {
    const expected = expect(() => {
      addMilliseconds(23, {})
    })

    expected.toThrow(/2nd/)
    expected.toThrow(/`addMilliseconds`/)
    expected.toThrow(/unexpected type/)
    expected.toThrow(/date is expected/)
  })

  it('should throw errors with friendly messages when the second argument is not defined', () => {
    const expected = expect(() => {
      addMilliseconds(23)(undefined)
    })

    expected.toThrow(/2nd/)
    expected.toThrow(/`addMilliseconds`/)
    expected.toThrow(/is not defined/)
    expected.toThrow(/date is expected/)
  })
})
