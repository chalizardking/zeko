import './polyfills';
import { AgentHost } from './agent-host';

console.log('Eko Swarm Extension: Background Service Worker Active');

// Initialize Agent Host
const agentHost = AgentHost.getInstance();

// Open side panel when extension icon is clicked
// @ts-ignore
if (chrome && chrome.sidePanel) {
  // @ts-ignore
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
}

// Listen for messages
// @ts-ignore
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  agentHost.handleMessage(message).then(sendResponse);
  return true; // Keep message channel open for async response
});
