# The game of life

*The game of life* es un modelo discreto de un automata celular, ideado por el matemático **John Horton Conway.**

Este modelo se basa en unas pocas reglas que define el comportamiento de las “células” su comportamiento. Reglas:

- Todas las células se actualizan simultáneamente en cada turno.
- Una célula muerta con exactamente 3 células vecinas vivas “nace”.
- Una célula viva con 1 o ningún vecino muere.
- Una célula viva con 4 o más células vivas vecinas muere.

## Mockup

![Untitled](https://i.ibb.co/fNNQ846/Untitled.png)



## Lógica

Si la célula está muerta, solo hay 1 forma de que reviva. Si la célula está viva …

Caso 1: La célula está muerta.

1. Cuenta cuantas células vecinas están vivas.
2. ¿El contador es igual a 3?
    1. Sí → La célula revive.
    2. No → Continua con la siguiente célula.

Caso 2: La célula está viva.

1. Contar el número de células vecinas vivas.
2. ¿El contador es menor o igual a 1?
    1. Sí → La célula muere.
    2. No → Revisa la otra condición
3. ¿El contador es mayor o igual a 4?
    1. Sí → La célula muere
    2. No → La célula se mantiene viva.

Diagrama de flujo para determinar el estado de la célula:

![Untitled](https://i.ibb.co/jL3jNVJ/Diagrama-para-determinar-el-estado-de-la-celula.png)

### Contar vecinos

pseudocódigo:

1. Obtener la fila anterior y la fila siguiente.
2. Obtener columna anterior y columna siguiente.
3. Contar las células vivas en la fila anterior.
4. Contar las células vivas en la fila siguiente.
5. Contar las células vivas en la fila actual.
6. Retornar el total

Diagrama de flujo para contar las células vecinas vivas:

![filas flow.png](https://i.ibb.co/CtLSg3W/filas-flow-1.png)

![columnas flow.drawio.png](https://i.ibb.co/zb3Ymmv/columnas-flow-drawio-1.png)