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
          weight: 1,
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
            type: 'p',
            weight: 1,
            select: false,
            value: "Graphviz"
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
            },
            {
              type: 'p',
              weight: 1,
              select: false,
              value: "GeneratedCodeViewer"
            }, {
              type: 'p',
              weight: 1,
              select: false,
              value: "Canvas"
            }
          ]
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
