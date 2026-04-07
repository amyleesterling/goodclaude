// ABOUTME: Electron preload bridge exposing IPC channels for the sparkle wand overlay
// ABOUTME: Connects renderer (overlay.html) to main process (main.js) via secure context bridge
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('bridge', {
  sendBlessing: () => ipcRenderer.send('send-blessing'),
  hideOverlay: () => ipcRenderer.send('hide-overlay'),
  onSpawnWand: (fn) => ipcRenderer.on('spawn-wand', () => fn()),
  onDropWand: (fn) => ipcRenderer.on('drop-wand', () => fn()),
  onBlessingSent: (fn) => ipcRenderer.on('blessing-sent', (_event, data) => fn(data)),
  onJournalData: (fn) => ipcRenderer.on('journal-data', (_event, data) => fn(data)),
});
