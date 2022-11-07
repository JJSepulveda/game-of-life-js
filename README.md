*The game of life* es un modelo discreto de un automata celular, ideado por el matemático **John Horton Conway.**

Este modelo se basa en unas pocas reglas que define el comportamiento de las “células” su comportamiento. Reglas:

- Todas las células se actualizan simultáneamente en cada turno.
- Una célula muerta con exactamente 3 células vecinas vivas “nace”.
- Una célula viva con 1 o ningún vecino muere.
- Una célula viva con 4 o más células vivas vecinas muere.

## Mockup

![mockup](https://i.ibb.co/fNNQ846/Untitled.png)

## Lógica

### Calcular el nuevo estado de la célula

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

![cell_state](https://i.ibb.co/mN5zzm7/The-game-of-life-Conway-drawio.png)

### Contar vecinos

Para poder actualizar el estado de la célula es necesario saber cuántos vecinos vivos adyacentes hay.

Para el proyecto se optó por una **lista bidimensional como la estructura de datos**. Por lo que para saber cómo acomodar los índices para contar los vecinos. En la imagen se muestra una matriz de 3x3 de cómo se contarían los vecinos de la célula en el centro.

![centro celula](https://i.ibb.co/KqR5FnL/celula-centro.png)

Algo a tener en cuenta antes de continuar es que se decidido que cuando una célula esté en el borde del mapa, las células vecinas serán la que estén al lado opuesto, como se muestra en la imagen:

![lateral](https://i.ibb.co/my4rbnK/celula-lateral.png)

Pseudocódigo para contar los vecinos:

1. Obtener el índice de la fila anterior y la fila siguiente.
2. Obtener el índice de la columna anterior y columna siguiente.
3. Contar las células vivas en la fila anterior.
4. Contar las células vivas en la fila actual.
5. Contar las células vivas en la fila siguiente.
6. Retornar el total

Diagrama de flujo para obtener los índices de las filas adyacentes.

![filas flow.png](https://i.ibb.co/CtLSg3W/filas-flow-1.png)

Diagrama de flujo para obtener los índices de las columnas adyacentes.

![columnas flow.drawio.png](https://i.ibb.co/zb3Ymmv/columnas-flow-drawio-1.png)

Diagrama de flujo para contar las células vecinas.

![ContarVecinosR.drawio.png](https://i.ibb.co/x6YfNF0/Contar-Vecinos-R-drawio.png)

El análisis y los diagramas de flujo solo se realizaron de lo más importante del proyecto, lo demás fue improvisado sobre la marcha 😋

## Referencias

[Juego de la vida - Wikipedia, la enciclopedia libre](https://es.wikipedia.org/wiki/Juego_de_la_vida)

[Play John Conway's Game of Life](https://playgameoflife.com/info)
