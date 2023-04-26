
//This function resets all tab colors in a spreadsheet

function resetTabColors() {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheets = spreadsheet.getSheets();
    for (var i = 0; i < sheets.length; i++) {
      var sheet = sheets[i];
      sheet.setTabColor(null);
    }
  }