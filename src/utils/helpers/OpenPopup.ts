let windowObjectReference: Window | null;
let previousUrl: string;

export const openSignInWindow = (url: string, name: string, receiveMessage: (event: MessageEvent) => void) => {
   // remove any existing event listeners
   window.removeEventListener('message', receiveMessage);

   // window features
   const strWindowFeatures =
     'popup=yes, toolbar=no, menubar=no, width=600, height=700, top=100, left=100';

   if (!windowObjectReference || windowObjectReference.closed) {
     /* if the pointer to the window object in memory does not exist
      or if such pointer exists but the window was closed */
     windowObjectReference = window.open(url, name, strWindowFeatures);
   } else if (previousUrl !== url) {
     /* if the resource to load is different,
      then we load it in the already opened secondary window and then
      we bring such window back on top/in front of its parent window. */
     windowObjectReference = window.open(url, name, strWindowFeatures);
     windowObjectReference && windowObjectReference.focus();
   } else {
     /* else the window reference must exist and the window
      is not closed; therefore, we can bring it back on top of any other
      window with the focus() method. There would be no need to re-create
      the window or to reload the referenced resource. */
     windowObjectReference.focus();
   }

   // add the listener for receiving a message from the popup
   window.addEventListener('message', event => receiveMessage(event), false);
   // assign the previous URL
   previousUrl = url;
 };
