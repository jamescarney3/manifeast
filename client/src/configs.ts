// env var constants
export const BASE_API = (() => {
  if (process.env.NODE_ENV === 'development') return 'http://localhost:5000/api';
  if (process.env.NODE_ENV === 'production') return 'https://api-4zonbzlurq-uc.a.run.app';
})();


export default { BASE_API };
