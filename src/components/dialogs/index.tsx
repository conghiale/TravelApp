// GlobalDialog.tsx
import React from 'react';
import DialogNotification from '@/components/customAler/dialogNotification/DialogNotification';

const GlobalDialog = ({ dialog, handleClose, handleOk }: DialogProps) => {
  return (
    <>
      <DialogNotification
        status='success'
        displayMode='SUCCESS'
        displayMsg={dialog.message}
        visible={dialog.type === 'success'}
        onDimissAlert={handleClose}
        onHandlerActionOK={handleOk}
      />
      <DialogNotification
        status='error'
        displayMode='ERROR'
        displayMsg={dialog.message}
        visible={dialog.type === 'error'}
        onDimissAlert={handleClose}
        onHandlerActionOK={handleOk}
      />
    </>
  );
};

export default GlobalDialog;
