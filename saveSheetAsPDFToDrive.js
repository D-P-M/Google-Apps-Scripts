/*
This script saves all sheet in a Google Sheet as a PDF to Google Drive
*/


function saveSheetsToDrive() {

    const SS = SpreadsheetApp.getActiveSpreadsheet();
    const SSID = SS.getId();
    const driveID = "put drive ID here!";
  
    let name = SpreadsheetApp.getActiveSpreadsheet().getName();
  
    const portrait = true;
    const size = 'a4';
    const align = 'CENTER';
    const topMargin = 0.75;
    const bottomMargin = 0.75;
    const leftMargin = 0.25;
    const rightMargin = 0.25;
    const gridlines = false;
    const scale = 4;
    const printnotes = false;
    
    let blob = getFileAsBlob("https://docs.google.com/spreadsheets/d/"+SSID+"/export?format=pdf&portrait="+portrait
                                                                                              +"&size="+size
                                                                                              +"&horizontal_alignment="+align
                                                                                              +"&top_margin="+topMargin
                                                                                              +"&bottom_margin="+bottomMargin
                                                                                              +"&left_margin="+leftMargin
                                                                                              +"&right_margin="+rightMargin
                                                                                              +"&gridlines="+gridlines
                                                                                              +"&scale="+scale
                                                                                              +"&printnotes="+printnotes
                                                                                              +"&selection=true");
  
    blob.setName(name)
    let file = DriveApp.getFolderById(driveID).createFile(blob);
    Logger.log(file.getUrl());
  
  }
  