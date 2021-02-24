import { postAuthentication, getUserInfo } from "./../services";
import { createSlice } from "@reduxjs/toolkit";
import { emptyCookie, setCookie } from "../util/handleCookie";

interface IAuth {
  isLoading: boolean;
  error: string;
  auth: {
    ok: boolean;
    app_id: string;
    authed_user: {
      id: string;
      scope: string;
      access_token: string;
      token_type: string;
    };
    team: {
      id: string;
    };
    enterprise: null;
    is_enterprise_install: boolean;
  } | null;
  token: string;
  user: Object | null;
}

var initValue: IAuth = {
  isLoading: false,
  auth: null,
  token: "",
  error: "",
  user: null,
};

const authSlice = createSlice({
  initialState: initValue,
  name: "auth",
  reducers: {
    loading: (state) => {
      return { ...state, isLoading: true };
    },
    success: (state, action) => {
      return {
        ...state,
        isLoading: false,
        auth: action.payload,
        token: action.payload.authed_user.access_token,
        error: "",
      };
    },
    error: (state, action) => {
      return { ...state, isLoading: false, error: action.payload };
    },
    signOut: (state) => {
      return { ...state, auth: null, user: null };
    },
    setUserInfo: (state, action) => {
      return { ...state, user: action.payload };
    },
  },
});

export const {
  loading,
  success,
  error,
  signOut,
  setUserInfo,
} = authSlice.actions;

export const authAction = (params: any) => async (dispatch: any) => {
  dispatch(loading());
  try {
    const result = await postAuthentication(params);
    if (result.data.ok === false && result.data.error) {
      dispatch(error(result.data.error));
    } else {
      setCookie("auth", encodeURIComponent(JSON.stringify(result.data)));
      dispatch(success(result.data));
    }
  } catch (err) {
    dispatch(error(err));
  }
};

export const getUserInfoAction = (token: string, userId: string) => async (
  dispatch: any,
) => {
  try {
    const result = await getUserInfo(token, userId);
    dispatch(setUserInfo(result.user));
  } catch (err) {
    dispatch(error(err));
  }
};

export const signOutAction = () => (dispatch: any) => {
  emptyCookie();
  dispatch(signOut());
};

export default authSlice;
