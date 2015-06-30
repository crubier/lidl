var React    = require('react')
var TabPanel = require('react-tab-panel')

var App = React.createClass({

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
            <TabPanel activeIndex={this.state.activeIndex}
                onChange={this.handleChange}
                titleStyle={{padding: 10}}
            >
                <div title="One">first</div>
                <div title="Two">second</div>
                <div title="Three">third</div>
            </TabPanel>
        )
    }
})

React.render(
    <MyPanel />,
    document.getElementById('example')
);
