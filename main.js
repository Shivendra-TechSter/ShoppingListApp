const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow,Menu,ipcMain} = electron;

let mainWindow;
let addWindow;

app.on('ready',function(){
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    // quit app when main window is closed
mainWindow.on('closed',function(){
    app.quit();
});

    // build menu from template
const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
// insert menu
Menu.setApplicationMenu(mainMenu);
});

// handle create add window
function createAddWindow(){
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add Shoping List Item'
    });
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname,'addWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    // garbage Collection
    addWindow.on('close',function(){
        addWindow = null;
    });
}

// catch item:add
ipcMain.on('item:add',function(e,item){
    console.log(item);
    mainWindow.webContents.send('item:add',item);
});


// Create menu tepmlate
const mainMenuTemplate = [
    {
        label:'File',
        submenu:[
            {
                label:'Add item',
                click(){
                    createAddWindow();
                }
            },
            {
                label:'Clear items',
                click(){
                    mainWindow.webContents.send('item:clear');
                }
            },
            {
                label:'Quit',
                accelerator: 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];