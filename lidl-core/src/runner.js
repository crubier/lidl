
// This function runs a piece of generated Lidl code on a scenario and returns a trace
export function run (code,scenario) {

      var trans = new Function("data",code.partialSource.transitionFunction);
      var init = new Function("data",code.partialSource.initializationFunction);

      var trace = [init()];

      // Execute LIDL system step by step
      var i;
      for (i = 0; i < scenario.length; i++) {
        trace[i].inter = scenario[i].inter;
        trace[i].args = scenario[i].args;
        trace[i] = trans(trace[i]);
        if (i < scenario.length - 1) {
          trace[i + 1] = {};
          trace[i + 1].state = trace[i].state;
          trace[i + 1].memo = trace[i].memo;
        }
      }
  return trace;
}
