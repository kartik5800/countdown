import React, { useEffect, useRef, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useHistory } from "react-router-dom";
import logout from '../image/logout.png'
import './CountDown.css'

const Demo = () => {
  const [count, setCount] = useState(); // seconds
  const [hour, setHour] = useState(0);
  // const [day, setDay] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [isStop, setIsStop] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const inputRef = useRef(null);
  const history = useHistory();
  const handleClick = () => {
    console.log(inputRef.current.value);
    setCount(inputRef.current.value);
    setIsCounting(true);
    inputRef.current.value = '';
  };

  const secondsToTime = (secs) => {
    var hours = Math.floor(secs / (60 * 60));
    // var days = Math.floor(hours / 24 );
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
    return {
      // d: days,
      h: hours,
      m: minutes,
      s: seconds,
    };
  };

  useEffect(() => {
    if (isCounting === true) {
      if (count >= 0) {
        const secondsLeft = setInterval(() => {
          setCount((c) => c - 1);
          let timeLeftVar = secondsToTime(count);
          // setDay(timeLeftVar.d)
          setHour(timeLeftVar.h);
          setMinute(timeLeftVar.m);
          setSecond(timeLeftVar.s);
        }, 1000);
        return () => clearInterval(secondsLeft);
      } else {
        console.log("time out");
      }
    }
  }, [count, isCounting]);

  const handleStart = () => {
    setIsCounting(true);
    handleClick();
  };

  const handleStop = () => {
    setIsCounting(false);
    setIsStop(true);
    setIsPaused(false)
  };

  const handleReset = () => {
    setIsCounting(false);
    setIsStop(false);
    setHour(0);
    setMinute(0);
    setSecond(0);
    setCount(0)
  };

  const handlePaused = () => {
    clearInterval(inputRef.current);
    setIsCounting(false);
    setIsStop(true);
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsCounting(true);
    setIsStop(false);
  };


  const handleLogout = () => {
    history.push('/')
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="ipadview">
            <div className="d-flex pos-rel">
              <div className="watchdata">
                <div className="d-flex">
                  <input
                    ref={inputRef}
                    type="number"
                    id="message"
                    name="message"
                    className=" form-control me-2 w-auto" 
                  />
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={handleClick}
                  >
                    Set Time
                  </button>
                </div>
                <h2
                  className={
                    isCounting
                      ? "text-success"
                      : isStop
                        ? !isPaused
                          ? "text-danger"
                          : "text-secondary"
                        : "text-primary"
                  }
                >
                 {/* {day < 9 ? "0" + day : day} :  */}
                 {hour < 9 ? "0"  +  hour  :  hour}  : 
                 {minute < 9 ? "0"  +  minute  :  minute}{" "} : 
                 {second < 9 ? "0"  +  second  :  second}
                
                </h2>
                <p> hours : minute : seconnd</p>
                <div>
                  {!isCounting && !isStop && (
                    <button onClick={handleStart} className="btn btn-success me-2">
                      Start
                    </button>
                  )}
                  {isCounting && (
                    <button onClick={handleStop} className="btn btn-danger me-2">
                      stop
                    </button>
                  )}

                  {isStop && isPaused && (
                    <button onClick={handleResume} className="btn btn-info me-2">
                      Resume
                    </button>
                  )}
                  {isCounting && !isStop && (
                    <button onClick={handlePaused} className="btn btn-warning me-2">
                      paused
                    </button>
                  )}
                  <button
                    onClick={handleReset}
                    className="btn btn-primary me-2"
                    disabled={!isCounting && !isStop}
                  >
                    Reset
                  </button>
                </div>
              </div>
              <div>
                <img src={logout} alt="logout"  className="logout" onClick={handleShow}/>
              </div>
            </div>
          </div>
        </div>


      </div>



      <Modal show={show} onHide={handleClose} animation={false} className='model'>
        <Modal.Header closeButton>
          <Modal.Title>Count_Down</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to Logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>



    </>
  );
};
export default Demo;