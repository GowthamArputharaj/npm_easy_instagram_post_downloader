# console_design
Design console in seconds.

# example
// import console_design
import consoleDesign from 'console_design';

// declare text and text style
var text = 'Welcome to NPM World';
var style = 'background: #888; color: white; padding: 1rem 2rem; border-radius: 2rem; font-size: 2rem;';

var cd = consoleDesign(text, style);

console.log(cd.text, cd.style);


# instagram video downloader
const insta = require('easy_instagram_post_downloader');

var postId = 'CM9i3rEKRBX';

// create downloads directory and get relative path
var dirName = './downloads';

insta(postId, dirName, (error, response) => { 
    
    if(error) { 
        console.log(`Error is: ${err}`); 
    }

    if(response) {
        console.log(response);
    }
});


