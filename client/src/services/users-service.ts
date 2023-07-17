import kyClient from 'services/base';
import { User } from 'types/models';


export const createUser = (email, password): Promise<User> => {
  return new Promise<User>((resolve, reject) => {
    const data = { user: { email, password } };
    kyClient.post('users', { json: data })
      .json()
      .then((data) => {
        const user = { id: data.id, email: data.email };
        localStorage.setItem('jwt', data.jwt);
        resolve(user);
      })
      .catch((error) => error.response.json())
      .then((messages) => reject(messages));
  });
};


export default { createUser };
