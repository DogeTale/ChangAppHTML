document.addEventListener("DOMContentLoaded", async () => {
  // 1. Obtener el ID del profesional desde la URL
  const params = new URLSearchParams(window.location.search);
  const idProfesional = parseInt(params.get("id"), 10);

  // Si no se pasó un ID en la URL, se puede redirigir o mostrar un mensaje
  if (isNaN(idProfesional)) {
    console.error("ID de profesional no especificado en la URL.");
    return;
  }

  try {
    // 2. Fetch de la base de datos de profesionales
    const response = await fetch("../db/profesionales.json");
    if (!response.ok) {
      throw new Error(`Error al cargar el JSON: ${response.statusText}`);
    }

    const profesionales = await response.json();

    // 3. Buscar el profesional que coincida con el ID
    const profesional = profesionales.find((p) => p.id === idProfesional);

    if (!profesional) {
      console.error(`No se encontró el profesional con ID: ${idProfesional}`);
      return;
    }

    // 4. Actualizar título de la página
    document.title = `${profesional.nombre} - ${profesional.oficio}`;

    // 5. Reemplazar información personal y foto de perfil
    const h2Nombre = document.querySelector(".div-informacion-personal h2");
    if (h2Nombre) h2Nombre.textContent = profesional.nombre;

    const imgPerfil = document.querySelector(".div-foto-perfil img");
    if (imgPerfil) {
      imgPerfil.src = profesional.fotoPerfil;
      imgPerfil.alt = `Foto de perfil de ${profesional.nombre}`;
    }

    // 6. Reemplazar información principal de las casillas utilizando el atributo 'for'
    const casillasInfo = {
      oficio: profesional.oficio,
      descripcion: profesional.descripcion,
      telefono: profesional.telefono,
      email: profesional.email,
      "años-de-experiencia": profesional.anosExperiencia,
    };

    Object.entries(casillasInfo).forEach(([attrFor, valor]) => {
      const casilla = document.querySelector(
        `.casilla-informacion[for="${attrFor}"] h4`,
      );
      if (casilla && valor !== undefined) {
        casilla.textContent = valor;
      }
    });

    // 7. Renderizar la galería de trabajos
    const contenedorGaleria = document.getElementById(
      "div-fotos-galeria-trabajos",
    );
    if (contenedorGaleria && Array.isArray(profesional.galeriaTrabajos)) {
      // Limpiar contenido estático previo
      contenedorGaleria.textContent = "";

      const fragment = document.createDocumentFragment();

      profesional.galeriaTrabajos.forEach((rutaImagen, index) => {
        const imgGaleria = document.createElement("img");
        imgGaleria.src = rutaImagen;
        imgGaleria.alt = `Trabajo ${index + 1} de ${profesional.nombre}`;

        fragment.append(imgGaleria);
      });

      contenedorGaleria.append(fragment);
    }
  } catch (error) {
    console.error("Error al cargar la información del profesional:", error);
  }
});
