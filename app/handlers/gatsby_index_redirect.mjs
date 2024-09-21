// this handler looks for requests that are effectively for directories
// coming through cloudfront. As it doesn't know that that means to serve
// the index file, it just throws a 404. This will perform the appropriate
// rerouting of the URL so that S3 can retrieve the right file and respond
// correctly.

export const handler = async (event) => {
  const request = event.Records[0].cf.request;
  const { uri } = request;

  if (uri.endsWith('/')) {
    request.uri += 'index.html';
  } else if (!uri.includes('.')) {
    request.uri += '/index.html';
  }

  return request;
};
