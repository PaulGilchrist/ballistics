const tools = {
    guid: () => {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            // eslint-disable-next-line
			const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
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
	nameSort: (a, b) => {
		if(a.name < b.name) {
			return -1;
		} else if (b.name < a.name) {
			return 1;
		} else {
			return 0;
		}
	}
}

export default tools;