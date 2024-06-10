# Tickers de Binance

En intervalos regulares de 1 minuto, el sistema consulta la api de precios de binance para obtener y almancenar los valores de los pares almacenados en el archivo `tickers.json`

Los pares almacenados surgen de la interseccion de todas las Watchlists activas en el sistema. 

TODO: Evaluar si cruzar todas las Watchlists en cada ejecucion o seguir manteniendo tickers.json

Una vez consultada la API de Binance y almacenados los datos, se puede acceder a los valores de cualquiera de los pares mediante `/service/ticker?symbols=[string1, string2]`

