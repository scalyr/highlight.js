/*
 Language: Scalyr Query Language
 Author: Chris Council <chris@scalyr.com>
 Category: misc
 */

function(hljs) {
  var SCALYR_KEYWORDS = 'where contains and or not';
  var SCALYR_LITERALS = 'true false';
  var SCALYR_FUNCTIONS = 'countPerSecond|hourOfDay|dayOfWeek|mean|min|max|sumPerSecond|median|p10|p50|p90|p95|p999|p99|p|fraction|count';

  var REGEX = {
    className: 'regexp',
    contains: [hljs.BACKSLASH_ESCAPE],
    illegal: /\n/,
    variants: [
      {begin: "'", end: "'"},
      {begin: '"', end: '"'}
    ]
  };

  var DOLLAR_VARIABLE = {
    className: 'template-variable',
    keywords: SCALYR_KEYWORDS,
    begin: /\$[\w\d_]+/, end: /[^$0-9A-Za-z_]/, excludeEnd: /[^$0-9A-Za-z_]/, contains:[{begin: /\\./}]
  };

  var VARIABLE = {
    className: 'variable',
    keywords: SCALYR_KEYWORDS,
    variants: [
      { begin: /\\b[\w\d_]+/ },
      { begin: /[\w\d_]+/, end: /[^$0-9A-Za-z_]/, excludeEnd: /[^$0-9A-Za-z_]/, contains:[{begin: /\\./}]}
    ]
  };

  var REGEX_EXP = { // regexp container
    className: 'keyword',
    begin: /(\$)/,
    contains: [REGEX]
  };

  var CONTAINS = [
    {
      className: 'negation',
      begin: /(\!)/,
      contains: [ 'self' ]
    },
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    {
      className: 'keyword',
      begin: /matches\s+/,
      contains: [ REGEX ]
    },
    {
      className: 'negation',
      begin: '\\b(not |Not |NOT )',
      excludeEnd: true
    },
    {
      className: 'function',
      beginKeywords: SCALYR_FUNCTIONS.replace('|', ' '),
      end: '\\(',
      excludeEnd: true
    },
    {
      className: 'duration',
      begin: '\\b\\:\\d+\\w'
    },
    DOLLAR_VARIABLE,
    hljs.NUMBER_MODE,
    VARIABLE,
    REGEX_EXP
  ];

  return {
    keywords: SCALYR_KEYWORDS,
    contains: CONTAINS
  };
}
