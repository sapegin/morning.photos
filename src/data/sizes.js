import fs from 'fs-extra';

// Sizes database
export default fs.readJsonSync('data/sizes.json');
