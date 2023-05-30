import { bindActionCreators } from "redux";
import * as authActions from "../store/actions/authAction";
import * as userActions from "../store/actions/usersAction";
import { useAppDispatch } from "./useTypedSelector";

const rootActions = {
  ...authActions,
  ...userActions,
};

export const useActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(rootActions, dispatch);
};
