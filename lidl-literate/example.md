We define a new data type

```
[Point 2D]:<data>
is ()
or ()
```


```
interaction
  (rotate of (angle) degrees around (axis) )
with
  interaction
    (rotation matrix)
  is
    (rotation matrix of (angle) degrees around (axis))
is
  ( mutation
    from (point)
    to   ((rotation matrix) × (point))
  )
```
