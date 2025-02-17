document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formularioPaciente");
  const tablaPacientes = document.getElementById("tablaPacientes").querySelector("tbody");
  const btnAgregarPaciente = document.getElementById("agregarPaciente");

  // Función para manejar la adición de un paciente
  const manejarAgregarPaciente = () => {
    // Obtener valores de los campos del formulario
    const nombresApellidos = document.getElementById("nombresApellidos").value;

    const dia = document.getElementById("dia").value;
    const dni = document.getElementById("dni").value;
    //const historiaClinica = document.getElementById("historiaClinica").value;
    const numeroCita = document.getElementById("numeroCita").value;
    const financiadorSalud = document.getElementById("financiadorSalud").value;
    const etnia = document.getElementById("etnia").value;
    const distrito = document.getElementById("Distrito").value;
    const CentroPoblado = document.getElementById("CentroPoblado").value;
    const edad = document.getElementById("edad").value;
    const sexo = document.getElementById("sexo").value;

    // Datos antropométricos
    const perimetroCefalico = document.getElementById("perimetroCefalico").value;
    const perimetroAbdominal = document.getElementById("perimetroAbdominal").value;
    const peso = document.getElementById("peso").value;
    const talla = document.getElementById("talla").value;
    const hemoglobina = document.getElementById("hemoglobina").value;

    // Diagnósticos y códigos CIE
    const diagnostico1 = document.getElementById("diagnostico1").value || "";
    const cie1 = document.getElementById("cie1").value || "";
    const diagnostico2 = document.getElementById("diagnostico2").value || "";
    const cie2 = document.getElementById("cie2").value || "";
    const diagnostico3 = document.getElementById("diagnostico3").value || "";
    const cie3 = document.getElementById("cie3").value || "";


    const fecha = document.getElementById("fecha").value; 
    const sis = document.getElementById("sis").value;
    // Separar los diagnósticos y códigos CIE con comas
    const diagnosticos = [diagnostico1, diagnostico2, diagnostico3]
      .filter((diagnostico) => diagnostico !== "")
      .join(", ");
    const codigosCIE = [cie1, cie2, cie3]
      .filter((cie) => cie !== "")
      .join(", ");

    // Crear una nueva fila en la tabla
    const nuevaFila = document.createElement("tr");
//<td>${historiaClinica || ""}</td>
    nuevaFila.innerHTML = `
      <td>${nombresApellidos || ""}</td>
      <td>${dia || ""}</td>
      <td>${dni || ""}</td>
      <td>${numeroCita || ""}</td>
      <td>${financiadorSalud || ""}</td>
      <td>${etnia || ""}</td>
      <td>${distrito || ""}</td>
      <td>${CentroPoblado || ""}</td>
      <td>${edad || ""}</td>
      <td>${sexo || ""}</td>
      <td>${perimetroCefalico || ""}</td>
      <td>${perimetroAbdominal || ""}</td>
      <td>${peso || ""}</td>
      <td>${talla || ""}</td>
      <td>${hemoglobina || ""}</td>
      <td>${diagnosticos || ""}</td>
      <td>${codigosCIE || ""}</td>
      <td>${fecha || ""}</td>
      <td>${sis || ""}</td>
      
      <td>
        <button class="btn btn-sm btn-danger btnEliminar">Eliminar</button>
      </td>
    `;

    // Agregar la fila a la tabla
    tablaPacientes.appendChild(nuevaFila);

    // Limpiar el formulario
    formulario.reset();

    // Agregar funcionalidad para eliminar pacientes
    nuevaFila.querySelector(".btnEliminar").addEventListener("click", () => {
      nuevaFila.remove();
    });
  };

  // Asignar evento al botón de agregar paciente
  btnAgregarPaciente.addEventListener("click", manejarAgregarPaciente);
});

window.onbeforeunload = function () {
  const tabla = document.getElementById("tablaPacientesBody");
  if (tabla && tabla.rows.length > 0) {
      return "Tienes datos sin guardar. ¿Seguro que quieres salir?";
  }
};
