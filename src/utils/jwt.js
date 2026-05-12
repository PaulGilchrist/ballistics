const axios = require('axios');
const https = require('https');
const jwtWebToken = require('jsonwebtoken');

const jwt = {
    decode: (encodedJwt) => {
        let idTokenPartsRegex = /^([^\.\s]*)\.([^\.\s]+)\.([^\.\s]*)$/;
        let matches = idTokenPartsRegex.exec(encodedJwt);
        if (!matches || matches.length < 4) {
            console.log('The returned token is not parseable.');
            return null;
        }
        let decodedJwt = {
            header: matches[1],
            payload: matches[2],
            signature: matches[3]
        };
        return decodedJwt;
    },
    extractHeader: (encodedJwt) => {
        // id token will be decoded to get the username
        let decodedJwt = utilities.jwt.decode(encodedJwt);
        if(decodedJwt) {
            try {
                return JSON.parse(utilities.base64Decode(decodedJwt.header));
            } catch (err) {
                console.log('The token could not be decoded: ' + err);
            }
        }
        return null;
    },
    extractSignature: (encodedJwt) => {
        // id token will be decoded to get the username
        let decodedJwt = utilities.jwt.decode(encodedJwt);
        if(decodedJwt) {
            try {
                return JSON.parse(utilities.base64Decode(decodedJwt.signature));
            } catch (err) {
                console.log('The token could not be decoded: ' + err);
            }
        }
        return null;
    },
    extractToken: (encodedJwt) => {
        // id token will be decoded to get the username
        let decodedJwt = utilities.jwt.decode(encodedJwt);
        let base64Jwt = null;
        if(decodedJwt) {
            base64Jwt = decodedJwt.payload;
        } else {
            base64Jwt = encodedJwt;
        }
        try {
            return JSON.parse(utilities.base64Decode(base64Jwt));
        } catch (err) {
            console.log('The token could not be decoded: ' + err);
        }
        return null;
    },
    verify: async (encodedJwt) => {
        const header = utilities.jwt.extractHeader(encodedJwt);
        // Get Azure configuration
        // const configuration = await axios.request({
        //     data: null,            
        //     headers: {
        //             'Content-Type': 'application/json'
        //     },
        //     httpsAgent: new https.Agent({
        //         keepAlive: true,
        //         rejectUnauthorized: false // (NOTE: this will disable client verification)
        //     }),
        //     method: 'get',
        //     url: "https://login.microsoftonline.com/common/.well-known/openid-configuration"
        // }).then(response => response.data);
        // Get Azure public encryption keys
        const keys = await axios.request({
            data: null,            
            headers: {
                    'Content-Type': 'application/json'
            },
            httpsAgent: new https.Agent({
                keepAlive: true,
                rejectUnauthorized: false // (NOTE: this will disable client verification)
            }),
            method: 'get',
            url: "https://login.microsoftonline.com/common/discovery/keys" //could also get from above commented out code - configuration.jwks_uri
        }).then(response => response.data.keys);
        // Make sure the key used to encrypt the token matches Microsoft's key
        const matchingKey = keys.find(key => key.kid===header.kid);
        const certificate = `-----BEGIN CERTIFICATE-----\n${matchingKey.x5c}\n-----END CERTIFICATE-----`;
        return jwtWebToken.verify(encodedJwt, certificate);
    }
}

module.exports = jwt;