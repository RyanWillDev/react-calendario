const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const rollup = require('rollup');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const packageName = 'react-calendario';
const compiledPath = path.join(__dirname, 'compiled');
const distNpmPath = path.join(__dirname, 'dist');

async function build() {
  let bundle = await rollup.rollup({
    input: path.join(compiledPath, 'Calendario.js'),

    external: ['react', 'calendar-base'],
  });

  let { code, map } = await bundle.generate({
    output: {
      format: 'cjs',
    },
    sourcemap: true,
  });

  await writeFile(path.join(distNpmPath, `${packageName}.js`), code);
  await writeFile(path.join(distNpmPath, `${packageName}.js.map`), map);

  await writeFile(
    path.join(distNpmPath, `${packageName}.d.ts`),
    await makeDefinitionsCode()
  );
}

async function makeDefinitionsCode() {
  let defs = [
    removeLocalImportsExports(
      (await readFile(path.join(compiledPath, 'types.d.ts'), 'utf-8')).trim()
    ),
    removeLocalImportsExports(
      (await readFile(
        path.join(compiledPath, 'Calendario.d.ts'),
        'utf-8'
      )).trim()
    ),
    removeSemicolons(
      removeLocalImportsExports(
        (await readFile(path.join(compiledPath, 'utils.d.ts'), 'utf-8')).trim()
      )
    ),
  ];
  return defs.join('\n\n');
}

function removeLocalImportsExports(code) {
  let localImportExport = /^\s*(import|export) .* from '\.\/.*'\s*;?\s*$/;
  return code
    .split('\n')
    .filter(line => {
      return !localImportExport.test(line);
    })
    .join('\n')
    .trim();
}

function removeSemicolons(code) {
  return code.replace(/;/g, '');
}

build().then(
  () => {
    console.log('done');
  },
  err => console.log(err.message, err.stack)
);
