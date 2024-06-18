import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../../assets/style/CustomModalView.css";
import PatientDetails from "./PatientDetails";
import ConsultationPatient from "./ConsultationPatient";
import OrdonnancePatient from "./OrdonnancePatient";

function CustomModalViewPatient(props) {
  const { modalOpenView, setModalOpenView, user } = props;
  const [slide, setSlide] = useState(1);
  const [consultation, setConsultation] = useState(0);

  const dropin = {
    hidden: {
      opacity: 0,
      transform: "scale(0.9)",
    },
    visible: {
      transform: "scale(1)",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      transform: "scale(0.9)",
      opacity: 0,
    },
  };

  const [users, setUsers] = useState([]);

  const closeModal = () => {
    setModalOpenView(false);
    setUsers(user);
  };

  const goToNextSlide = () => {
    setSlide(slide + 1);
  };

  const goToPreviousSlide = () => {
    setSlide(slide - 1);
  };

  return (
    <div>
      <AnimatePresence>
        {modalOpenView && (
          <motion.div
            className="wrapperm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="containerModal"
              variants={dropin}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                className="closeButton"
                onClick={() => closeModal()}
                onKeyDown={() => setModalOpenView(false)}
                tabIndex={0}
                role="button"
                initial={{ top: 40, opacity: 0 }}
                animate={{ top: -10, opacity: 1 }}
                exit={{ top: 40, opacity: 0 }}
              >
                x
              </motion.div>
              {slide === 1 ? (
                <PatientDetails onNext={goToNextSlide} user={user} />
              ) : slide === 2 ? (
                <ConsultationPatient
                  onNext={goToNextSlide}
                  onPrevious={goToPreviousSlide}
                  user={user}
                  setConsultationId={setConsultation}
                />
              ) : (
                <OrdonnancePatient onPrevious={goToPreviousSlide} user={user} consultation={consultation} />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CustomModalViewPatient;
