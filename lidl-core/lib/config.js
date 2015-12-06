'use strict';module.exports = { 
  graphTransformations: [
  'addDefinitionToGraph', 
  'addOperatorTypeAnnotation', 
  'referentialTransparency', 
  'linkInteractionsToDefinitions', 
  'expandDefinitions', 
  'removeNonRootDefinitions', 
  'clearSubInformation', 
  'instantiateInterfaces', 
  'linkArguments', 
  'linkInterface', 
  'keepOnlyInteractions', 
  'referentialTransparencyInstances', 
  'linkIdentifiers', 
  'voidInteractionCreation', 
  'behaviourSeparation', 
  'functionLiteralLinking', 
  'dataLiteralLinking', 
  'functionApplicationLinking', 
  'previousNextLinking', 
  'tagCompositionElementEdges', 
  'matchingCompositionReduction', 
  'removeOneSidedAffectation', 
  'createDataFlowDirection', 
  'nonMatchingCompositionCompilation', 
  'affectationLinking', 
  'removeDuplicateEdge', 
  'resolveMultiplePorts', 
  'instantiateTemplates', 
  'orderGraph', 
  'graphTransformationPipeline', 
  'getJsCode', 
  'getExpandedLidlCode', 
  'getInteractionMetrics', 
  'error'] };