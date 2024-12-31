// this handler looks for requests that are effectively for directories
// coming through cloudfront. As it doesn't know that that means to serve
// the index file, it just throws a 404. This will perform the appropriate
// rerouting of the URL so that S3 can retrieve the right file and respond
// correctly.

export const handler = async (event) => {
  const request = event.Records[0].cf.request;
  const { uri } = request;

  if (uri.endsWith('%7Bauthourl%7D')) {
    // this is dealing with a bunch of the 404 errors we see where there's a
    // {authourl} appended to the end of the request - just remove this
    request.uri = uri.replace('%7Bauthourl%7D', '');
  }

  if (uri.endsWith('{authourl}')) {
    // this is dealing with a bunch of the 404 errors we see where there's a
    // {authourl} appended to the end of the request - just remove this
    request.uri = uri.replace('{authourl}', '');
  }

  if (uri.endsWith('/tagged/sms/')) {
    request.uri = '/tagged/mobile/';
  }
  if (uri.endsWith('/tagged/data/')) {
    request.uri = '/tagged/data-science/';
  }

  if (request.uri.endsWith('/')) {
    request.uri += 'index.html';
  } else if (!request.uri.includes('.')) {
    request.uri += '/index.html';
  }

  return request;
};

