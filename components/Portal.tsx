import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

export default function Portal({ children }: { children: ReactNode }) {
  return ReactDOM.createPortal(<>{children}</>, document.body);
}
