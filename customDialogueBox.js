//Set up a trigger with sidebarMenu in order to initiate the menu of open/refresh

function sidebarMenu() {
    SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
        .createMenu('Custom Menu')
        .addItem('Show dialog', 'showDialog')
        .addToUi();
  }
  
  function showDialog() {
    var html = HtmlService.createHtmlOutputFromFile('customDialogue')
        .setWidth(400)
        .setHeight(300);
    SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
        .showModalDialog(html, 'My custom dialogue box!');
  }