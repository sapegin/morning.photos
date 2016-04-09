import fs from 'fs';
import YAML from 'yamljs';

const BOOKS_YML = 'data/books.yml';

// Books database
export default YAML.load(BOOKS_YML);
export const booksPubDate = fs.statSync(BOOKS_YML).mtime;
