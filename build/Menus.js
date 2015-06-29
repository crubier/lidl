var React = require('react');
  mui = require('material-ui');

  var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

Menu =mui.Menus;

var numberMenuItems = [
   { payload: '1', text: 'All', number: '22' },
   { payload: '3', text: 'Uncategorized', number: '6'},
   { payload: '4', text: 'Trash', number: '11' }
];


var SomeAwesomeComponent = React.createClass({displayName: "SomeAwesomeComponent",

  render: function() {

    return (
        React.createElement(Menu, {menuItems: numberMenuItems, autoWidth: false})
    );
  }

});

React.render(
    React.createElement(SomeAwesomeComponent, null),
    document.getElementById('example')
);
