import kyClient from 'services/base';
import { User } from 'types/models';


type SessionResponse = {
  jwt: string,
  user: User,
};

export const signIn = (email, password): Promise<User> => {
  return new Promise<User>((resolve, reject) => {
    const data = { user: { email, password } };
    kyClient.post('session', { json: data })
      .json()
      .then((data: SessionResponse) => {
        const user = { id: data.id, email: data.email };
        const jwt = data.jwt;
        localStorage.setItem('jwt', jwt);
        resolve(user);
      })
      .catch((error) => error.response.json())
      .then((messages) => reject(messages));
  });
};

export const signInWithToken = (): Promise<User> => {
  return new Promise<User>((resolve, reject) => {
    kyClient.get('session')
      .json()
      .then((data: SessionResponse) => {
        const user = { id: data.id, email: data.email };
        resolve(user);
      })
      .catch((error) => error.response.json())
      .then((messages) => reject(messages));
  });
};

export const signOut = (): void => {
  localStorage.removeItem('jwt');
};


export default { signIn, signInWithToken, signOut };
