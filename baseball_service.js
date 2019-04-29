
(function(callback) {
	"use strict";
        
    const httpTransport = require('https');
    const responseEncoding = 'utf8';
    const httpOptions = {
        hostname: 'www.mysportsfeeds.com',
        port: '443',
        path: 'https://api.mysportsfeeds.com/v2.1/pull/mlb/2019-regular/standings.json',
        method: 'GET',
        headers: "Authorization":"Basic " + btoa({ '8cb8bd89-32ce-446d-b5f6-714475' } + ":" + MYSPORTSFEEDS),
    }
    httpOptions.headers['User-Agent'] = 'node ' + process.version;
 
    const request = httpTransport.request(httpOptions, (res) => {
        let responseBufs = [];
        let responseStr = '';
        
        res.on('data', (chunk) => {
            if (Buffer.isBuffer(chunk)) {
                responseBufs.push(chunk);
            } else {
                responseStr = responseStr + chunk;            
            }
        }).on('end', () => {
            responseStr = responseBufs.length > 0 ? 
                Buffer.concat(responseBufs).toString(responseEncoding) : responseStr;
            
            callback(null, res.statusCode, res.headers, responseStr);
        });
        
    });
    .setTimeout(0)
    .on('error', (error) => {
        callback(error);
    });
    request.write("")
    request.end();
    

})((error, statusCode, headers, body) => {
    console.log('ERROR:', error); 
    console.log('STATUS:', statusCode);
    console.log('HEADERS:', JSON.stringify(headers));
    console.log('BODY:', body);
});
