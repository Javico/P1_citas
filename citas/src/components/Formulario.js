import React, {Fragment, useState} from 'react'
import uuid from 'uuid/v4'
import PropTypes from 'prop-types'


const Formulario = ({crearCita}) => {

    //Crear state de citas
    const [cita, actualizaCita] = useState({
        mascota: '',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    });

    const [error, actualizarError] = useState(false);

    //Funcion que se ejecuta cada que el usuario escribe en un input
    const actualizarState = (e) => {
        //console.log(e.target.value);
        actualizaCita({
            ...cita,
            [e.target.name] : e.target.value
        })
    };

    //Extraer valores
    const { mascota, propietario, fecha, hora, sintomas} = cita;

    //Cuando se envia el formulario
    const submitCita = (e) => {
        e.preventDefault();
        console.log("Validando");

        //Validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === ''
        || hora.trim() === ''|| sintomas.trim() === ''){
            //console.log("hay un error");
            actualizarError(true);
            return;
        }

        actualizarError(false);

        //Asignar Id
        cita.id = uuid();
        //console.log(cita)

        //Crear cita
        crearCita(cita);

        //Reiniciar formulario
        actualizaCita({
            mascota: '',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:''
        })
    }

    return (
        <Fragment>
            <h2>Crear Cita</h2>
            {
                error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null
            }
            <form
                onSubmit={submitCita}
            >
                <label>Nombre mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="nombre mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="nombre del dueño"
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />
                <label>Sintomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>
                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
        </Fragment>
    );
}

Formulario.protoTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;