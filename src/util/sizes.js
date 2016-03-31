import fs from 'fs-extra';

const SIZES_JSON = 'data/sizes.json';

// Sizes database
export default fs.readJsonSync(SIZES_JSON);
