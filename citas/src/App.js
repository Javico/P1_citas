import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  //Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));

  if(!citasIniciales){
    citasIniciales = [];
  }

  //Arreglo de citas
  const [citas,guardarCitas] = useState(citasIniciales);

  //Use Effect para realizar ciertas operaciones cuando el state cambia
  useEffect( () => {
    // console.log("esta cosa funciona como el Document.ready() " +
    // "del jquery y tambien escucha el state de citas y evitas que se cicle declarndo el array");
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));

    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    }else{
      localStorage.setItem('citas', JSON.stringify([]))
    }
  }, [citas] );

  //Funcion que tome las citas actuales y agregue la nueva
  const crearCita = (cita) => {
    console.log(cita);
    guardarCitas([
        ...citas,
        cita 
    ]);
  }

  //Funcion que elimina una cita por su id
  const eliminarCita = (id) => {
    //console.log(id);
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  //Mensaje condicional
  const titulo = citas.length === 0 ? "No hay citas" : "Administra tus citas";

  return (
    <Fragment>
    <h1>Administrador de citas</h1>

    <div className="container">
      <div className="row">
        <div className="one-half column">
            <Formulario
              crearCita={crearCita}
            ></Formulario>
        </div>
        <div className="one-half column">
          <h2>{titulo}</h2>
          {citas.map(cita => (
            <Cita
              key={cita.id}
              cita={cita}
              eliminarCita={eliminarCita}
            ></Cita>
          ))}
        </div>
      </div>
    </div>
    </Fragment>
  );
}

export default App;
