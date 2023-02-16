'use strict';

const fs = require('fs');
const request = require('request')
const path = require('path')
const stdio = require('stdio')

let ops = stdio.getopt({
  'input': {key: 'i', args: 1, description: 'path to json file', required: true},
  'output': {key: 'o', args: 1, description: 'path to folder output', required: true},
});

if (!ops.input || !ops.output) {
  ops.printHelp();
  process.exit(1);
}

let rawdata = fs.readFileSync(ops.input);
let json = JSON.parse(rawdata);

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

const downloadImage = (image, field = null) => {
  const url = field ?  image[field].url : image.url
  const regex = /assets\/.+/g;
  const found = url.match(regex);
  const filename = path.join(ops.output, found[0].replace('assets', './images'))
  const dir = path.dirname(filename)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  download(url, filename, function () {
    console.log(`${++i} / ${total} downloaded ${url}`)

    if (field) {
      image[field].url = filename
    } else {
      image.url = filename
    }
    if (i === total) {
      let data = JSON.stringify(json);
      fs.writeFileSync(path.join(ops.output, 'data.json'), data);
    }
  })
}

let total = 0;
json.contents.map((item) => {
  total += item.bannerList.length + item.memberList.length + 1;
})
let i = 0
for (const item of json.contents) {
  for (const image of item.bannerList) {
    downloadImage(image, 'bannerImage');
  }
  for (const image of item.memberList) {
    downloadImage(image, 'memberImage');
  }

  downloadImage(item.memberMainImage, null);
}
