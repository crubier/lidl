# LIDL Sandbox

## Getting started

To use the LIDL sandbox, just open [dist/index.html](dist/index.html) in a recent browser. You can open examples using the drop down on the left of the toolbar, name your files using the text box next to it, save your files using the icon next to the text box.

## Usage

As a user, you have to give three different inputs:

  - A LIDL program, using the Lidl code editor
  - A JS header, using the header editor
  - A scenario, using the scenario editor

The LIDL sandbox compiles the LIDL program, links it with the Header, and outputs some JS code. This JS code is then executed on the given scenario, resulting in a Trace. In the end, this gives several different outputs:

  - Expanded LIDL code, which can be absurdly large for some reason, even though this size does not represent any physical size.
  - Generated JS code, in the NPM module format.
  - Trace, which allows to examine the generated trace.
  - Graphs which allow to see the inner workings of the compiler
  - Canvas, which allows to executed the code as a WIMP application if it is possible.
  - Error, which shows errors that happened at any stage of the compilation or execution process.

## Details

### Scenarios and trace

The Scenarios and Trace are described in the [JSON format](http://www.json.org). They are represented by a list of JSON records which have 4 fields:

  - `inter`: The values of the main interface of the interaction
  - `args`: The values of the arguments of the interaction, labelled by their name
  - `state`: The value of the internal state of the LIDL system
  - `memo`: The values that are memoized by the LIDL runtime to save time

Only the input parts of `inter` and `args` are necessary in the scenario, since the outputs, state and memo are created by the LIDL runtime.

### Generated JS

The Generated JS Code is compliant with the [requirejs](http://requirejs.org) format, and can be used with requirejs or within a Node module, or in any JS environement using [browserify](http://browserify.org).

### Canvas

The Canvas can be exported as a standalone, single file HTML web app by clicking on the export canvas button in the toolbar.

### Graphs

Graphs can be visualized as SVG files by clicking on them
