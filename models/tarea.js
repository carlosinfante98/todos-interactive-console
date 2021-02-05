const { v4: uuidv4 } = require('uuid');

class Tarea {
    id = '';
    descripcion = '';
    completadoEn = null;
    
    
    constructor( desc ){
        this.descripcion = desc;
        this.id = uuidv4();
    }
}


module.exports = Tarea;