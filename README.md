# html-purifier

Extract useful bits from huge html documents as fast as possible.

## Usage

> npm install @mcrowe/html-purifier --save

```js
import HtmlPurifier from '@mcrowe/html-purifier'

const html = '<body><div></div><div id="rank">def<span>abc</span><script></script>123</div><div><section>toy<img class="my-image" src="hello" /> 123 </section></div></body>'

const result = HtmlPurifier.purify(html, [
  '#rank',
  '.my-image'
])

assert(
  result === '<div id="rank">def<span>abc</span>123</div><img class="my-image" src="hello" />'
)
```

## Development

Install npm modules:

> npm install

Run tests:

> npm test

## Release

Release a new version:

> bin/release.sh

This will publish a new version to npm, as well as push a new tag up to github.
