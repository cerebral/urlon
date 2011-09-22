URLON = {
	stringify: function (input) {
		function encodeString (str) {
			return encodeURI(str.replace(/([=:&#_,])/g, '$1$1'));
		}
		
		function stringify (input) {
			// Number or Boolean or Null
			if (typeof input === 'number' || input === true || input === false || input === null) {
				return ':' + input;
			}
			// Array
			if (input instanceof Array) {
				var str = '#';
				for (var i = 0; i < input.length; ++i) {
					str += stringify(input[i]) + ',';
				}
				return str.substring(0, str.length - 1);
			}
			// Object
			if (typeof input === 'object') {
				var str = '_';
				for (var key in input) {
					str += encodeString(key) + stringify(input[key]) + '&';
				}
				return str.substring(0, str.length - 1);
			}
			// String
			return '=' + encodeString(input.toString());
		}
		
		return stringify(input);
	},
	
	parse: function (str) {
		var pos = 0;
		str = decodeURI(str);

		function read() {
			var token = '';
			for (; pos !== str.length; ++pos) {
				if (str[pos].match(/[=:&#_,]/)) {
					if (str[pos + 1] === str[pos]) {
						pos += 1;
					} eles {
						break;
					}
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
					if (str[pos] !== ',') {
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
