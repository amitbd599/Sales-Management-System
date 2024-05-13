import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/helper";

const BaseURL = "http://localhost:5000/api/v1";
// const BaseURL = "https://invoice-mern.vercel.app/api/v1";

export const verify__Request__API = async () => {
  let URL = BaseURL + "/verify";

  try {
    const result = await axios.get(URL, { withCredentials: true });
    if (result.status === 200) {
      if (result.data["status"] === "success") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    ErrorToast("Token expired! Please sign in again.");
    return false;
  }
};
export const login__Request__API = async (postBody) => {
  let URL = BaseURL + "/login";

  try {
    const result = await axios.post(URL, postBody, { withCredentials: true });
    if (result.status === 200) {
      if (result.data["status"] === "success") {
        SuccessToast("Login Success!");
        return true;
      } else if (result.data["status"] === "unauthorized") {
        ErrorToast("Email or password not match!");
        return false;
      }
    } else {
      console.log("Login fail!-2");
      return false;
    }
  } catch (err) {
    ErrorToast("Login fail!");
    return false;
  }
};


export const profile__get__Request__API = async () => {
  let URL = BaseURL + "/profile-read";

  try {
    const result = await axios.get(URL, { withCredentials: true });
    if (result.status === 200) {
      if (result.data["status"] === "success") {
        return result.data;
      } else {
        console.log("profile get fail!-1");
        return false;
      }
    } else {
      console.log("profile get fail!-2");
      return false;
    }
  } catch (err) {
    console.log("profile get fail!");
    return false;
  }
};


export const profile_update__Request__API = async (postBody) => {
  let URL = BaseURL + "/profile-update";

  try {
    const result = await axios.post(URL, postBody, { withCredentials: true });
    if (result.status === 200) {
      if (result.data["status"] === "success") {

        return true;
      } else if (result.data["status"] === "error") {
        ErrorToast("Current password not match!");
        return false;
      }
    } else {
      console.log("profile update fail!-2");
      return false;
    }
  } catch (err) {
    ErrorToast("profile update fail!");
    return false;
  }
};
export const logout__Request__API = async () => {
  let URL = BaseURL + "/logout";

  try {
    const result = await axios.get(URL, { withCredentials: true, credentials: "include", });
    if (result.status === 200) {
      if (result.data["status"] === "success") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    ErrorToast("Something went wrong!");
    return false;
  }
};

export const forgot_password__Request__API = async (email) => {
  let URL = BaseURL + `/forgot-password/${email}`;

  try {
    const result = await axios.post(URL, { withCredentials: true });
    if (result.status === 200) {
      if (result.data["status"] === "success") {
        SuccessToast("OTP send success!");
        return true;
      } else {
        ErrorToast("OTP send fail!");
        return false;
      }
    } else {
      ErrorToast("OTP send fail!");
      return false;
    }
  } catch (err) {
    ErrorToast("OTP send fail!");
    return false;
  }
};
export const otp__Request__API = async (email, otp) => {
  let URL = BaseURL + `/otp-verify/${email}/${otp}`;

  try {
    const result = await axios.post(URL, { withCredentials: true });
    if (result.status === 200) {
      if (result.data["status"] === "success") {
        SuccessToast("OTP verify success!");
        return true;
      } else {
        ErrorToast("OTP verify fail!");
        return false;
      }
    } else {
      ErrorToast("OTP verify fail!");
      return false;
    }
  } catch (err) {
    ErrorToast("OTP verify fail!");
    return false;
  }
};

export const reset_password__Request__API = async (email, otp, password) => {
  let URL = BaseURL + `/reset-password/${email}/${otp}`;

  try {
    const result = await axios.post(URL, { password }, { withCredentials: true });
    if (result.status === 200) {
      if (result.data["status"] === "success") {
        SuccessToast("Password change success!");
        return true;
      } else {
        ErrorToast("Password change fail!");
        return false;
      }
    } else {
      ErrorToast("Password change fail!");
      return false;
    }
  } catch (err) {
    ErrorToast("Password change fail!");
    return false;
  }
};

export const setting__update__Request__API = async (postBody) => {
  let URL = BaseURL + "/setting";

  try {
    const result = await axios.post(URL, postBody, { withCredentials: true });
    if (result.status === 200) {
      if (result.data["status"] === "success") {
        SuccessToast("Setting Update Success!");
        return true;
      } else {
        ErrorToast("Setting update fail!");
        return false;
      }
    } else {
      ErrorToast("Setting update fail!");
      return false;
    }
  } catch (err) {
    ErrorToast("Setting update fail!");
    return false;
  }
};
export const setting__get__Request__API = async () => {
  let URL = BaseURL + "/setting_read";

  try {
    const result = await axios.get(URL, { withCredentials: true });
    if (result.status === 200) {
      if (result.data["status"] === "success") {
        return result.data;
      } else {
        console.log("Setting Get fail!-1");
        return false;
      }
    } else {
      console.log("Setting Get fail!-2");
      return false;
    }
  } catch (err) {
    console.log("Setting Get fail!");
    return false;
  }
};

export const create__invoice__Request__API = async (postBody) => {
  let URL = BaseURL + "/create-invoice";

  try {
    const result = await axios.post(URL, postBody, { withCredentials: true });
    if (result.status === 200) {
      if (result.data["status"] === "success") {
        SuccessToast("Invoice create success!");
        return true;
      } else {
        ErrorToast("Invoice create fail!");
        return false;
      }
    } else {
      ErrorToast("Invoice create fail!");
      return false;
    }
  } catch (err) {
    ErrorToast("Invoice create fail!");
    return false;
  }
};

export const invoice_read_single__get__Request__API = async (id) => {
  let URL = BaseURL + `/read-single/${id}`;

  try {
    const result = await axios.get(URL, { withCredentials: true });
    if (result.status === 200) {
      if (result.data["status"] === "success") {
        return result.data;
      } else {
        console.log("Invoice get fail!-1");
        return false;
      }
    } else {
      console.log("Invoice get fail!-2");
      return false;
    }
  } catch (err) {
    console.log("Invoice get fail!");
    return false;
  }
};

export const invoice_all__get__Request__API = async () => {
  let URL = BaseURL + "/read-all";

  try {
    const result = await axios.get(URL, { withCredentials: true });
    if (result.status === 200) {
      if (result.data["status"] === "success") {
        return result.data;
      } else {
        console.log("Invoice get fail!-1");
        return false;
      }
    } else {
      console.log("Setting get fail!-2");
      return false;
    }
  } catch (err) {
    console.log("Setting get fail!");
    return false;
  }
};

export const invoice_single_delete__Request__API = async (id) => {
  let URL = BaseURL + `/delete_single/${id}`;

  try {
    const result = await axios.delete(URL, { withCredentials: true });
    if (result.status === 200) {
      if (result.data["status"] === "success") {
        SuccessToast("Delete success!");
        return true;
      } else {
        ErrorToast("Delete fail!");
        return false;
      }
    } else {
      console.log("Delete fail!");
      return false;
    }
  } catch (err) {
    console.log("Delete fail!");
    return false;
  }
};

export const invoice_update__Request__API = async (id, postBody) => {
  let URL = BaseURL + `/update_single/${id}`;

  try {
    const result = await axios.post(URL, postBody, { withCredentials: true });
    if (result.status === 200) {
      if (
        result.data["status"] === "success" &&
        result.data?.data["modifiedCount"] === 1
      ) {
        SuccessToast("Update success!");
        return true;
      } else {
        ErrorToast("Update fail!");
        return false;
      }
    } else {
      ErrorToast("Update fail!");
      return false;
    }
  } catch (err) {
    ErrorToast("Update fail!");
    return false;
  }
};

export const dashboard__Request__API = async () => {
  let URL = BaseURL + `/get-dashboard-data`;

  try {
    const result = await axios.get(URL, { withCredentials: true });
    if (result.status === 200) {
      if (
        result.data["status"] === "success"
      ) {

        return result.data["data"];
      } else {

        return false;
      }
    } else {

      return false;
    }
  } catch (err) {
    return false;
  }
};
