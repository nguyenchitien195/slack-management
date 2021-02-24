import { getFiles } from './../services/service';
import { createSlice } from "@reduxjs/toolkit";

interface IFile {
  id: string;
  created: number;
  timestamp: number;
  name: string;
  title: string;
  mimetype: string;
  filetype: string;
  pretty_type: string;
  user: string;
  editable: boolean;
  size: number;
  mode: string;
  is_external: boolean;
  external_type: string;
  is_public: true;
  public_url_shared: boolean;
  display_as_bot: boolean;
  username: string;
  url_private: string;
  url_private_download: string;
  thumb_64: string;
  thumb_80: string;
  thumb_360: string;
  thumb_360_w: number;
  thumb_360_h: number;
  thumb_480: string;
  thumb_480_w: number;
  thumb_480_h: number;
  thumb_160: string;
  thumb_720: string;
  thumb_720_w: number;
  thumb_720_h: number;
  thumb_800: string;
  thumb_800_w: number;
  thumb_800_h: number;
  image_exif_rotation: number;
  original_w: number;
  original_h: number;
  permalink: string;
  permalink_public: string;
  channels: string[];
  groups: [];
  ims: [];
  comments_count: number;
}

interface IFileState {
  isLoading: boolean;
  isLoadedFirstTime: boolean;
  error: string;
  files: IFile[];
  total: number;
}

var initValue: IFileState = {
  isLoading: false,
  isLoadedFirstTime: false,
  error: "",
  files: [],
  total: 0,
};

const fileSlice = createSlice({
  initialState: initValue,
  name: "files",
  reducers: {
    loadingFirstTime: (state) => {
      return { ...state, isLoading: true, isLoadedFirstTime: true };
    },
    getFirstTime: (state, action) => {
      return {
        ...state,
        isLoading: false,
        files: action.payload.files,
        total: action.payload.total,
        error: "",
      };
    },
    getNextTime: (state, action) => {
      return {
        ...state,
        files: [...state.files, ...action.payload],
        error: "",
      };
    },
    error: (state, action) => {
      return { ...state, isLoading: false, error: action.payload };
    },
  },
});

export const { loadingFirstTime, error, getFirstTime, getNextTime } = fileSlice.actions;

export const getFileFirstTime = (token: string) => async (dispatch: any) => {
  dispatch(loadingFirstTime());
  try {
    const result = await getFiles(token);
    if (!result.ok) {
      dispatch(error('Something went wrong'));
    } else {
      const payload = {files: result.files, total: result.paging.total};
      dispatch(getFirstTime(payload));
    }
  } catch (err) {
    dispatch(error(err));
  }
};

// export const getFileNextTime = (token: string, page: number) => {

// }

export default fileSlice;
