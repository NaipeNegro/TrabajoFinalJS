const URL = 'https://api.bluelytics.com.ar/json/last_price';

$.get(URL, function (respuesta, status) {

  if (status === 'success') {
    for (const data of respuesta) {
      $('#cotizacionDolar').append(`<ul><li>${data.source}:  ${data.value_avg}</li></ul>`);

    }
  }
});

$(document).ready(function () {

    $('#btn-liquidar').click(() => {

      if(localStorage.getItem('industriaPrevia') && localStorage.getItem('tambosAlStorage')){
       
          $('#factura').show();
          $('#factura').append($('#datosIndustria'));
          $('#factura').append($('#tambos-tabla'));
          $('#cuadroSistema').hide();
          $('#cuadroInformacion').hide();
          $('#datosTambos').hide();
          
      }
      else{
        alert('Debe cargar datos de industria y tambo primero')
      }
      
    });

})