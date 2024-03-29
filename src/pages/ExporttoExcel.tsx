import * as XLSX from "xlsx";
import React from 'react';

const ExporttoExcel=(data:any)=> {
         
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(data);

        XLSX.utils.book_append_sheet(wb, ws, "newInvoices");
        XLSX.utils.book_append_sheet(wb, ws, "new2Invoices");
        

        XLSX.writeFile(wb, "SupplemetaryInvoices.xlsx");
    }

export default ExporttoExcel;