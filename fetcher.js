// Example code:
// > node fetcher.js http://www.example.edu/ ./index.html
// Downloaded and saved 3261 bytes to ./index.html
const fs = require('fs');
const request = require('request');
const args = process.argv.slice(2);
const readline = require('readline');
const domain = args[0];
const writeLoc = args[1];
let done = false;

// console.log(args);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
// Check if valid file-path


// Use the request library to make the HTTP request
const webPageConnect = request(domain, (error, response, body) => {
  // console.log('body:', body); // Print the HTML for the Google homepage.
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  if (response === undefined) {
    console.log("Couldn't load webpage, did not receive a response. Is your website valid?");
  } else if (error) {
    console.log('error:', error);
  } else {
    try {
      if (fs.existsSync(writeLoc)) {
        done = true;
        rl.question('File exists. Overwrite? (y/n): ', (overwrite) => {
          if (overwrite === 'y') {
            fs.writeFile(writeLoc, body, (err) => {
              if (err) {
                // rl.close();
                // Returns error if no directory
                return console.log(err);
              }
              const stats = fs.statSync(writeLoc);
              const fileSizeInBytes = stats["size"];
              console.log(`Download & saved ${fileSizeInBytes} bytes to ${writeLoc}!`);
              
            }
            );
            rl.close();
          } else {
            rl.close();
          }
        }
        );
      } else {
        fs.writeFile(writeLoc, body, (err) => {
          if (err) {
            return console.log(err);
          }
          const stats = fs.statSync(writeLoc);
          const fileSizeInBytes = stats["size"];
          console.log(`Download & saved ${fileSizeInBytes} bytes to ${writeLoc}! No over-write necessary`);
          // rl.close();
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  // webPageConnect.end();
  if (!done) {
    rl.close();
  }

});

// webPageConnect();
// Use Node's fs module to write the file
// Use the callback based approach we've been learning so far
// Do not use the pipe function
// Do not use synchronous functions (see warning below)