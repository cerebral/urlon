URLON = {
	stringify: function (input) {
		var str = '';

		if (input instanceof Array) {
			str += '#';
			for (var i = 0; i < input.length; ++i) {
				str += URLON.stringify(input[i]) + '&';
			}
			str = str.substring(0, str.length - 1);
		}
		// Object
		if (typeof input === 'object') {
			str += '_';
			for (var key in input) {
				str += key + URLON.stringify(input[key]) + '&';
			}
			str = str.substring(0, str.length - 1);
		}
		// Boolean
		else if (input === true || input === false) {
			str += ':' + input;
		}
		// Number
		else if (typeof input === 'number') {
			str += ':' + input;
		}
		// String
		else {
			str += '=' + input.toString();
		}

		return str;
	},

	parse: function (str) {
		var pos = 0;

		function read() {
			var token = '';
			for (; pos !== str.length; ++pos) {
				if (str[pos].match(/[=:&#_]/)) {
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
			if (type === '#') {
				var res = [];
				while (1) {
					res.push(parse());
					if (str[pos] !== '&') {
						break;
					}
					pos += 1;
				}
				return res;
			}
			// Object
			if (type === '_') {
				var res = {};
				while (1) {
					var name = read();
					res[name] = parse();
					if (str[pos] !== '&') {
						break;
					}
					pos += 1;
				}
				return res;
			}
			// Error
			throw 'Unexpected char ' + type;
		}

		return parse();
	}
};
