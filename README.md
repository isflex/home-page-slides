# Setup Dev

## Install
```
yarn install
```

## Run Dev
```
yarn start
```

### Marp | Bespoke | HTML Slide
```
http://local.flexiness.com:4008
```

### React Iframe Slide
```
http://local.flexiness.com:4008/web
```

# Setup Monorepo

## Import into Monorepo as dependancy
```
yarn add @flexiness/slides@https://github.com/isflex/home-page-slides.git#about
```

## Create project workspace in Monorepo using cli
```
yarn slides cli --method install --dir path/to/install/workspace
```