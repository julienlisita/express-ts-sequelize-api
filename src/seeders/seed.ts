// src/seeders/seed.ts

import { User } from '../models/userModel';
import { getSeedUsers } from './usersData';

export default async function seed() {
  try {
    console.log(' Seeding database...');
    await User.destroy({ where: {}, truncate: true });

    const users = await getSeedUsers();
    await User.bulkCreate(users);

    console.log(' Users seeded successfully.');
  } catch (error) {
    console.error(' Seeding error:', error);
  }
}