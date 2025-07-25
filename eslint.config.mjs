import eslint from '@eslint/js'
import prettier from 'eslint-config-prettier'
import {createTypeScriptImportResolver} from 'eslint-import-resolver-typescript'
import importPlugin from 'eslint-plugin-import'
import nodePlugin from 'eslint-plugin-n'
import perfectionist from 'eslint-plugin-perfectionist'
import unicorn from 'eslint-plugin-unicorn'
import unusedImports from 'eslint-plugin-unused-imports'
import {defineConfig, globalIgnores} from 'eslint/config'
import tseslint, {configs} from 'typescript-eslint'

export default defineConfig([
  globalIgnores(['lib/**']),
  ...tseslint.config(
    eslint.configs.recommended,
    configs.recommended,
    nodePlugin.configs['flat/recommended'],
    unicorn.configs['flat/recommended'],
    importPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.typescript,
    perfectionist.configs['recommended-natural'],
    {
      rules: {
        'perfectionist/sort-imports': [
          'error',
          {
            environment: 'node',
            groups: [
              'type',
              'builtin',
              'external',
              'internal-type',
              'internal',
              ['parent-type', 'sibling-type', 'index-type'],
              ['parent', 'sibling', 'index'],
              'object',
              'unknown',
            ],
            ignoreCase: true,
            newlinesBetween: 'always',
            order: 'asc',
            partitionByComment: false,
            partitionByNewLine: false,
            specialCharacters: 'keep',
            type: 'natural',
          },
        ],
        'perfectionist/sort-objects': [
          'error',
          {
            partitionByNewLine: true,
            type: 'natural',
          },
        ],
      },
    },
    {
      files: ['test/**/*.test.ts'],
      rules: {
        '@typescript-eslint/no-unused-expressions': 'off',
      },
    },
    {
      files: ['**/*.test.ts'],
      rules: {
        'unicorn/no-useless-undefined': 'off',
      },
    },
    {
      plugins: {
        n: nodePlugin,
        'unused-imports': unusedImports,
      },
      rules: {
        '@stylistic/comma-dangle': ['error', 'always-multiline'],
        '@stylistic/indent': [
          'error',
          2,
          {
            MemberExpression: 0,
            SwitchCase: 0,
          },
        ],
        '@stylistic/no-multi-spaces': 0,
        '@stylistic/quotes': [
          'error',
          'single',
          {
            avoidEscape: true,
          },
        ],
        '@stylistic/semi': 0,
        '@typescript-eslint/no-dupe-class-members': 'error',
        '@typescript-eslint/no-redeclare': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/no-var-requires': 'off',
        'capitalized-comments': 0,
        curly: 0,
        'default-case': 0,
        'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-cycle': 'error',
        'import/no-duplicates': [
          'error',
          {
            'prefer-inline': true,
          },
        ],
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: [
              '**/*.test.ts',
              '**/*.test.tsx',
              '**/test/**',
              '**/config-eslint/**',
              '**/vite.config.ts',
              '**/eslint.config.mjs',
              '**/vitest.mjs',
              '**/vitest.config.ts',
              '**/vitest.config.mts',
              '**/package.bundle.ts',
              '**/package.config.ts',
              '**/knip.config.ts',
            ],
            includeTypes: false,
            optionalDependencies: false,
          },
        ],
        'import/no-self-import': 'error',
        'import/no-unresolved': 'error',
        'import/order': 'off',
        'logical-assignment-operators': 'off',
        'n/hashbang': 0,
        'n/no-missing-import': 'off',
        'n/no-process-exit': 'off',
        'n/no-unsupported-features/es-syntax': 'off',
        'no-dupe-class-members': 'off',
        'no-redeclare': 'off',
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off',
        'no-useless-constructor': 'off',
        'perfectionist/sort-classes': [
          'error',
          {
            groups: [
              'index-signature',
              'static-property',
              'property',
              'private-property',
              'constructor',
              'static-method',
              'static-private-method',
              ['get-method', 'set-method'],
              'method',
              'private-method',
              'unknown',
            ],
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-interfaces': [
          'error',
          {
            groups: [
              'index-signature',
              {newlinesBetween: 'ignore'},
              ['property', 'method'],
              {newlinesBetween: 'always'},
              ['optional-property', 'optional-method'],
              {newlinesBetween: 'ignore'},
            ],
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-modules': 'off',
        'perfectionist/sort-union-types': [
          'error',
          {
            groups: ['unknown', 'nullish'],
            order: 'asc',
            type: 'natural',
          },
        ],
        'unicorn/catch-error-name': 'off',
        'unicorn/filename-case': 'off',
        'unicorn/import-style': [
          'error',
          {
            styles: {
              'node:path': {
                named: true,
              },
            },
          },
        ],
        'unicorn/no-await-expression-member': 'off',
        'unicorn/no-null': 'off',
        'unicorn/no-process-exit': 'off',
        'unicorn/prefer-module': 'warn',
        'unicorn/prevent-abbreviations': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'error',
          {
            args: 'after-used',
            argsIgnorePattern: '^_',
            vars: 'all',
            varsIgnorePattern: '^_',
          },
        ],
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
          },
        },
        'import/resolver-next': [
          createTypeScriptImportResolver({
            alwaysTryTypes: true,
            extensions: ['.js', '.jsx', '.ts', 'tsx', '.mjs', '.mts'],
          }),
        ],
      },
    },
  ),
  prettier,
])
