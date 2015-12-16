# LIDL Core

## Getting started

`lidl-cli` is a command line compiler for LIDL. For the core LIDL library, see
`lidl-core`, for an interactive IDE, see `lidl-sanbox`.

## Prerequisites

`lidl-cli` requires a version of Node.js greater than `v4.0.0`. The simplest way to install node.js on any platform is to download it from [the official site](https://nodejs.org/en/download/stable/). You can test that you have a correct Node.js installation by launching:

    node --version

## Installation

The simplest way of installing `lidl-cli` is to install it from NPM, as a global package, using the `-g` option:

    npm install lidl-cli -g

## Usage

To use the lidl compiler, just use the command line utility `lidl`. Two options are necessary:

  - `-i` to specify an input LIDL file name
  - `-o` to specify an output JS file name

For example, to compile the LIDL program `foo.lidl` into the JS file `bar.js`:

    lidl -i foo.lidl -o bar.js  





## Development

If you have access to the Git repository and want the latest version of `lidl-cli`, you can also clone it and set it up using `npm install`:

    cd myDirectory/
    git clone https://<<your name>>@git.onera.fr/LIDL
    cd lidl-cli/
    npm install
