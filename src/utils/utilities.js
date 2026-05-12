const utilities = {
    abs: (inputObjectArray, propertyName) => {
        // Converts every negative value for propertyName to its absolute value across an array of objects
        return inputObjectArray.map((i) => {
            i[propertyName] = Math.abs(i[propertyName]);
            return i;
        });
    },
    base64Decode: (base64Encoded) => {
        return Buffer.from(base64Encoded, 'base64').toString();
    },
    base64Encode: (string) => {
        return Buffer.from(string).toString('base64');
    },
    filter: (inputObjectArray, searchString) => {
        // Filters any objects from the array where any of their properties contain the passed in search string
        if (inputObjectArray != null && searchString != null && searchString.length > 0) {
            const searchStringLower = searchString.toLowerCase();
            return inputObjectArray.filter(o => {
                for (const property in o) { // Look at each property
                    if (typeof o[property] === 'string') {
                        if (o[property].toLowerCase().indexOf(searchStringLower) !== -1) {
                            return true;
                        }
                    }
                }
                return false;
            });
        } else {
            return inputObjectArray;
        }
    },
    guid: () => {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            // eslint-disable-next-line
			const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	},
    isDate: (value) => {
        var dateFormat;
        if (toString.call(value) === '[object Date]') {
            return true;
        }
        if (typeof value.replace === 'function') {
            value.replace(/^\s+|\s+$/gm, '');
        }
        dateFormat = /(^\d{1,4}[.|\\/|-]\d{1,2}[.|\\/|-]\d{1,4})(\s*(?:0?[1-9]:[0-5]|1(?=[012])\d:[0-5])\d\s*[ap]m)?$/;
        return dateFormat.test(value);
    },
    jsonParseNumbers: (inputObject) => {
        return JSON.parse(inputObject, (k, v) => {
            if(typeof v === "object") {
                return v;
            } else {
                return isNaN(v) ? v : Number(v);
            }
        });
    },
    sort: (inputObjectArray, propertyName, descending = false) => {
        // Sort an array of objects (in place) by the value of a given propertyName either ascending (default) or descending
        if (inputObjectArray && propertyName) {
            inputObjectArray.sort((a, b) => {
                let aValue = a[propertyName];
                let bValue = b[propertyName];
                // Check if strings are actually dates
                if(utilities.isDate(aValue) && utilities.isDate(bValue)) {
                    aValue = new Date(a[propertyName]);
                    bValue = new Date(b[propertyName]);
                }
                if (aValue < bValue) {
                    return descending ? 1 : -1;
                }
                if (bValue < aValue) {
                    return descending ? -1 : 1;
                }
                return 0;
            });
        }
    },
    streamToString: async (readableStream) => {
        // A helper function used to read a Node.js readable stream into a string
        return new Promise((resolve, reject) => {
            const chunks = [];
            readableStream.on("data", (data) => {
                chunks.push(data.toString());
            });
            readableStream.on("end", () => {
                resolve(chunks.join(""));
            });
            readableStream.on("error", reject);
        });
    },
}

export default utilities