const id = localStorage.getItem("id");
const tid = localStorage.getItem("tid");
const uzb = localStorage.getItem("uzb");
const vsb = localStorage.getItem("vsb");

export const customUrl = () => {
  if (id) {
    return "lpu";
  } else if (tid) {
    return "ttb";
  } else if (vsb) {
    return "vssb";
  } else if (uzb) {
    return "moh";
  } else {
    return "moh";
  }
};
