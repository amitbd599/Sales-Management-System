import toast from "react-hot-toast";
let EmailRegx = /\S+@\S+\.\S+/;

class FormHelper {
  IsEmpty(value) {
    return value.length === 0;
  }

  IsEmail(value) {
    return !EmailRegx.test(value);
  }
  ErrorToast(msg) {
    toast.error(msg);
  }
  SuccessToast(msg) {
    toast.success(msg);
  }
  toNumber(value) {
    return parseFloat(value);
  }

  fixNumber(value) {
    if (value > 0) {
      return value;
    } else {
      return 0;
    }
  }
  getBase64(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  }
}
export const {
  IsEmpty,
  IsEmail,
  ErrorToast,
  SuccessToast,
  getBase64,
  toNumber,
  fixNumber,
} = new FormHelper();
