// Crear el semáforo en el DOM
const semaforo = document.createElement('div');
semaforo.className = 'semaforo';

const luzRoja = document.createElement('div');
luzRoja.className = 'luz roja';
semaforo.appendChild(luzRoja);

const luzAmarilla = document.createElement('div');
luzAmarilla.className = 'luz amarilla';
semaforo.appendChild(luzAmarilla);

const luzVerde = document.createElement('div');
luzVerde.className = 'luz verde';
semaforo.appendChild(luzVerde);

document.body.appendChild(semaforo);

// Función para actualizar luces según el color recibido
function actualizarSemaforoPorColor(color) {
  luzRoja.classList.toggle('encendida', color === 'rojo');
  luzAmarilla.classList.toggle('encendida', color === 'amarillo');
  luzVerde.classList.toggle('encendida', color === 'verde');
}

// URL pública para obtener estado del semáforo en Firebase (sin autenticación)
const FIREBASE_URL = "https://semaforo-a10b9-default-rtdb.firebaseio.com/semaforo/estado.json";

// Función para consultar el estado en Firebase
async function obtenerEstadoFirebase() {
  try {
    const response = await fetch(FIREBASE_URL);
    if (!response.ok) throw new Error('Error al obtener datos de Firebase');
    const data = await response.json();

    if (data && data.color) {
      actualizarSemaforoPorColor(data.color);
    } else {
      console.warn('Datos recibidos inválidos:', data);
    }
  } catch (error) {
    console.error('Error en fetch Firebase:', error);
  }
}

// Consultar cada 2 segundos para mantener sincronizado el semáforo
setInterval(obtenerEstadoFirebase, 2000);

// También llamar la primera vez para que no espere 2 segundos al inicio
obtenerEstadoFirebase();
