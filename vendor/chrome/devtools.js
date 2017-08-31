import PluginStorage from './PluginStorage';
import {RemoteStorageServer} from './RemoteStorage';

const panel = chrome.devtools.panels.create('Stackdriver Trace',
  'stackdriver_icon.png',
  'panel.html',
  panel => {
  }
);
