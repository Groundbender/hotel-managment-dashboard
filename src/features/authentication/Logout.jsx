import ButtonIcon from "../../ui/ButtonIcon";

import { FiLogOut } from "react-icons/fi";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";
const Logout = () => {
  const { logout, isLoading } = useLogout();

  return (
    <ButtonIcon disabled={isLoading} onClick={logout}>
      {!isLoading ? <FiLogOut /> : <SpinnerMini />}
    </ButtonIcon>
  );
};

export default Logout;
