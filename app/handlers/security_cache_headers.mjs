// Intercepts the outbound response and sets up the appropriate
// headers on the response for security and correct caching for gatsby

// Thanks to https://www.ximedes.com/2018-04-23/deploying-gatsby-on-s3-and-cloudfront/
// for the approach which is very solid

export const handler = async (event) => {
  const request = event.Records[0].cf.request;
  const response = event.Records[0].cf.response;
  const headers = response.headers;

  if (request.uri.startsWith('/static/')) {
    headers['cache-control'] = [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable'
      }
    ];
  } else {
    if (request.uri.endsWith('sw.js')) {
      headers['cache-control'] = [
        {
          key: 'Cache-Control',
          value: 'public, max-age=0, must-revalidate'
        }
      ];
    } else {
      let cache = false;
      const uri = request.uri;
      if (uri.startsWith('/styles-') && uri.endsWith('.css')) {
        // cache built CSS files
        cache = true;
      } else if (uri.startsWith('/webpack-') && (uri.endsWith('.js') || uri.endsWith('.js.map'))) {
        // cache webpacked files
        cache = true;
      } else if (uri.startsWith('/component-') && (uri.endsWith('js') || uri.endsWith('.js.map'))) {
        // cache component react files
        cache = true;
      } else if (uri.startsWith('/commons-') && (uri.endsWith('js') || uri.endsWith('.js.map'))) {
        cache = true;
      } else if (uri.startsWith('/app-') && (uri.endsWith('js') || uri.endsWith('.js.map'))) {
        cache = true;
      }

      if (cache) {
        // if we should cache the file then send back the cache header
        headers['cache-control'] = [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ];
      } else {
        // if we shouldn't cache it then make it immutable
        headers['cache-control'] = [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate'
          }
        ];
      }
    }
  }

  [
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=15768000; includeSubDomains; preload'
    },
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff'
    },
    {
      key: 'X-Permitted-Cross-Domain-Policies',
      value: 'none'
    },
    {
      key: 'Referrer-Policy',
      value: 'no-referrer'
    },
    {
      key: 'X-Frame-Options',
      value: 'deny'
    },
    {
      key: 'X-XSS-Protection',
      value: '1; mode=block'
    },
    {
      key: 'Content-Security-Policy',
      value:
        "default-src 'self' ; " +
        "connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com" +
          " https://www.google-analytics.com https://www.googletagmanager.com" +
          " https://www.github.com/ https://docs.google.com/ ;" +
        "script-src 'self' 'unsafe-inline' https://www.google-analytics.com" +
          " https://www.googletagmanager.com ; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com ; " +
        "img-src 'self' data: https://www.google-analytics.com https://github.com " +
          " https://raw.githubusercontent.com ; " +
        "font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com ; " +
        "manifest-src 'self' ; " +
        'upgrade-insecure-requests; block-all-mixed-content ; ' +
        "frame-src 'self' http://*.ajf.io https://*.ajf.io" +
          " https://www.youtube.com https://w.soundcloud.com/ https://player.vimeo.com/" +
          " https://www.slideshare.net/ ; "
    }
  ].forEach(h => (headers[h.key.toLowerCase()] = [h]));

  return response;
};
