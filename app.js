const fs = require('node:fs/promises');
const path = require('node:path');

const builder = async () => {
    try {
        const directory = path.join(process.cwd(), 'tester');
        await fs.mkdir(directory, {recursive: true});
        for (let i = 0; i < 2; i++) {
            await fs.writeFile(path.join(process.cwd(), 'tester', `test${i}.txt`), 'Hello World');
        }
    } catch (e) {
        console.log(e.message);
    }
};
builder().then();

