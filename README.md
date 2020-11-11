# Wordpress theme Gulp 4 SASS config

This is a Gulp 4 / SASS config file designed to work with Wordpress theme.
Generate compiled, minimized CSS and JS files.
FTP deploy to development server.

## Installation

1. Install dependencies:

```
npm install
```

2. Set up FTP credentials to your Wordpress theme within gulpfile.js.

3. Set up Wordpress theme's required meta-data in /sass/style.scss file

## Features

1. Concatenate all files into one
2. Watch on changes in /sass/ and /js/, auto compile and FTP deploy
3. Watch on changes of all .php theme files and auto FTP deploy
3. Send changed files through FTP to development version of your site (don't use on production!)
4. CSS compiler uses autoprefixer so you don't have to worry about vendor prefixes

## Usage

To compile files use command:

```
gulp build
```

To enable compiling files and auto deploy use command:

```
gulp watch
```

If you need to send all files through FTP use command:

```
gulp depall
```

To send only changed files use command:

```
gulp deploy
```

## Theme customization

Any customizations should be made through *.scss files within the /sass/ folder and *.js files in /js/ folder.
