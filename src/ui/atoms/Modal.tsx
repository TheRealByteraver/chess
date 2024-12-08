import { useRef, useEffect } from 'react';

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
};

const Modal = (props: Props) => {
  // PROPS
  const { isOpen, children } = props;

  // HOOKS
  const dialogRef = useRef<HTMLDialogElement>(null);

  // EFFECTS
  useEffect(() => {
    if (isOpen) showModal();
    else closeModal();
  }, [isOpen]);

  // METHODS
  const showModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();

  if (!dialogRef) return null;

  return (
    <dialog ref={dialogRef} className="rounded p-4">
      {children}
    </dialog>
  );
};

export default Modal;
