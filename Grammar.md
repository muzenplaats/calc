# Grammar of calculator

/*
```vbnf
Calculator := WS (Assignment | Expression)*
Assignment := ident WS '=' WS Expression
Expression := create-vector
create-vector := expr (':' WS expr (':' WS expr)?)?

expr := Term (addop WS Term)*

Term := Factor (mulop WS Factor)*
Factor := Value WS (powop Value WS)*


Value := (Function | ident | paren
         // | number types
         ) '!'?


Function := ident '(' arg-list ')'
arg-list := Expression (',' WS Expression)*
paren := '(' WS Expression ')'
```
*/
