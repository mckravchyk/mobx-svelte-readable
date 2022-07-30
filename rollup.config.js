// Using rollup-plugin-typescript2 rather than the official one as there are problems
// with generating type declarations
// https://github.com/rollup/plugins/issues/105
// https://github.com/rollup/plugins/issues/247
//
// import typescript from '@rollup/plugin-typescript'
import typescript from 'rollup-plugin-typescript2';

import banner from 'rollup-plugin-banner';
import pkg from './package.json';

/* eslint-disable import/no-default-export */

const copyright = `Copyright (c) 2022 ${pkg.author}`;
const bannerText = `${pkg.name} v${pkg.version}\n${copyright}\nLicense: ${pkg.license}`;

const defaults = {
  input: 'src/index.ts',
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
};

export default [
  // Common JS build
  {
    ...defaults,
    output: {
      file: pkg.main,
      format: 'cjs',
    },
    plugins: [
      typescript(),
      banner(bannerText),
    ],
  },

  // ESM build + type declarations
  {
    ...defaults,
    output: {
      file: pkg.module,
      format: 'es',
    },
    plugins: [
      typescript({
        tsconfig: 'tsconfig.json',
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
            declarationDir: './dist',
          },
          exclude: ['./test'],
        },
        useTsconfigDeclarationDir: true,
      }),
      banner(bannerText),
    ],
  },
];
