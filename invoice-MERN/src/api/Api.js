import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/helper";

const BaseURL = "http://localhost:5000/api/v1";

export const login__Request__API = async (postBody) => {
  let URL = BaseURL + "/login";

  try {
    const result = await axios.post(URL, postBody, { withCredentials: true });
    if (result.status === 200) {
      if (result.data["status"] === "success") {
        SuccessToast("Login Success!");
        return true;
      } else {
        ErrorToast("Login Fail!-1");
        return false;
      }
    } else {
      ErrorToast("Login Fail!-2");
      return false;
    }
  } catch (err) {
    ErrorToast("Login Fail!");
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
        ErrorToast("OTP send Fail!-1");
        return false;
      }
    } else {
      ErrorToast("OTP send Fail!-2");
      return false;
    }
  } catch (err) {
    ErrorToast("OTP send Fail!");
    return false;
  }
};
export const otp__Request__API = async (email, otp) => {
  let URL = BaseURL + `/otp-verify/${email}/${otp}`;

  try {
    const result = await axios.post(URL, { withCredentials: true });
    if (result.status === 200) {
      if (result.data["status"] === "success") {
        SuccessToast("OTP send success!");
        return true;
      } else {
        ErrorToast("OTP send Fail!-1");
        return false;
      }
    } else {
      ErrorToast("OTP send Fail!-2");
      return false;
    }
  } catch (err) {
    ErrorToast("OTP send Fail!");
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
        ErrorToast("Password change Fail!-1");
        return false;
      }
    } else {
      ErrorToast("Password change Fail!-2");
      return false;
    }
  } catch (err) {
    ErrorToast("Password change Fail!");
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
        ErrorToast("Setting Update Fail!-1");
        return false;
      }
    } else {
      ErrorToast("Setting Update Fail!-2");
      return false;
    }
  } catch (err) {
    ErrorToast("Setting Update Fail!");
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
        ErrorToast("Setting Get Fail!-1");
        return false;
      }
    } else {
      ErrorToast("Setting Get Fail!-2");
      return false;
    }
  } catch (err) {
    ErrorToast("Setting Get Fail!");
    return false;
  }
};

export const create__invoice__Request__API = async (postBody) => {
  let URL = BaseURL + "/create-invoice";

  try {
    const result = await axios.post(URL, postBody, { withCredentials: true });
    if (result.status === 200) {
      if (result.data["status"] === "success") {
        SuccessToast("Invoice Create Success!");
        return true;
      } else {
        ErrorToast("Invoice Create Fail!-1");
        return false;
      }
    } else {
      ErrorToast("Invoice Create Fail!-2");
      return false;
    }
  } catch (err) {
    ErrorToast("Invoice Create Fail!");
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
        ErrorToast("Invoice Get Fail!-1");
        return false;
      }
    } else {
      ErrorToast("Invoice Get Fail!-2");
      return false;
    }
  } catch (err) {
    ErrorToast("Invoice Get Fail!");
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
        ErrorToast("Invoice Get Fail!-1");
        return false;
      }
    } else {
      ErrorToast("Setting Get Fail!-2");
      return false;
    }
  } catch (err) {
    ErrorToast("Setting Get Fail!");
    return false;
  }
};

export const invoice_single_delete__Request__API = async (id) => {
  let URL = BaseURL + `/delete_single/${id}`;

  try {
    const result = await axios.delete(URL, { withCredentials: true });
    if (result.status === 200) {
      if (result.data["status"] === "success") {
        SuccessToast("Delete Success!");
        return true;
      } else {
        ErrorToast("Delete Fail!-1");
        return false;
      }
    } else {
      ErrorToast("Delete Fail!-2");
      return false;
    }
  } catch (err) {
    ErrorToast("Delete Fail!");
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
        SuccessToast("Update Success!");
        return true;
      } else {
        ErrorToast("Update Fail!-1");
        return false;
      }
    } else {
      ErrorToast("Update Fail!-2");
      return false;
    }
  } catch (err) {
    ErrorToast("Update Fail!");
    return false;
  }
};
