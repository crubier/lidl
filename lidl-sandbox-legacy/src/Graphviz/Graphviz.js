import React, {
  PropTypes,
  Component
}
from 'react';

import { ContextMenu, MenuItem, ContextMenuLayer } from "react-contextmenu";

import CircularProgress  from 'material-ui/lib/circular-progress';

import _  from 'lodash';

import fileSaver from 'browser-filesaver';

export default class Graphviz extends Component {

  constructor(props){
    super(props);
  }

  saveFile(){
    var fileParts = [this.props.displayGraph.__html];
    var blob = new Blob(fileParts, {type : 'image/svg+xml'});
    // fileSaver.saveAs(blob,_.camelCase(this.props.panelName)+'.svg');
    var URL = window.URL || window.webkitURL;
    var url = URL.createObjectURL(blob);
    window.open(url);
  }

  render() {
    if ( this.props.displayGraph ===null || this.props.displayGraph ===undefined ) {
      return  <div style={{textAlign:'center'}}><CircularProgress style={{margin:"20px"}} mode="indeterminate"  /></div>;
    } else  {
      return (<div onClick={this.saveFile.bind(this)} style={{textAlign:'center',position:'absolute',top:'5px',left:'5px',right:'5px',bottom:'5px',overflow:'none'}} dangerouslySetInnerHTML={this.props.displayGraph}/>);
    }
  }
}





//
//
// //Component on which context-menu must be triggred
// const MyComponent = ContextMenuLayer("25bd65f1-8dd9-4bfd-b37f-603363a12184", (props) => {
//     return {
//         displayGraph: props.displayGraph
//     };
// })(React.createClass({
//     render() {
//         <div style={{textAlign:'center',position:'absolute',top:'5px',left:'5px',right:'5px',bottom:'5px',overflow:'none'}} dangerouslySetInnerHTML={this.props.displayGraph}/>
//     }
// }));
//
//
//
// class GraphVizWithContextMenu extends Component{
//     render() {
//         <div style={{textAlign:'center',position:'absolute',top:'5px',left:'5px',right:'5px',bottom:'5px',overflow:'none'}}>
//             <MyComponent {...this.props}/>
//             <MyContextMenu />
//         </div>
//     }
// }
//
//
//
// //The context-menu to be triggered
// class MyContextMenu extends Component {
//     render() {
//         <ContextMenu identifier="25bd65f1-8dd9-4bfd-b37f-603363a12184" currentItem={this.currentItem}>
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
//     }
//     handleSelect(data, item) {
//         console.log(data, item);
//     }
// }
