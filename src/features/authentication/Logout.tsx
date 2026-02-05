import { useLogout } from "./useLogout";
import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";
import { HiArrowRightOnRectangle } from "react-icons/hi2";

function Logout() {
  const { logout, isLogingout } = useLogout();

  return (
    <ButtonIcon onClick={() => logout()} disabled={isLogingout}>
      {isLogingout ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}

export default Logout;
