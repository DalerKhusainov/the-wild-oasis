import {
  type ReactNode,
  type MouseEvent,
  type Ref,
  createContext,
  useContext,
  useState,
  ReactElement,
} from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { HiEllipsisVertical } from "react-icons/hi2";
import { useCloseOnEscapeAndOutsideClick } from "../hooks/useCloseOnEscapeAndOutsideClick";

interface MenusContextType {
  openId: number | null;
  position: { x: number; y: number } | null;
  closeMenus: () => void;
  openMenus: (id: number | null) => void;
  getPosition: (positionX: number, positionY: number) => void;
}

interface MenusProps {
  children: ReactNode;
}

interface StyledListProps {
  position: {
    x: number;
    y: number;
  } | null;
}

interface ButtonProps {
  children: ReactNode;
  icon: ReactElement;
  onClick?: () => void;
}

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<StyledListProps>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position !== null && props.position.x}px;
  top: ${(props) => props.position !== null && props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext<MenusContextType | undefined>(undefined);

function useMenus() {
  const menusContext = useContext(MenusContext);
  if (!menusContext) throw new Error("useMenu must be used within Menus");
  return menusContext;
}

function Menus({ children }: MenusProps) {
  const [openId, setOpenId] = useState<number | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );

  const closeMenus = () => setOpenId(null);
  const openMenus = (id: number | null) => setOpenId(id);
  const getPosition = (positionX: number, positionY: number) =>
    setPosition({ x: positionX, y: positionY });

  return (
    <MenusContext.Provider
      value={{ openId, position, closeMenus, openMenus, getPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }: { id: number }) {
  const { openId, closeMenus, openMenus, getPosition } = useMenus();

  function handleClick(e: MouseEvent<HTMLElement>) {
    const target = e.target as HTMLElement;
    const button = target.closest("button");
    if (!button) return;
    const rect = button.getBoundingClientRect();

    const positionX = window.innerWidth - rect.width - rect.x;
    const positionY = rect.y + rect.height + 8;

    getPosition(positionX, positionY);

    openId === null || openId !== id ? openMenus(id) : closeMenus();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }: { id: number; children: ReactNode }) {
  const { openId, position, closeMenus } = useMenus();

  const listRef = useCloseOnEscapeAndOutsideClick(closeMenus);

  if (openId !== id) return null;

  return createPortal(
    <StyledList
      ref={listRef as Ref<HTMLUListElement>}
      position={position !== null ? position : null}
    >
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, icon, onClick }: ButtonProps) {
  const { closeMenus } = useMenus();

  function handleClick() {
    onClick?.();
    closeMenus();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
