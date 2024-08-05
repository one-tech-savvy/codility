const { Readable, Transform } = require('stream');
// const signal = require('signal'); // Assuming this is imported correctly

function createReadableStream(data) {
    let seenChars = new Set();
    const readable = new Readable({
        read() {

        } // No-op
    });

    // Push initial data into the stream
    data.split('').forEach(char => readable.push(char));

    readable.on('data', (char) => {
        const charStr = char.toString();
        if (seenChars.has(charStr)) {
            console.log(`signal('duplicate', ${charStr})`);
        } else {
            console.log(`signal('received', ${charStr})`);
            seenChars.add(charStr);
        }
    });

    return readable;
}

// function createReadableStream(data) {
//     let seenChars = new Set();
//     let index = 0;

//     const readable = new Readable({
//         read() {
//             if (index < data.length) {
//                 const char = data.charAt(index++);
//                 if (seenChars.has(char)) {
//                     console.log(`signal('duplicate', ${char})`);

//                     // signal('duplicate', char);
//                 } else {
//                     // signal('received', char);
//                     console.log(`signal('received', ${char})`);

//                     seenChars.add(char);
//                 }
//                 this.push(char);
//             } else {
//                 this.push(null);
//             }
//         }
//     });

//     return readable;
// }

function createTransformStream() {
    return new Transform({
        transform(chunk, encoding, callback) {
            const char = chunk.toString();
            if (/[a-zA-Z]/.test(char)) {
                const upperChar = char.toUpperCase();
                console.log(`signal('transform', ${upperChar})`);
                callback(null, upperChar);
            } else {
                console.log(`signal('invalid', ${char})`);
                callback();
            }
        }
    });
}

function createStreamablePipeline(data) {
    const readableStream = createReadableStream(data);
    const transformStream = createTransformStream();

    readableStream.pipe(transformStream);

    return { readableStream, transformStream };
}

// Usage example
const readable = createReadableStream('AbC');
readable.push('d');
readable.push('a');
readable.push('A');

const { readableStream, transformStream } = createStreamablePipeline('abc');
readableStream.push('a');
readableStream.push('1');


// const { Readable, Transform } = require('stream');
// const signal = require('signal'); // Assuming this is imported correctly

// function createReadableStream(data) {
//     let seenChars = new Set();
//     let index = 0;

//     const readable = new Readable({
//         read() {
//             if (index < data.length) {
//                 const char = data.charAt(index++);
//                 if (seenChars.has(char)) {
//                     signal('duplicate', char);
//                 } else {
//                     signal('received', char);
//                     seenChars.add(char);
//                 }
//                 this.push(char);
//             } else {
//                 this.push(null);
//             }
//         }
//     });

//     return readable;
// }

// function createTransformStream() {
//     return new Transform({
//         transform(chunk, encoding, callback) {
//             const char = chunk.toString();
//             if (/[a-zA-Z]/.test(char)) {
//                 const upperChar = char.toUpperCase();
//                 signal('transform', upperChar);
//                 callback(null, upperChar);
//             } else {
//                 signal('invalid', char);
//                 callback();
//             }
//         }
//     });
// }

// function createStreamablePipeline(data) {
//     const readableStream = createReadableStream(data);
//     const transformStream = createTransformStream();

//     readableStream.pipe(transformStream);

//     return { readableStream, transformStream };
// }

// // Usage example
// const readable = createReadableStream('AbC');
// readable.push('d');
// readable.push('a');
// readable.push('A');

// const { readableStream, transformStream } = createStreamablePipeline('abc');
// readableStream.push('a');
// transformStream.push('1');