class Industria {
    constructor(cuit, razonSocial) {
        this.cuit = cuit;
        this.razonSocial = razonSocial;
    }

    precios(periodo, basicoKiloProteina, basicoKilosGrasa) {
        this.periodo = periodo;
        this.basicoKiloProteina = basicoKiloProteina;
        this.basicoKilosGrasa = basicoKilosGrasa;
    }

    traerDatosIndustria(cuit, razonsSocialIndustria, periodoIndustria, basicoKiloProteina, basicoKiloGrasa) {
        return `
        <h3>${razonsSocialIndustria}</h3>
        <p>CUIT: ${cuit}</p>
        <p>Para el mes <strong> ${periodoIndustria} </strong>. </p>
        <p>El precio básico por kilo de grasa es: <strong> $ ${basicoKiloGrasa} </strong>. </p>
        <p>El precio básico por kilo de proteína es: <strong> $ ${basicoKiloProteina} </strong>. </p>
        `
    }

    mostrarDatosIndustria(elemento) {

        const datos = `<div id="datosIndustria"><h2>Datos Industria</h2>${this.traerDatosIndustria(this.cuit, this.razonSocial, this.periodo, this.basicoKiloProteina, this.basicoKilosGrasa)}</div>`;
        $(elemento).prepend(datos);
        $('#formularioIndustria').hide();

    }
}

//periodo predeterminado
var periodoIndustriaNuevo = '2021-09'

//recuperar datos de la industria

if (localStorage.getItem('industriaPrevia')) {
    let industria = JSON.parse(localStorage.getItem('industriaPrevia'));

    const industriaRecuperada = new Industria(industria[0].cuit, industria[0].razonSocial);
    industriaRecuperada.precios(industria[0].periodo, industria[0].basicoKiloProteina, industria[0].basicoKilosGrasa);
    industriaRecuperada.mostrarDatosIndustria('#formularios');

    var periodoIndustriaNuevo = industria[0].periodo
}

//paso a variables los elementos del DOM

const formularioIndustria = $('#formularioIndustria');
const cuitIndustriaCargado = $('#inpuTCuitIndustria');
const razonSocialIndustriaCargado = $('#inputRazonSocialIndustria');
const periodoIndustriaCargado = $('#inputPeriodoIndustria');
const basicoKiloProteinaCargado = $('#inputBasicoKiloProteina');
const basicoKilosGrasaCargado = $('#inputBasicoKilosGrasa');

//cuando hago clic en el formulario de la industria

formularioIndustria.submit(function (evento) {
    evento.preventDefault();

    const cuitIndustriaNuevo = cuitIndustriaCargado.val();
    const razonSocialIndustriaNuevo = razonSocialIndustriaCargado.val();
    const periodoIndustriaNuevo = periodoIndustriaCargado.val();
    const basicoKiloProteinaNuevo = basicoKiloProteinaCargado.val();
    const basicoKilosGrasaNuevo = basicoKilosGrasaCargado.val();

    const industriaNueva = new Industria(cuitIndustriaNuevo, razonSocialIndustriaNuevo);

    industriaNueva.precios(periodoIndustriaNuevo, basicoKiloProteinaNuevo, basicoKilosGrasaNuevo);

    $('#datosIndustria').remove();

    industriaNueva.mostrarDatosIndustria('#formularios');

    guardarIndustriaOTambo('industriaPrevia', industriaNueva)

})

//creo las funciones para guardar y recuperar industrias del storage

function guardarIndustriaOTambo(nombreLocal, nuevaIndustriaOTambo) {
    let industriaAGuardar = []
    industriaAGuardar.push(nuevaIndustriaOTambo);
    localStorage.setItem(nombreLocal, JSON.stringify(industriaAGuardar));
}

function recuperarIndustriaOTambo(nombreLocal, variable) {
    if (localStorage.getItem(nombreLocal)) {
        var variable = JSON.parse(localStorage.getItem(nombreLocal));
    }

    return variable
}
