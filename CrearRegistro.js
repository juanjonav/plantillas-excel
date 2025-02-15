document.getElementById("btnGenerarExcelHis").addEventListener("click", async () => {
  try {
    const workbook = new ExcelJS.Workbook();
    const response = await fetch("https://juanjonav.github.io/plantillas-excel/plantillaHIS.xlsx");
    const arrayBuffer = await response.arrayBuffer();
    await workbook.xlsx.load(arrayBuffer);
    const hoja = workbook.getWorksheet('Hoja1');
    // Obtener todas los datos de la tabla
    const tabla = document.getElementById("tablaPacientesBody");
    const filas = tabla.querySelectorAll("tr");
    const totalFilas = filas.length;



  // ========================
    for (let i = 0; i < Math.min(totalFilas, 25); i++) {
      const fila = filas[i];
      const celdas = fila.querySelectorAll("td");
      const datos = Array.from(celdas).map(td => td.textContent.trim());
  
      const diagnosticos = datos[15].split(",").map(d => d.trim());
      const codigos = datos[16].split(",").map(c => c.trim());

      const fecha = datos[17] ? datos[17].split("-").map(d => d.trim()) : ["", "", ""]; 
      


      const baseRow = 13 + (i * 5);
      hoja.getCell(`E${baseRow}`).value = datos[0];  // Nombre
      hoja.getCell(`B${baseRow + 1}`).value = datos[1];  // Día

      hoja.getCell(`W${baseRow}`).value = fecha[2] || ""; // Día
      hoja.getCell(`X${baseRow}`).value = fecha[1] || ""; // Mes
      hoja.getCell(`Y${baseRow}`).value = fecha[0] || ""; // Año


      hoja.getCell(`C${baseRow + 1}`).value = datos[2];  // DNI
      hoja.getCell(`C${baseRow + 3}`).value = datos[3];  // Historia clínica
      hoja.getCell(`D${baseRow + 1}`).value = datos[4];  // Financiamiento
      hoja.getCell(`D${baseRow + 3}`).value = datos[5];  // Etnia
      hoja.getCell(`E${baseRow + 1}`).value = datos[6];  // Distrito
      hoja.getCell(`E${baseRow + 3}`).value = datos[7];  // Centro poblado
      hoja.getCell(`I${baseRow + 1}`).value = datos[8];  // Edad
      //espacio vacio
      hoja.getCell(`M${baseRow + 1}`).value = datos[10]; // Perímetro cefálico
      hoja.getCell(`M${baseRow + 3}`).value = datos[11]; // Perímetro abdominal
      hoja.getCell(`O${baseRow + 1}`).value = datos[12]; // Peso
      hoja.getCell(`O${baseRow + 2}`).value = datos[13]; // Talla
      hoja.getCell(`O${baseRow + 4}`).value = datos[14]; // HB
      
      hoja.getCell(`S${baseRow + 1}`).value = diagnosticos[0] || "";
      hoja.getCell(`Z${baseRow + 1}`).value = codigos[0] || "";
      hoja.getCell(`S${baseRow + 2}`).value = diagnosticos[1] || "";
      hoja.getCell(`Z${baseRow + 2}`).value = codigos[1] || "";
      hoja.getCell(`S${baseRow + 4}`).value = diagnosticos[2] || "";
      hoja.getCell(`Z${baseRow + 4}`).value = codigos[2] || "";
  }
  // ========================
  
    // GENERAR Y DESCARGAR EL EXCEL
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "nuevo_HIS.xlsx";
    link.click();
    URL.revokeObjectURL(link.href);

    console.log("Archivo generado exitosamente");
  } catch (error) {
    console.error("Error al generar el archivo Excel:", error);
    alert("Error al generar el archivo.");
  }
});
