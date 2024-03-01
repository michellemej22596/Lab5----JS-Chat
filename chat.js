//Disenio 
document.body.style.backgroundColor = '#f0f0f0';

// Funcion para enviar mensajes
const postMessage = async () => {
  const messageContent = t.value.trim();

  // Verifica que el mensaje tenga entre 1 y 140 caracteres
  if (messageContent.length > 0 && messageContent.length <= 140) {
    const body = {
      username: 'Michelle',
      message: messageContent,
    };
  
    // Realiza la solicitud para enviar el mensaje
    const response = await fetch('https://chat.tiburoncin.lat/messages', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    // Agrega estilos de animacion en linea
    ul.style.animation = 'messageSentAnimation 0.5s ease-out';
    ul.style.transform = 'translateY(0)';
    ul.style.opacity = '1';
  
    // Limpia la lista de mensajes
    ul.innerHTML = '';

    getMessages();
    t.value = '';  // Esto limpiara el contenido del cuadro de texto

     // Agregar animacion al boton de enviar
     b.style.backgroundColor = '#3100d1'; 
     setTimeout(() => {
       b.style.backgroundColor = '#3498db';
     }, 500);

  } else {
    // Muestra una alerta si el mensaje no cumple con los requisitos
    alert('El mensaje debe tener entre 1 y 140 caracteres.');
  }
};

// Función para detectar enlaces a imagenes en el mensaje
const detectImageLink = (message) => {
  const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/gi;
  const matches = message.match(regex);
  return matches;
};

// Función para detectar enlaces en el texto
const detectLink = (text) => {
  const regex = /https?:\/\/\S+/gi;
  const matches = text.match(regex);
  return matches;
};

// Crea el contenedor principal
const container = document.createElement('div');
container.style.position = 'fixed';
container.style.bottom = '0';
container.style.width = '80%';
container.style.margin = '0 auto';
document.body.appendChild(container);

// Crea la lista de mensajes
const ul = document.createElement('ul');
ul.style.listStyleType = 'none';
ul.style.overflowY = 'auto';
ul.style.maxHeight = 'calc(100vh - 100px)';
container.appendChild(ul);

// Crea el área de texto para escribir mensajes
const t = document.createElement('textarea');
t.style.width = 'calc(100% - 20px)';
t.style.padding = '10px';
t.style.marginBottom = '10px';
t.style.border = '1px solid #ccc';
t.style.borderRadius = '5px';
t.style.resize = 'none';
container.appendChild(t);

// Añade un evento al área de texto para enviar mensajes con la tecla Enter
t.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    postMessage();
  }
});

// Crea el botón de enviar mensaje
const b = document.createElement('button');
b.innerHTML = 'SEND';
b.style.width = 'calc(100% - 20px)';
b.style.padding = '10px';
b.style.backgroundColor = '#3498db';
b.style.color = '#fff';
b.style.border = 'none';
b.style.borderRadius = '5px';
b.style.cursor = 'pointer';
b.addEventListener('click', postMessage);
container.appendChild(b);

// Función para obtener mensajes desde el servidor
const getMessages = async () => {
  const response = await fetch('https://chat.tiburoncin.lat/messages');
  const messages = await response.json();

  // Itera sobre los mensajes y crea las vistas previas
  messages.forEach((message) => {
    createImagePreview(message);
  });
};

// Función para crear vista previa de enlaces en el mensaje
const createLinkPreview = (text) => {
  const links = detectLink(text);

  if (links) {
    links.forEach((link) => {
      const linkContainer = document.createElement('div');
      linkContainer.style.marginTop = '5px';

      const linkPreview = document.createElement('a');
      linkPreview.href = link;
      linkPreview.target = '_blank';
      linkPreview.textContent = link;
      linkContainer.appendChild(linkPreview);

      ul.appendChild(linkContainer);
    });
  }
};

// Función para crear vista previa de imágenes y mensajes
const createImagePreview = (message) => {
  const li = document.createElement('li');
  li.style.backgroundColor = '#e1e1e1';
  li.style.padding = '10px';
  li.style.marginBottom = '10px';
  li.style.borderRadius = '8px';
  li.style.fontFamily = 'Comic Sans MS, cursive';

  const imageLinks = detectImageLink(message.message);

  if (imageLinks) {
    imageLinks.forEach((link) => {
      const img = document.createElement('img');
      img.src = link;
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
      li.appendChild(img);
    });
  } else {
    li.append(`${message.username}: ${message.message}`);
  }
  
  // Añade vista previa de enlaces en el mensaje
  createLinkPreview(message.message);
  ul.appendChild(li);
};

// Obtén los mensajes al cargar la página

// Auto-refresh de la lista de mensajes cada 5 segundos
setInterval(() => {
  ul.innerHTML = ''; // Limpia la lista antes de actualizar
  getMessages();
}, 5000); // Intervalo de 5000 milisegundos (5 segundos)


getMessages();





