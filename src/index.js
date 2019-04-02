const  unicode_id_start_regex = require('unicode-12.0.0/Binary_Property/ID_Start/regex.js')
const  unicode_id_continue_regex = require('unicode-12.0.0/Binary_Property/ID_Continue/regex.js')

// console.log('start', unicode_id_start_regex.test('\u{0061}'))
// console.log('continue', unicode_id_continue_regex.test('_'))

// 关键字 ES6+
const keywords = ['await', 'break', 'case', 'class', 'const', 'continue',
'debugger', 'default', 'delete', 'do', 'else', 'export', 'extends', 'finally',
'for', 'function', 'if', 'import', 'in', 'instanceof', 'new', 'return', 'super',
'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield']

// 未来保留字 ES6+
const futureReservedWords = ['enum']

// 严格模式下的未来保留字 ES6+
const strictFutureReservedWords = ['implements', 'package', 'protected', 'interface', 'private',	'public']

const nullLiteral = ['null']

const booleanLiteral = ['true', 'false']

var onlyES6

const onlyES6Regex = /\\u[a-fA-F0-9]{4}/ // 表示是不是只有ES6以上的语法才可以支持

/** 是否可以作为标识头部分 */
function isIdentifierStart (ch) {
  if (/[$_]/.test(ch) || unicode_id_start_regex.test(ch)) return true
  return false
}

/** 是否可以作为标识part部分 */
function isIdentifierPart (ch) {
  if (/[$]/.test(ch) || unicode_id_continue_regex.test(ch)) return true
  return false
}

/** 将一个变量分割成start和part部分 [start, part]*/
function splitStartAndPart (varName) {
  if (varName[0] !== '\\') return [varName.substr(0, 1), varName.substr(1)]

  if (/^\\u[a-fA-F0-9]{4}/.test(varName)) return [varName.substr(0, 6), varName.substr(6)]

  // if (/^\\u\{[a-fA-F0-9]{1,6}\}/.test(varName))
  let result = []
  result[1] = varName.replace(/^\\u\{([a-fA-F0-9]{1,6})\}/g, ($0) => {
    result[0] = $0
    onlyES6 = true
    return ''
  })

  return result
}

function validJsVariable (varName) {
  let start, part
  if (!varName) return false // 不能为空

  // 不能为保留字
  if (
    keywords.indexOf(valName) !== -1
    || futureReservedWords.indexOf(valName) !== -1
    || nullLiteral.indexOf(valName) !== -1
    || booleanLiteral.indexOf(valName) !== -1
  ) return false

  [start, part] = splitStartAndPart(varName)

  return isIdentifierStart(start) && isIdentifierPart(part) || false
}
