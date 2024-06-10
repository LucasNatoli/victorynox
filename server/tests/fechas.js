const fechas = [
  { y: 2023, m: 1, d: 1 },
  { y: 2023, m: 1, d: 2 },
  { y: 2023, m: 1, d: 3 },
  { y: 2023, m: 2, d: 1 },
  { y: 2023, m: 2, d: 3 },
  { y: 2023, m: 2, d: 4 },
  { y: 2023, m: 2, d: 4 },
];

// Ordenar las fechas por año, mes y día
fechas.sort((a, b) => {
  if (a.y !== b.y) return a.y - b.y;
  if (a.m !== b.m) return a.m - b.m;
  return a.d - b.d;
});

// Función para obtener intervalos
function obtenerIntervalos(fechas) {
  const intervalos = [];
  let inicio = fechas[0];
  let fin = fechas[0];

  for (let i = 1; i < fechas.length; i++) {
    const fechaActual = fechas[i];
    const fechaAnterior = fechas[i - 1];

    if (
      fechaActual.y === fechaAnterior.y &&
      fechaActual.m === fechaAnterior.m &&
      fechaActual.d === fechaAnterior.d + 1
    ) {
      // Las fechas son consecutivas
      fin = fechaActual;
    } else {
      // Las fechas no son consecutivas, guardar el intervalo actual
      intervalos.push({ desde: inicio, hasta: fin });
      inicio = fechaActual;
      fin = fechaActual;
    }
  }

  // Agregar el último intervalo
  intervalos.push({ desde: inicio, hasta: fin });

  return intervalos;
}

const intervalos = obtenerIntervalos(fechas);
console.log(intervalos);
