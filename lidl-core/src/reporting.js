import {serialize} from './serializer'

export function printInteractionInstanceNodeStack(node){
  return node.content.meta.stack.map((x)=>'at '+serialize(x.content) + " ("+x.content.meta.location.start.line + ":" + x.content.meta.location.start.column + ")").join('\n');
}
