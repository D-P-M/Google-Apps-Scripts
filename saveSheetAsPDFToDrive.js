/*
This script saves all sheet in a Google Sheet as a PDF to Google Drive
*/


function saveSheetsToDrive() {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const spreadsheetId = spreadsheet.getId();
    const driveFolderId = "Drive ID goes here!";
    const fileName = spreadsheet.getName();
  
    const pdfOptions = {
      portrait: true,
      size: 'a4',
      horizontal_alignment: 'CENTER',
      top_margin: 0.75,
      bottom_margin: 0.75,
      left_margin: 0.25,
      right_margin: 0.25,
      gridlines: false,
      scale: 4,
      printnotes: false,
      selection: true
    };
  
    const pdfBlob = getFileAsBlob(`https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=pdf&${Object.entries(pdfOptions).map(([k, v]) => `${k}=${v}`).join('&')}`);
    pdfBlob.setName(fileName);
  
    const folder = DriveApp.getFolderById(driveFolderId);
    const file = folder.createFile(pdfBlob);
    Logger.log(file.getUrl());
  }
  
  
  
  
  
  