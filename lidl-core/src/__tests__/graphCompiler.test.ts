import * as graphCompiler from "../graphCompiler";
import parser from "../parser";
import * as runner from "../runner";
import _ from "lodash";
import * as path from "path";

describe("lidl graph compiler", async function () {
  var testPaths = [
    "example/ok",
    // 'example/investigate'
    // ,'example/nok'
  ];

  const testCases: { file: string; header: string }[] = [];
  for (const testPath of testPaths) {
    const header = path.join(testPath, "common.lidl.js");
    const glob = new Bun.Glob("*/code.lidl");
    for await (const match of glob.scan(testPath)) {
      testCases.push({
        file: path.join(testPath, path.dirname(match)),
        header,
      });
    }
  }

  await Promise.all(
    testCases.map(({ file, header }) => runTestCase(file, header)),
  );

  async function runTestCase(file: string, commonHeader: string) {
    function printGraph(graph: any, name: string) {
      const dotFile = path.join(file, "dot", name + ".dot");
      const pdfFile = path.join(file, "pdf", name + ".pdf");
      Bun.write(dotFile, graph.toDot()).then(() => {
        const proc = Bun.spawn(["dot", dotFile, "-o" + pdfFile, "-Tpdf"]);
        return proc.exited;
      });
    }

    function checkTraceAgainstOracle(trace: any, oracle: any) {
      it("Should have correct length", function () {
        expect(trace.length).toEqual(oracle.length);
      });

      _.forEach(_.zip(oracle, trace), function (s: any, i: number) {
        it(
          "Interface Should be correct at step " + i + " of the execution",
          function () {
            expect(s[0].inter).toEqual(s[1].inter);
          },
        );
        _.forEach(s[0].args, function (arg: any, argName: string) {
          it(
            "Argument " +
              argName +
              " should be correct at step " +
              i +
              " of the execution",
            function () {
              expect(s[0].args[argName]).toEqual(s[1].args[argName]);
            },
          );
        });
      });

      return trace;
    }

    const [code, header, scenarioText] = await Promise.all([
      Bun.spawn(["rm", "-rf", path.join(file, "result"), path.join(file, "dot"), path.join(file, "pdf")]).exited
        .then(() => Bun.spawn(["mkdir", "-p", path.join(file, "result"), path.join(file, "dot"), path.join(file, "pdf")]).exited)
        .then(() => Bun.file(path.join(file, "code.lidl")).text()),
      Bun.file(commonHeader).text(),
      Bun.file(path.join(file, "scenario.json")).text(),
    ]);

    describe("Compilation of file " + file, function () {
      console.log("Compiling and testing " + file);

      graphCompiler.compile(parser.parse(code)[0], header, {
        addDefinitionToGraph: function (graph: any, data: any) {
          printGraph(
            graph,
            data.step + "addDefinitionToGraph" + data.iteration,
          );
          return true;
        },
        linkInterfacesToDefinitions: function (graph: any, data: any) {
          printGraph(
            graph,
            data.step + "linkInterfacesToDefinitions" + data.iteration,
          );
          return true;
        },
        referentialTransparency: function (graph: any, data: any) {
          printGraph(
            graph,
            data.step + "referentialTransparency" + data.iteration,
          );
          return true;
        },
        addOperatorTypeAnnotation: function (graph: any, data: any) {
          printGraph(
            graph,
            data.step + "addOperatorTypeAnnotation" + data.iteration,
          );
          return true;
        },
        linkInteractionsToDefinitions: function (graph: any, data: any) {
          printGraph(
            graph,
            data.step + "linkInteractionsToDefinitions" + data.iteration,
          );
          return true;
        },
        createDataFlowDirection: function (graph: any, data: any) {
          printGraph(
            graph,
            data.step + "createDataFlowDirection" + data.iteration,
          );
          return true;
        },
        nonMatchingCompositionCompilation: function (graph: any, data: any) {
          printGraph(
            graph,
            data.step + "nonMatchingCompositionCompilation" + data.iteration,
          );
          return true;
        },
        matchingCompositionReduction: function (graph: any, data: any) {
          printGraph(
            graph,
            data.step + "matchingCompositionReduction" + data.iteration,
          );
          return true;
        },
        removeOneSidedAffectation: function (graph: any, data: any) {
          printGraph(
            graph,
            data.step + "removeOneSidedAffectation" + data.iteration,
          );
          return true;
        },
        referentialTransparencyInstances: function (graph: any, data: any) {
          printGraph(
            graph,
            data.step + "referentialTransparencyInstances" + data.iteration,
          );
          return true;
        },
        tagCompositionElementEdges: function (graph: any, data: any) {
          printGraph(
            graph,
            data.step + "tagCompositionElementEdges" + data.iteration,
          );
          return true;
        },
        orderGraph: function (graph: any, data: any) {
          printGraph(graph, data.step + "orderGraph" + data.iteration);
          return true;
        },
        linkIdentifiers: function (graph: any, data: any) {
          printGraph(graph, data.step + "linkIdentifiers" + data.iteration);
          return true;
        },
        resolveMultiplePorts: function (graph: any, data: any) {
          printGraph(
            graph,
            data.step + "resolveMultiplePorts" + data.iteration,
          );
          return true;
        },
        getJsCode: function (graph: any, data: any) {
          Bun.write(path.join(file, "result", "generated.js"), data.source);
          let trace = runner.run(data, JSON.parse(scenarioText));
          checkTraceAgainstOracle(trace, JSON.parse(scenarioText));
          Bun.write(
            path.join(file, "result", "trace.json"),
            JSON.stringify(trace),
          );
          return true;
        },
        getExpandedLidlCode: function (graph: any, data: any) {
          Bun.write(
            path.join(file, "result", "expanded.lidl"),
            data.source,
          );
          return true;
        },
        error: function (graph: any, data: any) {
          printGraph(graph, "error");
          return true;
        },
      });
    });
  }
});
