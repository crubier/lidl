
#The interface language

## Grammar
An interface is the specification of "pipes" for data. An interface specifies a data type and a data direction.

```
<interface>   :   <type> ( in | out )                   // Atomic interface
              |   { (<fieldId> : <interface>) * }       // Compound interface
              |   co <interface>                        // Complimentary interface

<type>        :   <typeId>                              // Atomic type
              |   { (<fieldId> : <type>) * }            // Compound type

<fieldId>     :   anyCamelCasedTextWithNumbers

<typeId>      :   activation | boolean | number | text
```

## Example types

The activation type has two possible values : `inactive` and `active`
```
activation
```

The text type can be any text, or `inactive`
```
text
```

This is a compound type representing a 2D point
```
{x:number,y:number}
```

This is a compound type representing a "list" of two 2D points.
```
{0:{x:number,y:number},1:{x:number,y:number}}
```

## Example interfaces

Reception of an activation signal

```
activation in
```

Emission of a text
```
text out
```

Reception of 2D points
```
{x:number,y:number} in
```

Reception of 2D points too !
```
{x:number in,y:number in}
```

Reception of a number `x` and emission of a number `y`
```
{x:number in,y:number out}
```

The complimentary of the previous interface, which means the emission of a number `x` and the reception of a number `y`
```
co {x:number in,y:number out}
```

The reception of a 2D point called `0` and emission of a 2D point called `1`
```
{0:{x:number,y:number} in ,1:{x:number,y:number} out}
```

## Interface normalization

The interface language allows to specify equivalent interfaces in different ways.

Example of two equivalent interfaces:
```
{x:number in,y:number in}   // Not normal form
{x:number,y:number} in      // Normal form
```

To check the equivalence of two interfaces, we compare their normalized versions.

Normalizing an interface is as simple as removing the `co` and moving the `in` and `out` as shallow as possible
In the example above, the second version is normalized.
```
{x:number in,y:{a:number in,b:number out}}
```
