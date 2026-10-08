// export interface User {
//   username: string;
//   password: string;
//   role: 'valid' | 'invalid';
//   expectedError?: string;
// }

export type User =
  | {
    username: string;
    password: string;
    role: 'valid';
  }
  | {
    username: string;
    password: string;
    role: 'invalid';
    expectedError: string;
  };

// export const loginUsers: User[] = [
//   {
//     username: 'standard_user',
//     password: 'secret_sauce',
//     role: 'valid'
//   },
//   {
//     username: 'invalid_user',
//     password: 'secret_sauce',
//     role: 'invalid',
//     expectedError: 'Username and password do not match',
//   },
//   {
//     username: 'locked_out_user',
//     password: 'secret_sauce',
//     role: 'invalid',
//     expectedError: 'Epic sadface: Sorry, this user has been locked out.',

//   },



// ];

export const invalidUsers: Extract<User, { role: 'invalid' }>[] = [
  {
    username: 'invalid_user',
    password: 'secret_sauce',
    role: 'invalid',
    expectedError: 'Username and password do not match',
  },
  {
    username: 'locked_out_user',
    password: 'secret_sauce',
    role: 'invalid',
    expectedError: 'Epic sadface: Sorry, this user has been locked out.'
  },


];

export const validUsers: Extract<User, { role: 'valid'}>[] = [
  {
    username: 'standard_user',
    password: 'secret_sauce',
    role: 'valid',
  },
];


export const standardUser: User = {
  username: 'standard_user',
  password: 'secret_sauce',
  role: 'valid',
};

export const invalidUser: User = {
  username: 'invalid_user',
  password: 'secret_sauce',
  role: 'invalid',
  expectedError: 'Username and password do not match',
};

export const checkoutUser = {
  firstName: 'Syed',
  lastName: 'Tester',
  postalCode: '524001',
};