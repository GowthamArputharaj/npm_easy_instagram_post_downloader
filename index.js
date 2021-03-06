const https = require('https');
const fs = require('fs');
const path = require('path');

// Get post url and download post
function downloadPost(q, dirName, cb) {
    const ig_root = 'https://www.instagram.com/p/';
    const jsonparam = '/?__a=1';

    var url = ig_root + q + jsonparam;
    console.log(`URL is ${url}`)

    https.get(url, (res) => {
        if (res.statusCode != 200)
            cb(new Error('Failed to download'), res.headers);
        else if (res.headers['content-length'] > 1000*1024*1024)
            cb(new Error('Too large'));
        else {
          var body = '';
          var json;
          res
            .on('error', (e) => { cb(e); })
            .on('data', (d) => {
                body += d;
            })
            .on('end', () => {
                json = JSON.parse(body);
                // console.log(json);
                var url = json.graphql.shortcode_media.display_url;
                var dir = dirName;

                https.get(url, (res) =>{
                    if (res.statusCode != 200)
                      cb(new Error('Failed to download getFile'));
                    else if (res.headers['content-length'] > 1000*1024*1024)
                      cb(new Error('File is too large getFile'));
                    else {
                      var ext;
                      var ct = res.headers['content-type'];
                      if (ct === 'image/jpeg') ext = '.jpeg';
                      else if (ct === 'video/mp4') ext = '.mp4';
                      else if (ct === 'video/ogg') ext = '.ogg';
                      else if (ct === 'video/webm') ext = '.webm';
                      else return cb(new Error('Invalid file type'));
                      var fileName = path.join(dir, Math.random().toString().split('.').pop() + ext);
                      var writeStream = fs.createWriteStream(fileName);
                      res
                        .on('error', (e) => { cb(e); })
                        .pipe(writeStream)
                        .on('finish', () => {
                          cb(null, fileName);
                        });
                    }
                });

                cb(null, json);
            });
        }
    }).on('error', (e) => {
        cb(e);
    });
}

// downloadPost(postId, directoryName (err, resp) => {
//     if(err) {
//         console.log(`Error is: ${err}`);
//     }

//     if(resp) {
//         console.log(err);
//         console.log(resp);
//     }
// });

module.exports = downloadPost;

