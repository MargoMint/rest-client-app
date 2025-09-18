'use client';

import { ToastContainer, toast } from 'react-toastify';
import { Button } from '@/components/ui/button';

function Toast() {
  const showSuccess = () => toast.success('Success!');
  const showError = () => toast.error('Error!');
  const showInfo = () => toast.info('Some info...');
  const showWarning = () => toast.warn('Warning!');
  const showDefault = () => toast('Default notification');

  return (
    <div className="flex items-start gap-2">
      <Button onClick={showSuccess} variant="default">
        Show Success
      </Button>
      <Button onClick={showError} variant="default">
        Show Error
      </Button>
      <Button onClick={showInfo} variant="default">
        Show Info
      </Button>
      <Button onClick={showWarning} variant="default">
        Show Warning
      </Button>
      <Button onClick={showDefault} variant="default">
        Show Default
      </Button>
      <ToastContainer />
    </div>
  );
}

export default Toast;
