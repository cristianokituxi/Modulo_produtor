
import SideBar from "../components/SideBar";
import { useAuthContext } from "../context/auth/AuthContext.ts";
import { Navigate } from "react-router-dom";

interface Props {
  children?: React.ReactNode,

}


const PrivateRoutes = (props: Props) => {
  const { user } = useAuthContext();
  console.log(user);
  return user
    ? <SideBar>{props.children}</SideBar> : <Navigate to="/" />
};
export default PrivateRoutes;
