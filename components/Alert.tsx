import { useEffect, useState } from 'react';
import {
  MdCheckCircle,
  MdError,
  MdInfo,
  MdOutlineClose,
  MdWarning,
} from 'react-icons/md';

interface IAlert {
  status: string;
  message: string;
  isClose?: boolean;
  timeClose?: number;
}

export default function Alert({
  status,
  message,
  isClose = true,
  timeClose = 1000,
}: IAlert) {
  const [isOpen, setOpen] = useState(true);

  const statusIcons: any = {
    success: <MdCheckCircle size={24} onClick={() => setOpen(false)} />,
    error: <MdError size={24} onClick={() => setOpen(false)} />,
    warning: <MdWarning size={24} onClick={() => setOpen(false)} />,
    info: <MdInfo size={24} onClick={() => setOpen(false)} />,
  };

  useEffect(() => {
    // close after a delay
    if (isOpen) setTimeout(() => setOpen(false), timeClose);
  }, []);

  if (isOpen) {
    return (
      <div className={`alert--container ${status}`}>
        <div>{statusIcons[status]}</div>
        <p className="alert--message"> {message} </p>
        {isClose && (
          <MdOutlineClose
            className="alert--close"
            onClick={() => setOpen(false)}
          />
        )}
      </div>
    );
  }
  return null;
}
