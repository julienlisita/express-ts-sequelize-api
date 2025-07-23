// src/seeders/userData.ts

import bcrypt from 'bcrypt';

const rawUsers = [
  {
    username: 'AliceDupont',
    email: 'alice.dupont@example.com',
    password: 'hashed_password_1',
  },
  {
    username: 'BobMartin',
    email: 'bob.martin@example.com',
    password: 'hashed_password_2',
  },
  {
    username: 'CharlieDurand',
    email: 'charlie.durand@example.com',
    password: 'hashed_password_3',
  },
  {
    username: 'DianePetit',
    email: 'diane.petit@example.com',
    password: 'hashed_password_4',
  },
  {
    username: 'EricRoux',
    email: 'eric.roux@example.com',
    password: 'hashed_password_5',
  },
  {
    username: 'FannyMoreau',
    email: 'fanny.moreau@example.com',
    password: 'hashed_password_6',
  },
  {
    username: 'GillesBlanc',
    email: 'gilles.blanc@example.com',
    password: 'hashed_password_7',
  },
  {
    username: 'HélèneGirard',
    email: 'helene.girard@example.com',
    password: 'hashed_password_8',
  },
  {
    username: 'IsmaelNoir',
    email: 'ismael.noir@example.com',
    password: 'hashed_password_9',
  },
  {
    username: 'JulieVerdier',
    email: 'julie.verdier@example.com',
    password: 'hashed_password_10',
  },
];

export async function getSeedUsers() {
  const users = await Promise.all(
    rawUsers.map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    }))
  );
  return users;
}