// GlobalDialog.tsx
import React, { useState } from 'react';
import DialogNotification from '@/components/customAler/dialogNotification/DialogNotification';

type DialogProps = {
    dialogType: string
    dialogMessage: string
    handleClose: () => void
    handleOk: () => void
}

const GlobalDialog = ({ dialogType, dialogMessage, handleClose, handleOk }: DialogProps) => {

  return (
    <>
      <DialogNotification
        status='success'
        displayMode='SUCCESS'
        displayMsg={dialogMessage}
        visible={dialogType === 'success'}
        onDimissAlert={handleClose}
        onHandlerActionOK={handleOk}
      />
      <DialogNotification
        status='error'
        displayMode='ERROR'
        displayMsg={dialogMessage}
        visible={dialogType === 'error'}
        onDimissAlert={handleClose}
        onHandlerActionOK={handleOk}
      />
    </>
  );
};

export default GlobalDialog;
