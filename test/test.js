/* eslint-env jest */

var URLON = require('../')
var geojson = require('./geojson.json')

expect.extend({
  toMatchParsedOfSelfStringifiedAndSnapshot: function (obj) {
    var str1 = URLON.stringify(obj)
    var parsed = URLON.parse(str1)
    var str2 = URLON.stringify(parsed)
    var str3 = JSON.stringify(obj)
    var str4 = JSON.stringify(parsed)
    expect(str1).toMatchSnapshot()
    return {
      pass: str1 === str2 && str3 === str4,
      message:
        'URLON original: ' +
        str1 +
        '\nURLON parse: ' +
        str2 +
        '\nJSON original: ' +
        str3 +
        '\nJSON parsed: ' +
        str4,
    }
  },
})

function makeTest(obj) {
  var name = JSON.stringify(obj) || 'undefined'
  if (name.length > 100) {
    name = name.slice(0, 97) + '...'
  }
  it(name, function () {
    expect(obj).toMatchParsedOfSelfStringifiedAndSnapshot()
  })
}

describe('URLON', function () {
  describe('Booleans', function () {
    makeTest(true)
    makeTest(false)
    makeTest(null)
  })
})

describe('undefined', function () {
  it('stringifies to undefined', function () {
    expect(URLON.stringify(undefined)).toEqual(undefined)
  })
  it('throws to parse', function () {
    expect(function () {
      URLON.parse(undefined)
    }).toThrow()
  })
})

describe('Numbers', function () {
  makeTest(1234567890)
  makeTest(0.123456789e-12)
  makeTest(-9876.54321)
  makeTest(23456789012e66)
  makeTest(0)
  makeTest(1)
  makeTest(0.5)
  makeTest(98.6)
  makeTest(99.44)
  makeTest(1066)
  makeTest(1e1)
  makeTest(0.1e1)
  makeTest(1e-1)
  makeTest(1)
  makeTest(2)
  makeTest(2)
  makeTest(-42)
})
describe('Strings', function () {
  makeTest('')
  makeTest(';')
  makeTest('@')
  makeTest('/')
  makeTest('|')
  makeTest('&')
  makeTest(' ')
  makeTest('"')
  makeTest('\\')
  makeTest('\b\f\n\r\t')
  makeTest('/ & /')
  makeTest('abcdefghijklmnopqrstuvwyz')
  makeTest('ABCDEFGHIJKLMNOPQRSTUVWYZ')
  makeTest('0123456789')
  makeTest("`1~!@#$%^&*()_+-={':[,]}|;.</>?")
  makeTest('\u0123\u4567\u89AB\uCDEF\uabcd\uef4A')
  makeTest('// /* <!-- --')
  makeTest('# -- --> */')
  makeTest('@:0&@:0&@:0&:0')
  makeTest('{"object with 1 member":["array with 1 element"]}')
  makeTest('&#34; \u0022 %22 0x22 034 &#x22;')
  makeTest(
    '/\\"\uCAFE\uBABE\uAB98\uFCDE\ubcda\uef4A\b\f\n\r\t`1~!@#$%^&*()_+-=[]{}|;:\',./<>?'
  )
})
describe('Array', function () {
  makeTest([])
  makeTest([[0]])
  makeTest([[[[[0]]]]])
  makeTest([[[[[0], 0]], 0]])
  makeTest([0, [0, [0, 0]]])
  makeTest([null])
  makeTest([undefined])
})

describe('Object', function () {
  makeTest({})
  makeTest({ '': '' })
  makeTest({ a: { b: 1 }, c: 'x' })
})

describe('Array', function () {
  makeTest([])
  makeTest([[0]])
  makeTest([[[[[0]]]]])
  makeTest([[[[[0], 0]], 0]])
  makeTest([0, [0, [0, 0]]])
  makeTest([null])
  makeTest([undefined])
})
describe('Object', function () {
  makeTest({})
  makeTest({
    '': '',
  })
  makeTest({
    a: {
      b: 1,
    },
    c: 'x',
  })
})

describe('Complex', function () {
  makeTest([{}, {}])
  makeTest({
    foo: [
      2,
      {
        bar: [
          4,
          {
            baz: [
              6,
              {
                'deep enough': 7,
              },
            ],
          },
        ],
      },
    ],
  })
  makeTest({
    num: 1,
    alpha: 'abc',
    ignore: 'me',
    change: 'to a function',
    toUpper: true,
    obj: {
      nested_num: 50,
      undef: undefined,
      alpha: 'abc',
      nullable: null,
    },
    arr: [1, 7, 2],
  })
  makeTest([
    'JSON makeTest Pattern pass1',
    {
      'object with 1 member': ['array with 1 element'],
    },
    {},
    [],
    -42,
    true,
    false,
    null,
    {
      integer: 1234567890,
      real: -9876.54321,
      e: 0.123456789e-12,
      E: 1.23456789e34,
      '': 23456789012e66,
      zero: 0,
      one: 1,
      space: ' ',
      quote: '"',
      backslash: '\\',
      controls: '\b\f\n\r\t',
      slash: '/ & /',
      alpha: 'abcdefghijklmnopqrstuvwyz',
      ALPHA: 'ABCDEFGHIJKLMNOPQRSTUVWYZ',
      digit: '0123456789',
      '0123456789': 'digit',
      special: "`1~!@#$%^&*()_+-={':[,]}|;.</>?",
      hex: '\u0123\u4567\u89AB\uCDEF\uabcd\uef4A',
      true: true,
      false: false,
      null: null,
      array: [],
      object: {},
      address: '50 St. James Street',
      url: 'http://www.JSON.org/',
      comment: '// /* <!-- --',
      '# -- --> */': ' ',
      ' s p a c e d ': [1, 2, 3, 4, 5, 6, 7],
      compact: [1, 2, 3, 4, 5, 6, 7],
      jsontext: '{"object with 1 member":["array with 1 element"]}',
      quotes: '&#34; \u0022 %22 0x22 034 &#x22;',
      '/\\"\uCAFE\uBABE\uAB98\uFCDE\ubcda\uef4A\b\f\n\r\t`1~!@#$%^&*()_+-=[]{}|;:\',./<>?':
        'A key can be any string',
    },
    0.5,
    98.6,
    99.44,
    1066,
    1e1,
    0.1e1,
    1e-1,
    1,
    2,
    2,
    'rosebud',
  ])
  makeTest(geojson)
})
