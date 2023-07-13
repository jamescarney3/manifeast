import ky from 'ky';

import { API_BASE } from 'configs';


const kyClient = ky.create({
  prefixUrl: API_BASE,
  hooks: {
    beforeRequest: [
      (options) => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) options.headers.set('Authorization', jwt);
      },
    ],
  }
});


export default kyClient;
