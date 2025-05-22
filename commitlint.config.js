export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['init', 'feat', 'fix', 'refactor', 'docs']],

    'type-case': [2, 'always', 'lower-case'],

    'subject-empty': [2, 'never'],

    'subject-case': [0],

    'subject-full-stop': [2, 'never', '.'],

    'header-max-length': [2, 'always', 100],
  },
};
