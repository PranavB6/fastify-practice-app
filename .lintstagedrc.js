export default {
  '*.{js,mjs,cjs,ts}': [
    'cspell --file',
    'eslint --fix',
    'prettier --ignore-unknown --write',
  ],
  '!*.{js,mjs,cjs,ts}': [
    'cspell --no-must-find-files --file',
    'prettier --ignore-unknown --write',
  ],
};
