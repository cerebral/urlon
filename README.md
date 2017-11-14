# URL Object Notation

An Object Notation like JSON but for URLs.
Read the full explanation on @vjeux blog:
http://blog.vjeux.com/2011/javascript/urlon-url-object-notation.html

Note that format is slightly changed since article was published, but main idea remains the same.

## Getting started
### NPM
URLON is on [NPM](http://search.npmjs.org/#/urlon).

```sh
npm install urlon
```
```javascript
var URLON = require('urlon');
```

### UMD build using `<script>`
```html
<script src="https://unpkg.com/urlon/dist/urlon.umd.js"></script>
<script>
  urlon // urlon.stringify() or urlon.parse()
</script>
```

## Usage

### stringify

```javascript
URLON.stringify({"table":{"achievement":{"column":"instance","ascending":true}}})

// Output:      '$table$achievement$column=instance&ascending:true'
```

### parse

```javascript
URLON.parse('$table$achievement$column=instance&ascending:true')

// Output:  {"table":{"achievement":{"column":"instance","ascending":true}}}
```

## Projects using URLON

* [url-mapper](https://github.com/cerebral/url-mapper) - `@cerebral/router` default mapper for URLs

## Changelog

See [releases](https://github.com/cerebral/urlon/releases)
