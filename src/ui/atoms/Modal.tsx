import { useRef, useEffect } from 'react';

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
};

const Modal = (props: Props): JSX.Element | null => {
  // PROPS
  const { isOpen, children } = props;

  // HOOKS
  const dialogRef = useRef<HTMLDialogElement>(null);

  // METHODS
  const showModal = (): void => dialogRef.current?.showModal();
  const closeModal = (): void => dialogRef.current?.close();

  // EFFECTS
  useEffect(() => {
    if (isOpen) showModal();
    else closeModal();
  }, [isOpen]);

  if (!dialogRef) return null;

  return (
    <dialog ref={dialogRef} className="rounded p-4">
      {children}
    </dialog>
  );
};

export default Modal;
