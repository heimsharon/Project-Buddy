import { Material } from '../models/index.js';

const cleanDB = async (): Promise<void> => {
  try {
    await Material.deleteMany({});
    console.log('Material collection cleaned.');

  } catch (err) {
    console.error('Error cleaning collections:', err);
    process.exit(1);
  }
};

export default cleanDB;
