export default {
  type: 'x',
  weight: 1,
  select: true,
  content: [{
    type: 'z',
    weight: 1,
    select: true,
    content: [{
      type: 'p',
      weight: 1,
      select: true,
      value: "CodeEditor"
    }, {
      type: 'p',
      weight: 1,
      select: false,
      value: "BlockCodeEditor"
    }, {
      type: 'p',
      weight: 1,
      select: false,
      value: "ExpandedCodeViewer"
    }]
  }, {
    type: 'y',
    weight: 2,
    select: true,
    content: [{
        type: 'x',
        weight: 2,
        select: true,
        content: [{
          type: 'z',
          weight: 2,
          select: true,
          content: [{
            type: 'p',
            weight: 1,
            select: true,
            value: "ScenarioEditor"
          }, {
            type: 'p',
            weight: 1,
            select: false,
            value: "HeaderEditor"
          }, {
            type: 'z',
            weight: 1,
            select: false,
            name: 'Graphs',
            content: [



              {
                          type: 'z',
                          weight: 1,
                          select: true,
                          name: 'Graphs 1',
                          content: [
{
              "type": "p",
              "weight": 1,
              "select": true,
              "value": "Graph addDefinitionToGraph"
            }, {
              "type": "p",
              "weight": 1,
              "select": false,
              "value": "Graph addOperatorTypeAnnotation"
            }, {
              "type": "p",
              "weight": 1,
              "select": false,
              "value": "Graph referentialTransparency"
            }, {
              "type": "p",
              "weight": 1,
              "select": false,
              "value": "Graph linkInteractionsToDefinitions"
            }, {
              "type": "p",
              "weight": 1,
              "select": false,
              "value": "Graph expandDefinitions"
            }


]},
            {
                        type: 'z',
                        weight: 1,
                        select: false,
                        name: 'Graphs 2',
                        content: [


 {
              "type": "p",
              "weight": 1,
              "select": false,
              "value": "Graph removeNonRootDefinitions"
            }, {
              "type": "p",
              "weight": 1,
              "select": false,
              "value": "Graph clearSubInformation"
            }, {
              "type": "p",
              "weight": 1,
              "select": false,
              "value": "Graph instantiateInterfaces"
            }, {
              "type": "p",
              "weight": 1,
              "select": false,
              "value": "Graph linkArguments"
            }, {
              "type": "p",
              "weight": 1,
              "select": false,
              "value": "Graph linkInterface"
            }




            ]},
                        {
                                    type: 'z',
                                    weight: 1,
                                    select: false,
                                    name: 'Graphs 3',
                                    content: [

 {
              "type": "p",
              "weight": 1,
              "select": false,
              "value": "Graph keepOnlyInteractions"
            }, {
              "type": "p",
              "weight": 1,
              "select": false,
              "value": "Graph referentialTransparencyInstances"
            }, {
              "type": "p",
              "weight": 1,
              "select": false,
              "value": "Graph linkIdentifiers"
            }, {
              "type": "p",
              "weight": 1,
              "select": false,
              "value": "Graph voidInteractionCreation"
            }, {
              "type": "p",
              "weight": 1,
              "select": false,
              "value": "Graph behaviourSeparation"
            },




            ]},
                        {
                                    type: 'z',
                                    weight: 1,
                                    select: false,
                                    name: 'Graphs 4',
                                    content: [

 {
              "type": "p",
              "weight": 1,
              "select": false,
              "value": "Graph functionLiteralLinking"
            }, {
              "type": "p",
              "weight": 1,
              "select": false,
              "value": "Graph dataLiteralLinking"
            }, {
              "type": "p",
              "weight": 1,
              "select": false,
              "value": "Graph functionApplicationLinking"
            }, {
              "type": "p",
              "weight": 1,
              "select": false,
              "value": "Graph previousNextLinking"
            }, {
              "type": "p",
              "weight": 1,
              "select": false,
              "value": "Graph tagCompositionElementEdges"
            },





            ]},
                        {
                                    type: 'z',
                                    weight: 1,
                                    select: false,
                                    name: 'Graphs 5',
                                    content: [





 {
              "type": "p",
              "weight": 1,
              "select": false,
              "value": "Graph matchingCompositionReduction"
            }, {
              "type": "p",
              "weight": 1,
              "select": false,
              "value": "Graph removeOneSidedAffectation"
            }, {
              "type": "p",
              "weight": 1,
              "select": false,
              "value": "Graph createDataFlowDirection"
            }, {
              "type": "p",
              "weight": 1,
              "select": false,
              "value": "Graph nonMatchingCompositionCompilation"
            }, {
              "type": "p",
              "weight": 1,
              "select": false,
              "value": "Graph affectationLinking"
            },




            ]},
                        {
                                    type: 'z',
                                    weight: 1,
                                    select: false,
                                    name: 'Graphs 6',
                                    content: [



 {
              "type": "p",
              "weight": 1,
              "select": false,
              "value": "Graph removeDuplicateEdge"
            }, {
              "type": "p",
              "weight": 1,
              "select": false,
              "value": "Graph resolveMultiplePorts"
            }, {
              "type": "p",
              "weight": 1,
              "select": false,
              "value": "Graph instantiateTemplates"
            }, {
              "type": "p",
              "weight": 1,
              "select": false,
              "value": "Graph orderGraph"
            }, {
              "type": "p",
              "weight": 1,
              "select": false,
              "value": "Graph graphTransformationPipeline"
            }]}
]









          }, {
            type: 'p',
            weight: 1,
            select: false,
            value: "Analysis"
          }]
        }, {
          type: 'z',
          weight: 1,
          select: true,
          content: [{
            type: 'p',
            weight: 1,
            select: true,
            value: "ErrorDisplay"
          }, {
            type: 'p',
            weight: 1,
            select: false,
            value: "GeneratedCodeViewer"
          }, {
            type: 'p',
            weight: 1,
            select: false,
            value: "Canvas"
          }]
        }]

      },

      {
        type: 'z',
        weight: 1,
        select: true,
        content: [{
          type: 'p',
          weight: 1,
          select: true,
          value: "TraceViewer"
        }, {
          type: 'p',
          weight: 1,
          select: false,
          value: "AdvancedTraceViewer"
        }]
      }

    ]

  }]
}
