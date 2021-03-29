
# instagram post downloader
const insta = require('easy-instagram-post-downloader');

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


