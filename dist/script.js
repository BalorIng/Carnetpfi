document.getElementById("employeeForm").addEventListener("submit", function(e) {
    e.preventDefault();

    // Obtener los valores del formulario
    var nombre = document.getElementById("nombre").value;
    var numero = document.getElementById("numero").value;
    var cargo = document.getElementById("cargo").value;
    var foto = document.getElementById("foto").files[0];

    // Mostrar los datos en el carnet
    document.getElementById("nombreEmpleado").innerText = nombre;
    document.getElementById("numeroEmpleado").innerText = "Nº Empleado: " + numero;
    document.getElementById("cargoEmpleado").innerText = "Cargo: " + cargo;

    // Mostrar la foto en el carnet
    var reader = new FileReader();
    reader.onload = function(event) {
        document.getElementById("fotoEmpleado").src = event.target.result;
    };
    reader.readAsDataURL(foto);

    // Generar el código QR con la información del carnet
    var qrContent = "Nombre: " + nombre + ", Nº Empleado: " + numero + ", Cargo: " + cargo;
    QRCode.toCanvas(document.getElementById("qrCode"), qrContent, function(error) {
        if (error) console.error(error);
    });
});

// Guardar el carnet como imagen
document.getElementById("saveCarnet").addEventListener("click", function() {
    var carnetElement = document.getElementById("carnet");

    html2canvas(carnetElement).then(function(canvas) {
        // Crear un enlace para descargar la imagen
        var link = document.createElement('a');
        link.download = 'carnet_empleado.png';
        link.href = canvas.toDataURL();
        link.click();
    });
});