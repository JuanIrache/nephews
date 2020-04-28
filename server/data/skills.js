// Skills metadata used to classify call transcriptions. To-DO: Improve with external APIs and databases

module.exports = [
  {
    name: 'Windows',
    code: 'win',
    synonyms: ['p.c.', 'microsoft', 'acer'],
    generic: ['computer', 'laptop'],
    related: [
      'mouse',
      'screen',
      'keyboard',
      'monitor',
      'internet',
      'hard drive',
      'speakers',
      'email',
      'gmail',
      'website',
      'site',
      'browser',
      'navigate',
      'internet',
      'connection'
    ]
  },
  {
    name: 'macOS',
    code: 'mac',
    synonyms: ['macintosh', 'apple computer'],
    generic: ['computer', 'laptop'],
    related: [
      'mouse',
      'screen',
      'keyboard',
      'monitor',
      'internet',
      'hard drive',
      'speakers',
      'email',
      'gmail',
      'website',
      'site',
      'browser',
      'navigage',
      'internet',
      'connection'
    ]
  },
  {
    name: 'Android',
    code: 'and',
    synonyms: ['samsung phone', 'google phone', 'pixel phone', 'huawei phone'],
    generic: ['phone', 'cell phone', 'mobile', 'tablet'],
    related: [
      'cellular',
      'data plan',
      'touchscreen',
      'signal',
      '3g',
      'call',
      'line',
      'email',
      'gmail',
      'website',
      'site',
      'browser',
      'navigage',
      'internet',
      'connection'
    ]
  },
  {
    name: 'iOS',
    code: 'ios',
    synonyms: ['iphone', 'apple phone', 'ipad'],
    generic: ['phone', 'cell phone', 'mobile', 'tablet', 'ipod'],
    related: [
      'cellular',
      'data plan',
      'touchscreen',
      'signal',
      '3g',
      'call',
      'line',
      'email',
      'gmail',
      'website',
      'site',
      'browser',
      'navigage',
      'internet',
      'connection'
    ]
  },
  {
    name: 'TV',
    code: 'tvs',
    synonyms: ['television', 't.v.'],
    generic: [],
    related: ['channels', 'cable', 'netflix', 'hbo', 'antenna']
  },
  {
    name: 'Photography',
    code: 'pho',
    synonyms: ['camera', 'photo', 'camcorder'],
    generic: [],
    related: ['nikon', 'canon', 'gopro', 'lens', 'picture']
  }
];
