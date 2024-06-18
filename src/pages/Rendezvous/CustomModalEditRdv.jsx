import React, { useState,useEffect } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { Col, Row } from "react-bootstrap";
import axios from 'axios';

export default function CustomModalEditRdv(props) {
    const { modalOpenEdit, setModalOpenEdit, rdv } = props;

    const [rendezvous,setRendezvous] = useState([]);
    
  useEffect(() => {
    setRendezvous(rdv);
  }, [rdv, modalOpenEdit]);

  const { daterendezvous, heurerendezvous, raison } = rendezvous;
  const onInputChange = (e) => {
    setRendezvous({ ...rendezvous, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    await axios
      .put(`http://localhost:8080/consultations/${rdv.id}`, rdv)
      .then((response) => {
        alert("Modification patient reussi");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };
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
      const closeModalEdit = () => {
        setModalOpenEdit(false);
        setRendezvous(rdv);
      };
  return (
    <div>
         <AnimatePresence>
        {modalOpenEdit && (
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
                onClick={() => closeModalEdit(false)}
                onKeyDown={() => setModalOpenEdit(false)}
                tabIndex={0}
                role="button"
                initial={{ top: 40, opacity: 0 }}
                animate={{ top: -10, opacity: 1 }}
                exit={{ top: 40, opacity: 0 }}
              >
                x
              </motion.div>
              <Row className="aligh-items-center">
                <br></br>
            
                  <form className="login" onSubmit={onSubmit}>
                    <div>
                      <br></br> <br></br>
                      <br></br>
                      <h3>Modification rendez-vous de  </h3>
                      <Row>
                        <Col size={12} sm={6} className="px-3">
                        <input
                          type="date"
                          name="daterendezvous"
                          value={daterendezvous}
                          onChange={(e) => onInputChange(e)}
                        />
                        </Col>
                        <Col size={12} sm={6} className="px-3">
                          <input
                            placeholder="Heure de rendez-vous"
                            name="heurerendezvous"
                            type="text"
                            value={heurerendezvous}
                            onChange={(e) => onInputChange(e)}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col size={12} sm={6} className="px-3">
                          <input
                            type="text"
                            value={raison}
                            onChange={(e) => onInputChange(e)}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Row>
                          <Col size={12} sm={2}></Col>
                          <Col size={12} sm={8}>
                            <button type="submit">Modifier</button>
                          </Col>
                        </Row>
                      </Row>
                    </div>
                  </form>
              </Row>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
