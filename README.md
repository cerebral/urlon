# URL Object Notation

An Object Notation like JSON but for URLs. [Read the full explanation on my blog](http://blog.vjeux.com/2011/javascript/urlon-url-object-notation.html).

### Usage

```
URLON.stringify('{"table":{"achievement":{"column":"instance","ascending":true}}}')

// Output:      '_table_achievement_column=instance&ascending:true'
```

```
URLON.parse('_table_achievement_column=instance&ascending:true')

// Output:  {"table":{"achievement":{"column":"instance","ascending":true}}}
```

