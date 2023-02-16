# Download

### Sysytem Requirements
- nodejs 16.x
- yarn

### Installation

```bash
git clone https://github.com/ohmygodvt95/download.git
```

```bash
yarn
```

### Usage

```
USAGE: node index.js [OPTION1] [OPTION2]... arg1 arg2...
The following options are supported:
  -i, --input <ARG1>    path to json file (required)
  -o, --output <ARG1>   path to folder output (required)

```

```bash
yarn download -i ./bannerMemberList.json -o ./out 
```

output like a this
```text
yarn run v1.22.19
$ node ./index.js -i ./bannerMemberList.json -o ./out
1 / 4 downloaded https://images.microcms-assets.io/assets/0d674398d1e74fb5ac0d46d6732333f1/69e52dc582454fe8845e0c3ee9d2ed57/31.jpeg
2 / 4 downloaded https://images.microcms-assets.io/assets/0d674398d1e74fb5ac0d46d6732333f1/69e52dc582454fe8845e0c3ee9d2ed57/31.jpeg
3 / 4 downloaded https://images.microcms-assets.io/assets/0d674398d1e74fb5ac0d46d6732333f1/5d96c040e26e44429995970feeda0864/1.jpeg
4 / 4 downloaded https://images.microcms-assets.io/assets/0d674398d1e74fb5ac0d46d6732333f1/5d96c040e26e44429995970feeda0864/1.jpeg

```

### Copyright (c) 2023, THienLV
