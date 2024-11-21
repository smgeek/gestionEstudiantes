
let estudiantes = [];

function registrar(){

    //Capturar valores del formulario HMTL
    let nombre = document.getElementById('nombre').value;
    let edad = parseInt(document.getElementById('edad').value);
    let materia = document.getElementById('materia').value;
    let nota1 = parseFloat(document.getElementById('nota1').value);
    let nota2 = parseFloat(document.getElementById('nota2').value);
    let nota3 = parseFloat(document.getElementById('nota3').value);
    
    //Valida que los campos tenga datos
    if (!nombre || isNaN(edad) || !materia || isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
        alert("Debe completar los datos del formulario");
        return;
    }

    //Adicionar al arreglo
    estudiantes.push({nombre,edad,materia,nota1,nota2,nota3})

    //limpiar los datos ingresados para ingresar otra ruta
    document.getElementById('nombre').value = "";
    document.getElementById('edad').value = "";
    document.getElementById('materia').value = "";
    document.getElementById('nota1').value = "";
    document.getElementById('nota2').value = "";
    document.getElementById('nota3').value = "";

    alert("Estudiante registrado con éxito");
 
}

// Listar estudiantes por apellido y orden ascendente
function listaEstudiante(){
    let listatmp = []
    let nombre_n = ""
    let nombre_a = ""
    let nombre_invertido = ""
    estudiantes.forEach(item => {
        //Se realiza procesamiento de cada nombre apellido y se invierte para apellido nombre
        nombre_a = item.nombre.substring(item.nombre.indexOf(" ")+1,item.nombre.length);
        nombre_n = item.nombre.substring(0,item.nombre.indexOf(" "))
        nombre_invertido = nombre_a + " " + nombre_n;
        listatmp.push({nombre_invertido,edad : item.edad, materia : item.materia, nota1 : item.nota1,nota2 : item.nota2, nota3 : item.nota3})
    });

    //Organizar en orden ascedente
    listatmp.sort(function(a,b){
        return a.nombre_invertido - b.nombre_invertido
    });

    
    const resultadosDiv = document.getElementById("resultados");
            resultadosDiv.innerHTML = listar(listatmp);
            
    
    
}

function listar(lista){
    let listaimp = `<h1>Listado de estudiantes</h1><br>`
    listaimp += `<table class="table table-striped">`;
    listaimp += `
    <thead>
    <tr>
      <th scope="col">Nombre</th>
      <th scope="col">Edad</th>
      <th scope="col">Materia</th>
      <th scope="col">Nota1</th>
      <th scope="col">Nota2</th>
      <th scope="col">Nota3</th>
    </tr>
    </thead>
    <tbody>
    `      
    lista.forEach( item => {                            
        listaimp += `<tr><td>${item.nombre_invertido}</td>
                    <td>${item.edad}</td>
                    <td>${item.materia}</td>
                    <td>${item.nota1}</td>
                    <td>${item.nota2}</td>
                    <td>${item.nota3}</td><tr>`;
    });
    listaimp += `</tbody>`;
    listaimp += `</table>`
    return listaimp
}

function listarPromedioMenor3(lista){
    let listaimp = `<h1>Listado de estudiantes con promedio menor 3</h1><br>`
    //Se construye tabla
    listaimp += `<table class="table table-striped">`;
    listaimp += `
    <thead>
    <tr>
      <th scope="col">Nombre</th>
      <th scope="col">Promedio</th>
    </tr>
    </thead>
    <tbody>
    `      
    lista.forEach( item => {                            
        listaimp += `<tr><td>${item.nombre}</td>
                    <td>${item.promedio}</td></tr>`;
    });
    listaimp += `</tbody>`;
    listaimp += `</table>`
    return listaimp
}


//Metodo o Función para calcular que estudiantes en los diferentes rangos de edades 
function estudianteRangoEdad(){
    let lista15a20count = 0
    let lista20a25count = 0
    let lista25a30count = 0
    estudiantes.forEach(item => {

        item.edad > 15 && item.edad <= 20 ? lista15a20count++ :
        item.edad > 20 && item.edad <= 25 ? lista20a25count++ :
        item.edad > 25 && item.edad <= 30 ? lista25a30count++ :
        alert("Edad por fuera de los rangos");

        /*if (item.edad > 15 && item.edad <= 20) {
            lista15a20count += 1;
        } else if (item.edad > 20 && item.edad <= 25) {
            lista20a25.push(item.nombre);
        } else if (item.edad > 25 && item.edad <= 30) {
            lista25a30.push(item.nombre);
        } else {
            alert("edad fuera de los rangos")
        }
       */
    })
    

    const resultadosDiv = document.getElementById("resultados");
            resultadosDiv.innerHTML = `
            <h1> Estudiantes por rango de edades </h1>
            <table class="table table-striped">
            <thead>
            <tr>
                <td scope="col">Rango</td>
                <td scope="col">Edad</td>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>15-20</td>
                <td>${lista15a20count}</td>
            <tr>
            <tr>
                <td>20-25</td>
                <td>${lista20a25count}</td>
            <tr>
            <tr>
                <td>25-30</td>
                <td>${lista25a30count}</td>
            <tr>
            </tbody>
            </table>
            `;
}

function estudiantePromedioMenor3(){
    let listaPromEstudiante = [];
    
    //Se calcula el promedio de los estudiantes en la lista
    estudiantes.forEach(item => {
        let promEstudiante = (item.nota1 + item.nota2 + item.nota3)/3;
        listaPromEstudiante.push({nombre:item.nombre,promedio: promEstudiante});
    });

    let listaPromMenor3 = listaPromEstudiante.filter(estudiante => estudiante.promedio < 3);


    //Se escribe el resultado de la consulta en un contenedor
    const resultadosDiv = document.getElementById("resultados");
            resultadosDiv.innerHTML = listarPromedioMenor3(listaPromMenor3);

}



