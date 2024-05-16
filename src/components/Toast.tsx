import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

interface ToastError {
  messageError: string;
}

export default function Toast({ messageError }: ToastError) {
  function notify(message: string) {
    return toast.error(message, {
      position: "top-center",
      className: "toastify-error-msg",
    });
  }

  useEffect(() => {
    function clearMessage() {
      notify(messageError);
    }
    clearMessage();
  }, [messageError]);
  return (
    <div>
      <ToastContainer autoClose={1200} />
    </div>
  );
}
