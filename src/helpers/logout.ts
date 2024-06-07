import Cookies from "js-cookie";
import store, { persistor } from "../redux/store";
import { unSetCredentials } from "../redux/slices/auth";

export function Logout() {
  window.location.reload();
  Cookies.remove("key");
  store.dispatch(unSetCredentials());
  localStorage.clear();
  persistor.purge();

}
