'use strict';

const fs = require('fs');
const request = require('request')
const path = require('path')

let rawdata = fs.readFileSync('./bannerMemberList.json');
let json = JSON.parse(rawdata);

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

const downloadImage = (image) => {
  const regex = /assets\/.+/g;
  const found = image.bannerImage.url.match(regex);
  const filename = found[0].replace('assets', './images')
  const dir = path.dirname(filename)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  download(image.bannerImage.url, filename, function () {
    console.log(filename)
  })
}

for (const item of json.contents) {
  for (const image of item.bannerList) {
    downloadImage(image);
  }
}
