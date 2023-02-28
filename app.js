const fs = require('node:fs');
const path = require('path');

// fs.mkdir(path.join('folder'), (err) => {
//     if (err) throw new Error();
//     for (let i =1; i < 6; i++) {
//         fs.writeFile(path.join(__dirname, 'folder', `${i}.txt`), `Hello file number ${i}`, (err) => {
//             if (err) throw new Error(err.message);
//         })
//     }
//     for (let q = 1; q < 6; q++) {
//         fs.mkdir(path.join(__dirname, 'folder', `${q}`), (err) => {
//             if (err) throw new Error();
//         })
//     }
// });

// fs.readdir(path.join('folder'), {withFileTypes: true}, (err, data) => {
//     console.log(data);
//     data.forEach(file => {
//         file.isFile() ? console.log(`File: ${file.name}`): console.log(`Folder: ${file.name}`);
//     })
// });

// fs.readdir(path.join('folder'), {withFileTypes: true}, (err, data) => {
//     if (err) throw new Error();
//     data.map(file => {
//         file.isFile() ? console.log(`File: ${file.name}`): console.log(`Folder: ${file.name}`)
//     })
// });
//
// fs.truncate(path.join(__dirname, 'folder', '3.txt'), () => {
//
// });
//
// fs.stat(path.join(__dirname, 'folder', '4.txt'), (err, stats) => {
//     if (err) throw new Error();
//     console.log(stats.isFile());
// })

// fs.appendFile(path.join(__dirname, 'folder', '3.txt'), 'Hello World!', () => {
//
// })
//
// fs.mkdir(path.join(__dirname, 'tester'), () => {
//
// })

// fs.rmdir(path.join(__dirname, 'tester'), () => {
//
// })
