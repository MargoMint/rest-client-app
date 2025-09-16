module.exports = {
  presets: [
    'next/babel',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: ['@babel/plugin-proposal-unicode-property-regex'],
};
