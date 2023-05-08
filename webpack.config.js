import { resolve as _resolve } from 'path';
import { HotModuleReplacementPlugin } from 'webpack';
import Dotenv from 'dotenv-webpack';

export const entry = './src/index.js';
export const output = {
  path: _resolve(__dirname, 'build'),
  filename: 'bundle.js',
};
export const module = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    },
  ],
};
export const resolve = {
  extensions: ['*', '.js', '.jsx'],
};
export const plugins = [
  new HotModuleReplacementPlugin(),
  new Dotenv(),
];
