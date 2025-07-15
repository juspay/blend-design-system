module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'build', // Changes that affect the build system or external dependencies
                'chore', // Routine tasks, maintenance, or tooling changes
                'ci', // Changes to CI configuration files and scripts
                'docs', // Documentation only changes
                'feat', // A new feature for the user
                'fix', // A bug fix for the user
                'perf', // A code change that improves performance
                'refactor', // A code change that neither fixes a bug nor adds a feature
                'revert', // Reverts a previous commit
                'style', // Changes that do not affect the meaning of the code (formatting, etc.)
                'test', // Adding missing tests or correcting existing tests
            ],
        ],
        'subject-case': [0],
        'type-case': [2, 'always', 'lower-case'],
        'header-max-length': [2, 'always', 82],
    },
}
