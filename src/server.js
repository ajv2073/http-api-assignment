const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponse.js');
const jsonXmlHandler = require('./jsonXmlResponse.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
    const parseUrl = url.parse(request.url);
    const params = query.parse(parseUrl.query);
    const acceptedType = request.headers.accept.split(',')[0];

    switch (parseUrl.pathname) {
        case '/':
            htmlHandler.getIndex(request, response);
            break;
        case '/style.css':
            htmlHandler.getCSS(request, response);
            break;
        case '/badRequest':
            jsonXmlHandler.badRequest(request, response, params, acceptedType);
            break;
        case '/success':
            jsonXmlHandler.successful(request, response, acceptedType);
            break;
        case '/unauthorized':
            jsonXmlHandler.unauthorized(request, response, params, acceptedType);
            break;
        case '/forbidden':
            jsonXmlHandler.forbidden(request, response, acceptedType);
            break;
        case '/internal':
            jsonXmlHandler.internal(request, response, acceptedType);
            break;
        case '/notImplemented':
            jsonXmlHandler.notImplemented(request, response, acceptedType);
            break;
        default:
            jsonXmlHandler.notFound(request, response, acceptedType);
            break;
    }
}

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1:${port}`);
  });
  