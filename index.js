import colors from 'colors';
import { guardarDb, leerDB } from './helpers/guardarArchivo.js';
import { confirmar, inquirerMenu, leerInput, listadoTareasBorrar, mostrarListadoCheck, pausa } from './helpers/inquirer.js';
import { Tareas } from './models/tareas.js';

console.clear();

const main = async () => {
    let opt = "";
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.cargarTareaFromArray(tareasDB);
    }


    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput("Descripción: ");
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listadoCompleto(tareas.listadoArr);
                break;
            case '3':
                tareas.listadoPendienteCompletadas(tareas.listadoArr, true);
                break;
            case '4':
                tareas.listadoPendienteCompletadas(tareas.listadoArr, false);
                break;
            case '5':
                const ids = await mostrarListadoCheck(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);

                if (id !== "0") {
                    const ok = await confirmar('¿Estás seguro?');
                    if (ok) {
                        tareas.borrarTarea(id);

                        console.log('Tarea borrada correctamente');
                    }

                }
                break;
        }

        guardarDb(tareas.listadoArr);

        await pausa();

    } while (opt !== "0");

}

main();