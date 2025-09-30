import { Component, Input } from '@angular/core';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-export-button',
  imports: [

  ],
  templateUrl: './export-button.html',
  styleUrl: './export-button.css'
})
export class ExportButton {

  @Input() tableData!: any;

  exportToCSV() {
    const csvData = this.convertToCSV(this.tableData);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tabla-datos.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  convertToCSV(data: any[]): string {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(','));
    return [headers, ...rows].join('\n');
  }


  exportToExcel() {
    // const ws = XLSX.utils.json_to_sheet(this.tableData.data);
    const ws = XLSX.utils.json_to_sheet(this.tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');
    XLSX.writeFile(wb, 'tabla-datos.xlsx');
  }

  // exportToPDF() {
  //   const doc = new jsPDF();
  //   const headers = Object.keys(this.tableData.data[0]);
  //   const data = this.tableData.data.map(
  //     (row: any) => Object.values(row)
  //   );
    
  //   autoTable(doc, {
  //     head: [headers],
  //     body: data,
  //   });
    
  //   doc.save('tabla-datos.pdf');
  // }

  exportToPDF() {
  // 'landscape' = horizontal | 'portrait' = vertical
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',      // puedo usar 'mm' o 'px'
    format: 'a4'    
  });

  const headers = Object.keys(this.tableData[0]);
  const data = this.tableData.data.map(
    (row: any) => Object.values(row));

  autoTable(doc, {
    head: [headers],
    body: data,
    startY: 40,
    styles: { fontSize: 8 }, // útil para muchas columnas
    headStyles: { fillColor: [41, 128, 185] }, // azul para encabezados
  });

  doc.save('tabla-datos.pdf');
}

}
