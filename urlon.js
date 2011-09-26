URLON = {
	stringify: function (input) {
		function encodeString (str) {
			return encodeURI(str.replace(/([=:&@_;\/])/g, '/$1'));
		}

		function stringify (input) {
			// Number or Boolean or Null
			if (typeof input === 'number' || input === true || input === false || input === null) {
				return ':' + input;
			}
			// Array
			if (input instanceof Array) {
				var res = [];
				for (var i = 0; i < input.length; ++i) {
					res.push(stringify(input[i]));
				}
				return '@' + res.join('@') + ';';
			}
			// Object
			if (typeof input === 'object') {
				var res = [];
				for (var key in input) {
					res.push(encodeString(key) + stringify(input[key]));
				}
				return '_' + res.join('&') + ';';
			}
			// String
			return '=' + encodeString(input.toString());
		}

		return stringify(input).replace(/;+$/g, '');
	},

	parse: function (str) {
		var pos = 0;
		str = decodeURI(str);

		function read() {
			var token = '';
			for (; pos !== str.length; ++pos) {
				if (str[pos] === '/') {
					pos += 1;
					if (pos === str.length) {
						break;
					}
				} else if (str[pos].match(/[=:&@_;]/)) {
					break;
				}
				token += str[pos];
			}
			return token;
		}

		function parse() {
			var type = str[pos++];

			// String
			if (type === '=') {
				return read();
			}
			// Number or Boolean
			if (type === ':') {
				var value = read();
				if (value === 'true' || value === 'false') {
					return Boolean(value);
				}
				value = parseFloat(value);
				return isNaN(value) ? null : value;
			}
			// Array
			if (type === '@') {
				var res = [];
				pos -= 1;
				while (1) {
					pos += 1;
					if (pos >= str.length || str[pos] === ';') {
						pos += 1;
						break;
					}
					res.push(parse());
				}
				return res;
			}
			// Object
			if (type === '_') {
				var res = {};
				pos -= 1;
				while (1) {
					pos += 1;
					if (pos >= str.length || str[pos] === ';') {
						pos += 1;
						break;
					}
					var name = read();
					res[name] = parse();
				}
				return res;
			}
			// Error
			throw 'Unexpected char ' + type;
		}

		return parse();
	}
};

if (typeof exports !== 'undefined') {
	exports.stringify = URLON.stringify;
	exports.parse = URLON.parse;
}
