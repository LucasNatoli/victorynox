# Wiki

## Como obtener los tickers ??

+ Cada consulta al ticket tiene un peso
+ No se puede ejecutar desde el cliente (apararentemente)

## Solucions 
+ guardar todos los symbols que se siguen y actualizarlos periodicamente. luego cada watchlist se actualiza con los datos recuperados.
+ scan periodicamente los archos favs.json de todas las cuentas y acutalizar todos los valores


# Server

## `/accounts`

`/login`

`/register`

`/checkToken`

## `/user`

`/apis`

`/favorites`

`/assets`

## `/orders`

`/fetch/:symbol/:api`

`/:symbol`

## `/historical`

`/fetch/:interval/:symbol/:granularity/:year/:month/:day?`

`/history`
