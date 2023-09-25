//generic response
const respond = (request, response, status, content, type) => {
    response.writeHead(status, { 'Content-Type': type });
    response.write(content);
    response.end();
};

//Successful response
const successful = (request, response, acceptedType) => {
    const content = {
        message: 'Wow!  A successful response!',
    };

    if (acceptedType === 'text.xml') {
        let responseXml = '<response>';
        responseXml = `${responseXml} <message>${content.message}</message></response>`;
        return respond(request, response, 200, responseXml, 'text/xml');
    }

    const responseJson = JSON.stringify(content);
    return respond(request, response, 200, responseJson, 'application/json');
};

//returns success or failure based on valid parameter
const badRequest = (request, response, params, acceptedType) => {
    const content = {
        message: 'This request has the required parameters',
      };

    if (!params.valid || params.valid !== 'true') {
        content.message = 'Missing valid query parameter set to true';
        content.id = 'badRequest';
    }

    if (acceptedType === 'text/xml') {
        let responseXml = '<response>';
        responseXml = `${responseXml} <message>${content.message}</message>`;
        if (content.id) {
            responseXml = `${responseXml} <id>${content.id}</id> </response>`;
            return respond(request, response, 400, responseXml, 'text/xml');
        }
        responseXml = `${responseXml} </response>`;
        return respond(request, response, 200, responseXml, 'text/xml');
    }

    const responseJson = JSON.stringify(content);
    if (content.id) {
        return respond(request, response, 400, responseJson, 'application/json');
    }
    return respond(request, response, 200, responseJson, 'application/json');
};

//not found
const notFound = (request, response, acceptedType) => {
    const content = {
      message: 'The page you are looking for was not found.',
      id: 'notFound',
    };
  
    if (acceptedType === 'text/xml') {
      let responseXml = '<response>';
      responseXml = `${responseXml} <message>${content.message}</message>`;
      responseXml = `${responseXml} <id>${content.id}</id> </response>`;
      return respond(request, response, 404, responseXml, 'text/xml');
    }
  
    const responseJson = JSON.stringify(content);
    return respond(request, response, 404, responseJson, 'application/json');
  };

  //unauthorized
  const unauthorized = (request, response, params, acceptedType) => {
    const content = {
      message: 'You have successfully viewd the content.',
    };
  
    // make sure loggedIn exists as a parameter and check its value
    // - if it's not yes, the response will be a failure
    if (!params.loggedIn || params.loggedIn !== 'yes') {
      content.message = 'Missing loggedIn query parameter set to yes';
      content.id = 'unauthorized';
    }
  
    if (acceptedType === 'text/xml') {
      let responseXml = '<response>';
      responseXml = `${responseXml} <message>${content.message}</message>`;
      if (content.id) {
        responseXml = `${responseXml} <id>${content.id}</id> </response>`;
        return respond(request, response, 401, responseXml, 'text/xml');
      }
      responseXml = `${responseXml} </response>`;
      return respond(request, response, 200, responseXml, 'text/xml');
    }
  
    const responseJson = JSON.stringify(content);
    if (content.id) {
      return respond(request, response, 401, responseJson, 'application/json');
    }
    return respond(request, response, 200, responseJson, 'application/json');
  };

  //Forbidden
  const forbidden = (request, response, acceptedType) => {
    const content = {
      message: 'You do not have access to this content.',
      id: 'forbidden',
    };
  
    if (acceptedType === 'text/xml') {
      let responseXml = '<response>';
      responseXml = `${responseXml} <message>${content.message}</message>`;
      responseXml = `${responseXml} <id>${content.id}</id> </response>`;
      return respond(request, response, 403, responseXml, 'text/xml');
    }
  
    const responseJson = JSON.stringify(content);
    return respond(request, response, 403, responseJson, 'application/json');
  };

  //Internal
  const internal = (request, response, acceptedType) => {
    const content = {
      message: 'Internal Server Error. Something went wrong.',
      id: 'internalError',
    };
  
    if (acceptedType === 'text/xml') {
      let responseXml = '<response>';
      responseXml = `${responseXml} <message>${content.message}</message>`;
      responseXml = `${responseXml} <id>${content.id}</id> </response>`;
      return respond(request, response, 500, responseXml, 'text/xml');
    }
  
    const responseJson = JSON.stringify(content);
    return respond(request, response, 500, responseJson, 'application/json');
  };

//Not implemented
const notImplemented = (request, response, acceptedType) => {
    const content = {
      message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
      id: 'notImplemented',
    };
  
    if (acceptedType === 'text/xml') {
      let responseXml = '<response>';
      responseXml = `${responseXml} <message>${content.message}</message>`;
      responseXml = `${responseXml} <id>${content.id}</id> </response>`;
      return respond(request, response, 501, responseXml, 'text/xml');
    }
  
    const responseJson = JSON.stringify(content);
    return respond(request, response, 501, responseJson, 'application/json');
  };

module.exports.respond = respond;
module.exports.successful = successful;
module.exports.badRequest = badRequest;
module.exports.notFound = notFound;
module.exports.unauthorized = unauthorized;
module.exports.forbidden = forbidden;
module.exports.internal = internal;
module.exports.notImplemented = notImplemented;