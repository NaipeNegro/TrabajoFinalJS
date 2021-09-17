class Tambo {

    //datos de cada tambo, no varían
    constructor(cuit, razonSocial, numeroTamboInterno) {
        this.cuit = cuit;
        this.razonSocial = razonSocial;
        this.numeroTamboInterno = numeroTamboInterno;
    }

    //datos propios de cada mes para cada tambo

    produccion(periodo, litros, kilosProteina, kilosGrasa, ufc, rcs) {
        this.periodo = periodo;
        this.litros = litros;
        this.kilosProteina = kilosProteina;
        this.kilosGrasa = kilosGrasa;
        this.ufc = ufc;
        this.rcs = rcs
    }

    //datos que dependen de los de la industria

    montosAPagar(basicoKiloProteina, basicoKilosGrasa) {
        this.montoProteina = this.kilosProteina * basicoKiloProteina;
        this.montoGrasa = this.kilosGrasa * basicoKilosGrasa;
        this.montoTotal = this.montoProteina + this.montoGrasa
        this.iva = this.montoTotal * 0.21
        this.precioPorLitros = this.montoTotal / this.litros

    }
}

let tamboAGuardar = []

function guardarIndustriaOTambo(nombreLocal, nuevaIndustriaOTambo) {
    tamboAGuardar.push(nuevaIndustriaOTambo);
    localStorage.setItem(nombreLocal, JSON.stringify(tamboAGuardar));
}


// con "input" comienza lo que carga el usuario en el HTML, la variable termina en "Cargado" y los valores terminan en "Nuevo"

const formularioTambo = $('#formularioTambo');
const cuitTamboCargado = $('#inputCuitTambo');
const razonSocialTamboCargado = $('#inputRazonSocialTambo');
const numeroTamboInternoCargado = $('#inputNumeroTamboInterno');
const periodoTamboCargado = periodoIndustriaNuevo

// const periodoTamboCargado = $('#inputPeriodoTambo');
const litrosCargado = $('#inputLitros');
const kiloProteinaCargado = $('#inputKiloProteina');
const kiloGrasaCargado = $('#inputKiloGrasa');
const ufcCargado = $('#inputUfc');
const rcsCargado = $('#inputRcs');

formularioTambo.submit(function (evento) {
    evento.preventDefault();

    const cuitTamboNuevo = cuitTamboCargado.val();
    const razonSocialTamboNuevo = razonSocialTamboCargado.val();
    const numeroTamboInternoNuevo = numeroTamboInternoCargado.val();
    const litrosNuevo = litrosCargado.val();
    const kiloProteinaNuevo = kiloProteinaCargado.val();
    const kiloGrasaNuevo = kiloGrasaCargado.val();
    const ufcNuevo = ufcCargado.val();
    const rcsNuevo = rcsCargado.val();

    const tambo1 = new Tambo(cuitTamboNuevo, razonSocialTamboNuevo, numeroTamboInternoNuevo)
    
        if (localStorage.getItem('industriaPrevia')) {

            let industria = JSON.parse(localStorage.getItem('industriaPrevia'));
    
            const industriaRecuperada = new Industria(industria[0].cuit, industria[0].razonSocial);
            industriaRecuperada.precios(industria[0].periodo, industria[0].basicoKiloProteina, industria[0].basicoKilosGrasa);
        
            var periodoIndustriaNuevo = industria[0].periodo
    
            tambo1.montosAPagar(industriaRecuperada.basicoKiloProteina, industriaRecuperada.basicoKilosGrasa)
        }
        else{
            alert('Se debe cargar antes los datos de la industria')
        }

    tambo1.produccion(periodoIndustriaNuevo, litrosNuevo, kiloProteinaNuevo, kiloGrasaNuevo, ufcNuevo, rcsNuevo)

    
    guardarIndustriaOTambo('tambosAlStorage', tambo1)

    if ($('#tambos-tabla').length) {
        $('datosTambos').show();
        crearFilaTambos(tambo1, '#tambos-tabla');
        console.log('existe la tabla')

    }
    else {
        $('#datosTambos').show();
        crearTabla('#datosTambos', 'tambos-tabla');
        crearHeaderTabla(['CUIT', 'Razón Social', 'N interno', 'Período', 'Litros', 'Kilos Proteína', 'Kilos Grasa', 'ufc', 'rcs'], '#tambos-tabla');
        crearFilaTambos(tambo1, '#tambos-tabla');
        console.log('no existe la tabla')

    }

})

let tambo = [];

if (localStorage.getItem('tambosAlStorage')) {
    tambos = JSON.parse(localStorage.getItem('tambosAlStorage'));
    $('#datosTambos').show();
    crearTabla('#datosTambos', 'tambos-tabla');
    crearHeaderTabla(['CUIT', 'Razón Social', 'N interno', 'Período', 'Litros', 'Kilos Proteína', 'Kilos Grasa', 'ufc', 'rcs'], '#tambos-tabla');
    llenarTabla(tambos, '#tambos-tabla')
}
else {
    $('#datosTambos').css("display", "none");
}

function crearTabla(elemento, id) {
    const tabla = `<table id=${id}></table>`;
    $(elemento).append(tabla);
}

function crearHeaderTabla(datos, elemento) {

    const header = `<tr>${crearDataHeaderTabla(datos)}</tr>`;
    $(elemento).append(header);
}

function crearDataHeaderTabla(datos) {
    if (document.getElementById('#titulos')) {

    } else {
        return datos.map(headerdata => `<th id="titulos">${headerdata}</th>`);
    }
}

function crearFilaTambos(tambo, elemento) {
    const fila = `<tr id=tr-${tambo.numerotambointerno}>
    ${llenarDatosTabla(tambo.cuit, tambo.razonSocial, tambo.numeroTamboInterno, tambo.periodo, tambo.litros, tambo.kilosProteina, tambo.kilosGrasa, tambo.ufc, tambo.rcs)}
    </tr>`;
    $(elemento).append(fila);
}

function llenarTabla(datos, elemento) {
    datos.map(tambo => {
        crearFilaTambos(tambo, elemento);
    })
}

function llenarDatosTabla(cuit, razonSocial, numeroTamboInterno, periodo, litros, kilosProteina, kilosGrasa, ufc, rcs) {
    return `
    <td>${cuit}</td>
    <td>${razonSocial}</td>
    <td>${numeroTamboInterno}</td>
    <td>${periodo}</td>
    <td>${litros}</td>
    <td>${kilosProteina}</td>
    <td>${kilosGrasa}</td>
    <td>${ufc}</td>
    <td>${rcs}</td>
    `
}





