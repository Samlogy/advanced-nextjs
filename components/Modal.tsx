import ReactDOM from 'react-dom';
import { MdOutlineClose } from 'react-icons/md';

interface IModal {
  isOpen: boolean;
  onClose: any;
  header?: any;
  body?: any;
  footer?: any;
}
export default function Modal({
  isOpen,
  onClose,
  header,
  body,
  footer,
}: IModal) {
  if (isOpen)
    return ReactDOM.createPortal(
      <div className="modal--overlay" onClick={onClose}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <span className="modal--close" onClick={onClose}>
            <MdOutlineClose color="black" size={24} />
          </span>
          <div className="modal--content">
            {header && <div className="modal--header">{header}</div>}
            {body && <div className="modal--body">{body}</div>}
            {footer && <div className="modal--footer"> {footer} </div>}
          </div>
        </div>
      </div>,
      document.body
    );
  return null;
}
