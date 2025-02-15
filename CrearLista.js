document.getElementById("btnGenerarExcelTabla").addEventListener("click", async () => {
    try {
        const workbook = new ExcelJS.Workbook();
        const response = await fetch("https://juanjonav.github.io/plantillas-excel/lista.xlsx");
        const arrayBuffer = await response.arrayBuffer();
        await workbook.xlsx.load(arrayBuffer); // Cargar el archivo en el Workbook
        // Obtener la primera hoja
        const hoja = workbook.getWorksheet('Hoja1');
        // Obtener todas los datos de la tabla
        const tabla = document.getElementById("tablaPacientesBody");
        const filas = tabla.querySelectorAll("tr");
        const totalFilas = filas.length;
        for (let i = 0; i < Math.min(totalFilas, 25); i++) {
            const fila = filas[i];
            const celdas = fila.querySelectorAll("td");
            const datos = Array.from(celdas).map(td => td.textContent.trim());
            const baseRow = 3 + i; // Ahora inicia en fila 3 y aumenta de 1 en 1
            hoja.getCell(`A${baseRow}`).value = datos[1];  // Día
            hoja.getCell(`B${baseRow}`).value = datos[2];  // DNI
            hoja.getCell(`C${baseRow}`).value = datos[3];  // Historia clínica
            hoja.getCell(`E${baseRow}`).value = datos[0];  // Nombre
            hoja.getCell(`Y${baseRow}`).value = datos[15] || "";  // Diagnóstico 1
        }
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        // Descargar el archivo generado
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "lista.xlsx";
        link.click();
        // Liberar el objeto URL
        URL.revokeObjectURL(link.href);
        console.log("Archivo generado exitosamente");
    } catch (error) {
        console.error("Error al generar el archivo Excel:", error);
        alert("Error al generar el archivo. Revisa la consola para más detalles.");
    }
  });