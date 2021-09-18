const URL = 'https://api.bluelytics.com.ar/json/last_price';

$.get(URL, function (respuesta, status) {

  if (status === 'success') {
    for (const data of respuesta) {
      $('#cotizacionDolar').append(`<ul><li>${data.source}:  ${data.value_avg}</li></ul>`);

    }
  }
});

$(document).ready(function () {

  // tambosALiquidar = JSON.parse(localStorage.getItem('tambosAlStorage'));
  // industriaFactura = JSON.parse(localStorage.getItem('industriaPrevia'));

  $('#btn-liquidar').click(() => {

    if (localStorage.getItem('industriaPrevia') && localStorage.getItem('tambosAlStorage')) {


      tambosALiquidar = JSON.parse(localStorage.getItem('tambosAlStorage'));
      industriaFactura = JSON.parse(localStorage.getItem('industriaPrevia'));

      tambosALiquidar.shift();


      $('#factura').show();
      $('#factura').append($('#datosIndustria'));
      $('#factura').append(`<table id="tablaLiquidacion">
          <th>CUIT</th>
          <th>Razón Social</th>
          <th>N</th>
          <th>Litros</th>
          <th>% prot.</th>
          <th>% grasa</th>
          <th>UFC</th>
          <th>RCS</th>
          <th>Precio</th>
          <th>Subtotal</th>
          </table>
          `)

      llenarTablaLiquidacion(industriaFactura, tambosALiquidar, '#tablaLiquidacion');

      $('#cuadroSistema').hide();
      $('#cuadroInformacion').hide();
      $('#datosTambos').hide();

    }
    else {
      alert('Debe cargar datos de industria y tambo primero')
    }

  });

  $('#btn-borrarIndustria').click(() => {
    localStorage.removeItem('industriaPrevia');
    location.reload();
  });


  $('#btn-borrarTambos').click(() => {
    localStorage.removeItem('tambosAlStorage');
    location.reload();

  });

  $('#btn-limpiarFactura').click(() => {

    localStorage.removeItem('industriaPrevia');
    localStorage.removeItem('tambosAlStorage');

    $("#factura").empty();
    location.reload();

  });


  function crearFilaTambosLiquidados(industria, tambo, elemento) {
    const fila = `<tr id=tr-${tambo.numerotambointerno}>
  ${llenarDatosTablaLiquidacion(industria, tambo.cuit, tambo.razonSocial, tambo.numeroTamboInterno, tambo.litros, tambo.kilosProteina, tambo.kilosGrasa, tambo.ufc, tambo.rcs)}
  </tr>`;
    $(elemento).append(fila);
  }

  function llenarTablaLiquidacion(industria, datos, elemento) {
    datos.map(tambo => {
      crearFilaTambosLiquidados(industria, tambo, elemento);
    })
  }

  function llenarDatosTablaLiquidacion(industria, cuit, razonSocial, numeroTamboInterno, litros, kilosProteina, kilosGrasa, ufc, rcs) {

    porcentajeGrasa = kilosGrasa / litros
    porcentajeProteina = kilosProteina / litros
    montoProteina = industria[0].basicoKiloProteina * kilosProteina
    montoGrasa = industria[0].basicoKilosGrasa * kilosGrasa
    subtotal = montoProteina + montoGrasa

    precio = subtotal / litros

    return `
  <td>${cuit}</td>
  <td>${razonSocial}</td>
  <td>${numeroTamboInterno}</td>
  <td>${litros}</td>
  <td>${porcentajeProteina}</td>
  <td>${porcentajeGrasa}</td>
  <td>${ufc}</td>
  <td>${rcs}</td>
  <td>${precio}</td>
  <td>${subtotal}</td>
  `
  }

})