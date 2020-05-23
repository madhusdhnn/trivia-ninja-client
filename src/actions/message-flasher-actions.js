import {FLASH_ERROR, FLASH_NOTICE, FLASH_WARNING, REMOVE_FLASH} from './action-types';

const flashWarning = message => {
   return {
      type: FLASH_WARNING,
      message: message
   };
};

const flashError = message => {
   return {
      type: FLASH_ERROR,
      message: message
   };
};

const flashNotice = message => {
   return {
      type: FLASH_NOTICE,
      message: message
   };
};

const removeFlash = () => {
   return {
      type: REMOVE_FLASH
   };
};

export {flashWarning, flashError, flashNotice, removeFlash};
