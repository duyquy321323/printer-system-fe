const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
const SELECT_FILE = "SELECT_FILE";

export const loginAction = (data) => {
  return {
    type: LOGIN_SUCCESS,
    data: data,
  };
};

export const logoutAction = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const accountAction = (state = null, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.data;
    case LOGOUT_SUCCESS:
      return null;
    default:
      return state;
  }
};

export const selectFiles = (files) => {
  return {
    type: SELECT_FILE,
    data: files,
  };
};

export const filesAction = (state = [], action) => {
  switch (action.type) {
    case SELECT_FILE:
      return action.data;
    default:
      return state;
  }
};

export function openUpload() {
    return {
      type: "OPENUPLOAD",
    };
  }
  
  export function closeUpload() {
    return {
      type: "CLOSEUPLOAD",
    };
  }

  export function uploadFormAction(state = false, action) {
    switch (action.type) {
      case "OPENUPLOAD":
        return true;
      case "CLOSEUPLOAD":
        return false;
      default:
        return state;
    }
  }

  export const openBackDrop = () => {
    return {
      type: 'OPENBACKDROP',
    }
  }
  
  export const closeBackDrop = () => {
    return {
      type: 'CLOSEBACKDROP',
    }
  }
  
  export const backdropAction = (state = false, action) => {
    switch (action.type) {
      case "OPENBACKDROP":
        return true;
        case "CLOSEBACKDROP":
          return false;
      default:
        return state;
    }
  }