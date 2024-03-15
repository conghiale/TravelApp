// GlobalDialog.tsx
import React from 'react';
import DialogNotification from '@/components/customAler/dialogNotification/DialogNotification';
import useUserGlobalStore from '@/store/useUserGlobalStore';
import { labelEn, labelVi } from '@/utils/label';

const GlobalDialog = ({ dialog, handleClose, handleOk }: DialogProps) => {
  const {user} = useUserGlobalStore();
  const bilingual = user?.language === 'EN' ? labelEn : labelVi;
  
  return (
    <>
      <DialogNotification
        status='success'
        displayMode='SUCCESS'
        displayMsg={dialog.message}
        visible={dialog.type === 'success'}
        onDimissAlert={handleClose}
        onHandlerActionOK={handleOk}
        okLabel={bilingual.DIALOG.OK}
        cancelLabel={bilingual.DIALOG.CANCEL}
      />
      <DialogNotification
        status='error'
        displayMode='ERROR'
        displayMsg={dialog.message}
        visible={dialog.type === 'error'}
        onDimissAlert={handleClose}
        onHandlerActionOK={handleOk}
        okLabel={bilingual.DIALOG.OK}
        cancelLabel={bilingual.DIALOG.CANCEL}
      />
    </>
  );
};

export default GlobalDialog;
