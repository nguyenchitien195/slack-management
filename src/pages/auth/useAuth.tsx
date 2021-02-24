import { useSelector, useDispatch } from "react-redux";
import { success } from "../../redux/authSlice";
import { getCookie } from "../../util/handleCookie";

const useAuth = () => {
  const auth = useSelector((state: any) => state.auth.auth);
  const dispatch = useDispatch();
  let isAuthenticated = false;

  if (auth) {
    isAuthenticated = true;
  } else if (getCookie("auth")) {
    const authCookie = getCookie("auth");
    dispatch(success(JSON.parse(decodeURIComponent(authCookie))));
    isAuthenticated = true;
  }

  return { isAuthenticated };
};

export default useAuth;
