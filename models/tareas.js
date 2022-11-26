import { Tarea } from "./tarea.js";
import colors from 'colors';



class Tareas {
    _Listado = {};

    get listadoArr() {
        const listado = []

        Object.keys(this._Listado).forEach(ket => {
            const tarea = this._Listado[ket];
            listado.push(tarea);
        })

        return listado;
    }

    constructor() {
        this._Listado = {};
    }

    borrarTarea(id = ""){
        if (this._Listado[id]) {
            delete this._Listado[id];
        }
    }

    cargarTareaFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._Listado[tarea.id] = tarea;
        })
    }

    crearTarea(desc = "") {
        const tarea = new Tarea(desc);
        this._Listado[tarea.id] = tarea;
    }

    listadoCompleto(tareas = []) {

        tareas.forEach((tarea, i) => {
            const idx = `${i + 1}.`.green;
            const {desc, completadoEn} = tarea;


            console.log(`${idx} ${desc} :::: ${completadoEn ? `${'Completado'.green}` : `${'Pediente'.yellow}`}`);
        })
    }

    listadoPendienteCompletadas(tareas, boolean){
        const valor = tareas.filter(tarea => {
            if (Boolean(tarea.completadoEn) == boolean) {
                return tarea
            }else if(Boolean(tarea.completadoEn) == boolean){
                return tarea
            }
        });

        valor.forEach((tarea, i) => {
            const idx = `${i + 1}.`.green;
            const {desc, completadoEn} = tarea;

            console.log(`${idx} ${desc} :::: ${boolean ? `${'Completado'.green} ${completadoEn.green}` : `${'Pendiente'.yellow}`}`)

        })
    }

    toggleCompletadas(ids = []){
        ids.forEach(id => {
            const tarea = this._Listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        })

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._Listado[tarea.id].completadoEn = null;

            }
        })
    }
}

export{
    Tareas
}