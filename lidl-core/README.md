# LIDL Core

## Getting started

`lidl-core` is a JS library that provides tools necessary to compile and analyze LIDL programs. For a command-line compiler, see
`lidl-cli`, for an interactive IDE, see `lidl-sanbox`.

## Prerequisites

`lidl-core` requires a version of Node.js greater than `v4.0.0`. The simplest way to install node.js on any platform is to download it from [the official site](https://nodejs.org/en/download/stable/). You can test that you have a correct Node.js installation by launching:

    node --version

## Installation

The simplest way of installing `lidl-core` is to install it from NPM, in the directory of your choice:

    cd myDirectory/
    npm install lidl-core

## Usage

This package is a JS library. It offers various tools, listed in `index.js`. For example, to use the simple compiler in a Node.js program:

    var Lidl = require('lidl-core');

    var codeLidl = "interaction (bob):Number out is (5)";
    var headerJs = Lidl.examples.header;

    Lidl.compiler.simpleCompile(
      codeLidl,
      headerJs,
      function(codeJs){console.log(codeJs);}
    );

## Development

If you have access to the Git repository and want the latest version of `lidl-core`, you can also clone it and set it up using `npm install`:

    cd myDirectory/
    git clone https://<<your name>>@git.onera.fr/LIDL
    cd lidl-core/
    npm install

The changelog is available at [CHANGELOG.html](CHANGELOG.html)
