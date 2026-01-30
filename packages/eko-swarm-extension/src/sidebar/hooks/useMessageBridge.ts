import { useState, useEffect, useCallback } from 'react';

export const useMessageBridge = () => {
  const [lastMessage, setLastMessage] = useState<any>(null);

  useEffect(() => {
    const listener = (message: any, sender: any, sendResponse: any) => {
      setLastMessage(message);
      // Handle messages from background if needed
    };

    // @ts-ignore
    if (typeof chrome !== 'undefined' && chrome.runtime) {
      // @ts-ignore
      chrome.runtime.onMessage.addListener(listener);
      // @ts-ignore
      return () => chrome.runtime.onMessage.removeListener(listener);
    }
  }, []);

  const sendMessage = useCallback((message: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      if (typeof chrome !== 'undefined' && chrome.runtime) {
        // @ts-ignore
        chrome.runtime.sendMessage(message, (response: any) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(response);
          }
        });
      } else {
        console.warn('Chrome runtime not available');
        resolve(null);
      }
    });
  }, []);

  return { sendMessage, lastMessage };
};
