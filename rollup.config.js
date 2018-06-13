export default {
  input: './compiled/Calendario.js',
  output: {
    file: './dist/index.js',
    format: 'cjs',
  },
  external: ['react', 'calendar-base'],
};
