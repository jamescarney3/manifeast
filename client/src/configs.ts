// env var constants
export const API_BASE = (() => {
  if (process.env.NODE_ENV === 'development') return 'http://localhost:3000/api/v1';
  if (process.env.NODE_ENV === 'production') return 'https://api-4zonbzlurq-uc.a.run.app/api/v1';
})();

export const CLIENT_BASE = (() => {
  if (process.env.NODE_ENV === 'development') return 'http://localhost:1234';
  if (process.env.NODE_ENV === 'production') return 'https://api-4zonbzlurq-uc.a.run.app/api/v1';
})();


export default { API_BASE };
