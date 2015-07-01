var React    = require('react')
var TabPanel = require('react-tab-panel')

var App = React.createClass({displayName: "App",

    getInitialState: function(){
        return {
            activeIndex: 1
        }
    },

    handleChange: function(index){
        this.setState({
            activeIndex: index
        })
    },

    render: function() {
        return (
            React.createElement(TabPanel, {activeIndex: this.state.activeIndex, 
                onChange: this.handleChange, 
                titleStyle: {padding: 10}
            }, 
                React.createElement("div", {title: "One"}, "first"), 
                React.createElement("div", {title: "Two"}, "second"), 
                React.createElement("div", {title: "Three"}, "third")
            )
        )
    }
})

React.render(
    React.createElement(MyPanel, null),
    document.getElementById('example')
);
