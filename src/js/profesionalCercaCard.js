document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("div-oficios-cards");

  fetch("../db/profesionales.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error al cargar el JSON: ${response.statusText}`);
      }
      return response.json();
    })
    .then((profesionales) => {
      profesionales.forEach((profesional) => {
        if (profesional.localidad == "San Rafael, Mendoza") {
          // 1. Enlace principal
          const card = document.createElement("a");
          card.href = `profesional.html?id=${profesional.id}`; // Se incluye el ID opcionalmente
          card.className = "oficio-card transicion-izquierda";

          // 2. Primer div con imagen de portada/oficio
          const divImagen = document.createElement("div");
          divImagen.className = "imagen-oficio-card";

          const imgPortada = document.createElement("img");
          imgPortada.src = profesional.fotoPerfil;
          imgPortada.alt = `${profesional.oficio}FotoPerfil`;

          divImagen.append(imgPortada);

          // 3. Div de Perfil
          const divPerfil = document.createElement("div");
          divPerfil.className = "perfil-oficio-card";

          const imgPerfil = document.createElement("img");
          imgPerfil.src = profesional.fotoPerfil;
          imgPerfil.alt = `${profesional.oficio}FotoPerfil`;

          const divInfo = document.createElement("div");
          const h3 = document.createElement("h3");
          h3.textContent = profesional.nombre;

          const spanOficio = document.createElement("span");
          spanOficio.textContent = profesional.oficio;

          divInfo.append(h3, spanOficio);
          divPerfil.append(imgPerfil, divInfo);

          // 4. Descripción
          const spanDesc = document.createElement("span");
          spanDesc.className = "descripcion-oficio-card";
          spanDesc.textContent = profesional.descripcion;

          // 5. Ubicación y Experiencia
          const divUbicacionExp = document.createElement("div");
          divUbicacionExp.className = "ubicacion-experiencia-oficio-card";

          const divUbicacion = document.createElement("div");

          // Creación del SVG
          const svg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg",
          );
          svg.setAttribute("viewBox", "0 0 24 24");
          svg.setAttribute("fill", "none");

          const path1 = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path",
          );
          path1.setAttribute(
            "d",
            "M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z",
          );
          path1.setAttribute("stroke-width", "2");
          path1.setAttribute("stroke-linecap", "round");
          path1.setAttribute("stroke-linejoin", "round");

          const path2 = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path",
          );
          path2.setAttribute(
            "d",
            "M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z",
          );
          path2.setAttribute("stroke-width", "2");
          path2.setAttribute("stroke-linecap", "round");
          path2.setAttribute("stroke-linejoin", "round");

          svg.append(path1, path2);

          const spanLocalidad = document.createElement("span");
          spanLocalidad.textContent = profesional.localidad;

          divUbicacion.append(svg, spanLocalidad);

          const spanExp = document.createElement("span");
          spanExp.textContent = profesional.anosExperiencia;

          divUbicacionExp.append(divUbicacion, spanExp);

          // Append final dentro de la card
          card.append(divImagen, divPerfil, spanDesc, divUbicacionExp);

          // Inserción en el contenedor principal
          contenedor.append(card);
        }
      });
    })
    .catch((error) =>
      console.error("Error cargando los profesionales:", error),
    );
});
