### Vjeux Object Notation

A notation intended to be used in URLs. JSON doesn't really shine for multiple reasons:

- It uses characters that are not usually part of urls such as ```}``` and ```"```. 
    - It fails at being automatically recognized as part of the URL in MSN Messenger.
    - It doesn't feel like a real URL for people.
- It is a bit too long. We can remove the extra quotes ```"``` and closing tags.

This is why I developped a new encoding style that is made for URL hash.

# Example

```
VJON.stringify('{"table":{"achievement":{"column":"instance","ascending":true}}}')

// Output:     '_table_achievement_column=instance&ascending:true'
```

# JSON / VJON Comparison

### Object
An object starts with an underscore ```_``` and all the fields are separated by ampersand ```&```. It makes it feel really url'ish.

- JSON: ```{"first": "value", "second": "value"}```
- VJON: ```_first=value&second=value```

### String
A string just starts with an equal sign ```=```.

- JSON: ```"string"```
- VJON: ```=string```

### Number
Sadly, we have to distinguish between Strings and Numbers/Booleans. Therefore I chose to use a semi-colon ```:``` for those instead.

- JSON: ```123.42```
- VJON: ```:123.42```

### Boolean:
- JSON: ```true```
- VJON: ```:true```

### Array
The prefix typing does not really fit well with the Array syntax. If you can find something better, I'm open to your suggestions :)

- JSON: ```[1, "vjeux", 3]```
- VJON: ```#:1&=vjeux&:3```


# Todo
There are few small things left to do:

- Make an escape character for ```=:#_```
- Handle URLEncoding properly
