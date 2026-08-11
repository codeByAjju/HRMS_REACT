import { useEffect } from "react";
import Swal from "sweetalert2";

function SweetAlert({ show, setIsAlertVisible, title, text, icon, timer }) {
  useEffect(() => {
    if (!show) return;

    Swal.fire({
      title,
      text,
      icon,
      timer,
    }).then(() => {
      setIsAlertVisible(false);
    });
  }, [icon, setIsAlertVisible, show, text, timer, title]);

  return null;
}

export default SweetAlert;
