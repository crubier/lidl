import React, {
  PropTypes,
  Component
}
from 'react';

import { ContextMenu, MenuItem, ContextMenuLayer } from "react-contextmenu";

import CircularProgress  from 'material-ui/lib/circular-progress';

export default class Graphviz extends Component {

  constructor(props){
    super(props);
  }

  saveFile(){
    var fileParts = [this.props.displayGraph];
    var myBlob = new Blob(fileParts, {type : 'image/svg+xml'});

  }

  render() {
    if ( this.props.displayGraph ===null || this.props.displayGraph ===undefined ) {
      return  <div style={{textAlign:'center'}}><CircularProgress style={{margin:"20px"}} mode="indeterminate"  /></div>;
    } else  {
      return (<div style={{textAlign:'center',position:'absolute',top:'5px',left:'5px',right:'5px',bottom:'5px',overflow:'none'}} dangerouslySetInnerHTML={this.props.displayGraph}/>);
    }
  }
}


//
//
// //Component on which context-menu must be triggred
// const MyComponent = ContextMenuLayer("some_unique_identifier", (props) => {
//     return {
//         prop1: props.myProp
//     };
// })(React.createClass({
//     render() {
//         <div style={{textAlign:'center',position:'absolute',top:'5px',left:'5px',right:'5px',bottom:'5px',overflow:'none'}} dangerouslySetInnerHTML={this.props.displayGraph}/>
//     }
// }));
//
// const MyApp = React.createClass({
//     render() {
//         <div>
//             <MyComponent {...this.props}/>
//             <MyContextMenu />
//         </div>
//     }
// });
//
// //The context-menu to be triggered
// class MyContextMenu extends Component ({
//     render() {
//         <ContextMenu identifier="some_unique_identifier" currentItem={this.currentItem}>
//             <MenuItem data={"some_data"} onSelect={this.handleSelect}>
//                 ContextMenu Item 1
//             </MenuItem>
//             <MenuItem data={"some_data"} onSelect={this.handleSelect}>
//                 ContextMenu Item 2
//             </MenuItem>
//             <MenuItem divider />
//             <MenuItem data={"some_data"} onSelect={this.handleSelect}>
//                 ContextMenu Item 3
//             </MenuItem>
//         </ContextMenu>
//     },
//     handleSelect(data, item) {
//         console.log(data, item);
//     }
// });
