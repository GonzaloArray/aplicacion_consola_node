import fs from 'fs';
const archivo = "./db/data.json";

const guardarDb = (data) => {

    fs.writeFileSync(archivo, JSON.stringify(data));
}

const leerDB = () => {
    if (!fs.existsSync(archivo)) {
        return null;
    }

    const info = fs.readFileSync(archivo, {encoding : 'utf-8'});
    const data = JSON.parse(info);

    // Dejamos el curso en este punto, donde parseamos el json que creamos a traves de los comandos de node y luego capturamos los valores guardados para luego poder mostrarlos, seria como almacenar info y poder mostrar lo que ya esta almacenado
    console.log(data)

    return data;
}

export{
    guardarDb,
    leerDB
}