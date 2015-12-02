export default
`interaction
 (test (a:Number in)):Number out
with

  interaction
    ((a:Number in)==(b:Number in)):Boolean out
  is
    (
      (variable result of (a)==(b))
      with behaviour
      (apply (function isEqual) to ({a:(a),b:(b)}) and get (variable result of (a)==(b)) )
    )

  interaction
    (when (cond:Boolean in) then (a:Activation out) else (b:Activation out)):Activation in
  is
    (
      (variable activation of when (cond) then (a) else (b))
      with behaviour
      (
        apply
        (function whenThenElse)
        to
        ({  cond:(cond)  source:(variable activation of when (cond) then (a) else (b))   })
        and get
        ({a:(a) b:(b)})
      )
    )

    interaction
      (if (cond:Boolean in) then (a:Number in) else (b:Number in)):Number out
    is
    (
      (variable result of if (cond) then (a) else (b))
      with behaviour
      (
        when
        (cond)
        then
        ((variable result of if (cond) then (a) else (b)) = (a))
        else
        ((variable result of if (cond) then (a) else (b)) = (b))
      )
    )

is
  (if((a)==(1))then(3)else(4))

`
