require('colors');
const Tarea = require('./tarea');

class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            listado.push(this._listado[key]);
        });

        return listado;
    }

    constructor() {
        this._listado = {}
    }

    borrarTarea(id) {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => this._listado[tarea.id] = tarea);
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}.`.green;
            const { descripcion, completadoEn } = tarea;
            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Pendiente'.red;
            console.log(`${idx} ${descripcion} :: ${estado}`);
        });
    }

    listarPendientesCompletadas(completadas = true) {
        this.listadoArr
            .filter(tarea => completadas ? tarea.completadoEn : !tarea.completadoEn)
            .forEach((tarea, i) => {
                const idx = `${i + 1}.`.green;
                const { descripcion, completadoEn } = tarea;
                const estado = (completadoEn)
                    ? 'Completada'.green
                    : 'Pendiente'.red;
                console.log(`${idx} ${descripcion} :: ${completadas ? completadoEn.green : estado}`);
            });
    }

    toggleCompletadas(ids) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;