import {
  createContext,
  useContext,
  useState,
  cloneElement,
  type Ref,
} from "react";
import type { ReactNode, ReactElement } from "react";
import { useCloseOnEscapeAndOutsideClick } from "../hooks/useCloseOnEscapeAndOutsideClick";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

interface ModalContextType {
  openModal: (name: string) => void;
  closeModal: () => void;
  openName: string;
}

interface ModalType {
  children: ReactNode;
}

interface OpenProps {
  children: ReactElement;
  opens: string;
}

interface WindowProps {
  children: ReactElement;
  name: string;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useModal() {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("useModal must be used within a Modal component");
  return context;
}

function Modal({ children }: ModalType) {
  const [openName, setOpenName] = useState("");
  const openModal = (name: string) => setOpenName(name);
  const closeModal = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openModal, closeModal, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }: OpenProps) {
  const { openModal } = useModal();

  return cloneElement(children, { onClick: () => openModal(opensWindowName) });
}

function Window({ children, name }: WindowProps) {
  const { openName, closeModal } = useModal();
  const ref = useCloseOnEscapeAndOutsideClick(closeModal);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref as Ref<HTMLDivElement>}>
        <Button onClick={closeModal}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: closeModal })}</div>
      </StyledModal>
    </Overlay>,
    // document.querySelector()
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
