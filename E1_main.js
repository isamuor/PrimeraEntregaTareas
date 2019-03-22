const fs = require('fs')
const courses = require('./DB_cursos');

let cursos = courses.cursos;

const options = {
    id: {
        dec: 'Identificación del Curso al que desea inscribirse',
        demand: true
    },
    estudiante: {
        alias: 'e',
        dec: 'Nombre del estudiante interesado en el curso',
        demand: true
    },
    cedula: {
        alias: 'c',
        dec: 'Identificación del estudiante',
        demand: true
    }
}
const argv = require('yargs')
    .command('inscribir', 'Para incribirse al curso de ingresar el id de este, su nombre y su cédula', options)
    .argv;

idCurso = argv.id;
DeseaInscripcion = argv._[0];


if (DeseaInscripcion === 'inscribir') {

    let crearArchivo = (idCurso, callback) => {
        let cursoID = cursos.find(course => {
            return course.id == idCurso
        })
        if (!cursoID) {
            callback(`No existe el curso con el id solicitado`)
        } else {
            callback(null, cursoID, argv)
        }
    };

    crearArchivo(idCurso, (err, cursoID, argv) => {
        if (err) {
            return console.log(err);
        }
        texto = ` La información del curso solicitado es:\n
 id: ${cursoID.id} \n Nombre: ${cursoID.nombre} \n Duración: ${cursoID.duracion} semanas \n Valor: $ ${cursoID.valor} \n
 La información del interesado es: \n \n Nombre del estudiante: ${argv.estudiante} \n Cédula: ${argv.cedula}`
        fs.writeFile('InformacionInteres.txt', texto, (err) => {
            if (err) throw (err);
            console.log('El archivo de interés se ha creado')
        });

    })
} else {

    let showCourses = () => {
        console.log(`Los cursos disponibles se listan a continuación:`)

        cursos.forEach((element, i) => {
            setTimeout(() => {
                console.log(`id: ${element.id} \n Nombre: ${element.nombre} \n Duración: ${element.duracion} semanas \n Valor: $ ${element.valor} \n`);
            }, 2000 * (i + 1));
        });
    };
    showCourses();
    setTimeout(() => {
        console.log(`si deseas inscribirte debes seguir las instrucciones del siguiente ejemplo: \n node E1_main inscribir --id 1 -e Isabel -c 1450 \n`);
    }, 6000);

}