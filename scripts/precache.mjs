import {readdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const files=await readdir('out',{recursive:true});
const assets=files.filter(file=>/\.(js|css|svg|json|woff2)$/.test(file)&&file!=='sw.js').map(file=>'/'+file.replaceAll('\\','/'));
const shell=await readFile('public/sw.js','utf8');
const version=createHash('sha256').update(JSON.stringify(assets)).update(await readFile('out/index.html')).digest('hex').slice(0,12);
await writeFile('out/sw.js',shell.replace("'tsime-shell-v1'",`'tsime-shell-${version}'`).replace("['/','/icon.svg','/manifest.json']",JSON.stringify(['/',...assets])));
console.log(`Offline shell: ${assets.length+1} assets precached (${version})`);
