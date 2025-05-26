import mongoose from 'mongoose';

const cleanDB = async (): Promise<void> => {
  try {
    await mongoose.connection.dropDatabase();
    console.log('Database cleaned successfully.');

  } catch (err) {
    console.error('Error cleaning collections:', err);
    process.exit(1);
  }
};

export default cleanDB;
