function sidebarMenu() {
    SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
        .createMenu('Sidebar')
        .addItem('Show sidebar', 'showSidebar')
        .addToUi();
  }
  
  function showSidebar() {
    var html = HtmlService.createHtmlOutputFromFile('customSidebar')
        .setTitle('My custom sidebar');
    SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
        .showSidebar(html);
  }