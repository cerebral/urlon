# URL Object Notation

An Object Notation like JSON but for URLs. [Read the full explanation on my blog](http://blog.vjeux.com/2011/javascript/urlon-url-object-notation.html).

## Get URLON

You first need to enable URLON.

### NPM
URLON is on [NPM] (http://search.npmjs.org/#/urlon).

```
npm install urlon
```
```javascript
var URLON = require('urlon');
```

### Webpage
```html
<script src="https://unpkg.com/urlon@2.1.0/dist/urlon.umd.js"></script>
<script>
  urlon // urlon.stringify() or urlon.parse()
</script>
```

or

```html
<script src="https://unpkg.com/urlon@2.1.0/dist/URLON.umd.js"></script>
<script>
  URLON // URLON.stringify() or URLON.parse()
</script>
```

## Usage

### stringify

```javascript
URLON.stringify('{"table":{"achievement":{"column":"instance","ascending":true}}}')

// Output:      '_table_achievement_column=instance&ascending:true'
```

### parse

```javascript
URLON.parse('_table_achievement_column=instance&ascending:true')

// Output:  {"table":{"achievement":{"column":"instance","ascending":true}}}
```
