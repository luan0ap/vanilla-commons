import {addYears} from '../lib/date'

describe('addYears main functionality', () => {
  it('should addYears of a date', () => {
    const date = new Date('December 17, 1995 03:24:00')
    const actual = addYears(2, date)
    const expected = new Date('December 17, 1997 03:24:00')
    expect(actual.getTime()).toBe(expected.getTime())
  })

  it('should remove years of a date', () => {
    const date = new Date('December 17, 1995 03:24:00')
    const actual = addYears(-2, date)
    const expected = new Date('December 17, 1993 03:24:00')
    expect(actual.getTime()).toBe(expected.getTime())
  })

  it('should be curried', () => {
    const date = new Date('December 17, 1995 03:24:00')
    const actual = addYears(2)(date)
    const expected = new Date('December 17, 1997 03:24:00')
    expect(actual.getTime()).toBe(expected.getTime())
  })

  it('should handle 29 February in leap years', () => {
    const date = new Date('February 29, 2016 03:24:00')
    const actual = addYears(1, date)
    const expected = new Date('February 28, 2017 03:24:00')
    expect(actual.getTime()).toBe(expected.getTime())
  })
})

describe('addYears arguments validation errors', () => {
  it('should throw a TypeError when unexpected argument types', () => {
    expect(() => {
      addYears({}, new Date())
    }).toThrow(TypeError)
    expect(() => {
      addYears(null, new Date())
    }).toThrow(TypeError)
    expect(() => {
      addYears(() => {}, new Date())
    }).toThrow(TypeError)
    expect(() => {
      addYears(42, {})
    }).toThrow(TypeError)
    expect(() => {
      addYears(42, null)
    }).toThrow(TypeError)
    expect(() => {
      addYears(42, 42)
    }).toThrow(TypeError)
    expect(() => {
      addYears(42, () => {})
    }).toThrow(TypeError)
  })

  it('should throw a TypeError when one of the arguments is not defined', () => {
    expect(() => {
      addYears(undefined, new Date())
    }).toThrow(TypeError)
    expect(() => {
      addYears(23)(undefined)
    }).toThrow(TypeError)
  })

  it('should throw errors with friendly messages has an unexpected type', () => {
    const expected = expect(() => {
      addYears({}, new Date())
    })

    expected.toThrow(/1st/)
    expected.toThrow(/`addYears`/)
    expected.toThrow(/unexpected type/)
    expected.toThrow(/number is expected/)
  })

  it('should throw errors with friendly messages when the first argument is not defined', () => {
    const expected = expect(() => {
      addYears(undefined, new Date())
    })

    expected.toThrow(/1st/)
    expected.toThrow(/`addYears`/)
    expected.toThrow(/is not defined/)
    expected.toThrow(/number is expected/)
  })

  it('should throw errors with friendly messages when the second argument has an unexpected type', () => {
    const expected = expect(() => {
      addYears(23, {})
    })

    expected.toThrow(/2nd/)
    expected.toThrow(/`addYears`/)
    expected.toThrow(/unexpected type/)
    expected.toThrow(/date is expected/)
  })

  it('should throw errors with friendly messages when the second argument is not defined', () => {
    const expected = expect(() => {
      addYears(23)(undefined)
    })

    expected.toThrow(/2nd/)
    expected.toThrow(/`addYears`/)
    expected.toThrow(/is not defined/)
    expected.toThrow(/date is expected/)
  })
})
