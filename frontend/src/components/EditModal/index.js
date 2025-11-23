import React, { useContext, useEffect, useState } from "react";
import {
    VALIDATOR_MIN,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  validate,
} from "../../utils/validators";
import UseHttp from "../../hooks/http-hook";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";
import Input from "../../components/Input";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const EditModal = (props) => {
    const [isLogginMode, setIsLoginMode] = useState(true);
    const [isProcced, setIsProcced] = useState(false);
    const navigator = useNavigate();
    const auth = useContext(AuthContext);
    const [data, setData] = useState({
      title: {
        value: props.data.title,
        isValid:  validate(props.data.title, VALIDATOR_REQUIRE()),
      },
      due_date: {
        value: props.data.due_date,
        isValid: validate(props.data.due_date, VALIDATOR_REQUIRE())
      },
      amount: {
        value: props.data.amount,
        isValid: validate(props.data.amount, VALIDATOR_MIN(100)),
      },
    });
    const [isLoading, error, sendRequest] = UseHttp();
  
  
    const submitHandler = async (e) => {
      setIsProcced(true);
      e.preventDefault();
      if (data.title.isValid && data.due_date.isValid && data.amount.isValid) {
        const userData = {
          title: data.title.value,
          due_date: data.due_date.value,
          amount: data.amount.value,
        };
        const requestData = await sendRequest(`user/update_task/${props.data._id}`, "PUT", userData, {
          "content-type": "application/json",
          "authorization" : "Bearer "+ auth.token
        });
        if(requestData.status == "sucess"){
            window.location.reload()
        }
    }
    };
    return (
      <div className="container edit_modal">
        <form onSubmit={submitHandler} className="form">
            <div className="close">
            <FontAwesomeIcon icon={faTimes} onClick={props.onClose} />
 </div>
          <h2 className="title">Edit Task</h2>
          <div>
            <Input
              label="Title"
              value={data.title.value}
              isValid={data.title.isValid}
              isProcced={isProcced}
              onChange={(e) => {
                setIsProcced(false);
  
                setData({
                  ...data,
                  title: {
                    value: e.target.value,
                    isValid: validate(e.target.value, VALIDATOR_REQUIRE()),
                  },
                });
              }}
              id="title"
              type="text"
              placeholder="Enter your Username"
            />
          </div>
          <div>
            <Input
              value={data.due_date.value}

              label="Due Date"
              isValid={data.due_date.isValid}
              isProcced={isProcced}
              onChange={(e) => {
                setIsProcced(false);
                setData({
                  ...data,
                  due_date: {
                    value: e.target.value,
                    isValid: validate(e.target.value, VALIDATOR_REQUIRE()),
                  },
                });
              }}
              id="due_date"
              type="text"
              placeholder="due date"
            />
          </div>
  
          <div>
            <Input
              value={data.amount.value}

              label="Amount"
              isValid={data.amount.isValid}
              isProcced={isProcced}
              onChange={(e) => {
                setIsProcced(false);
  
                setData({
                  ...data,
                  amount: {
                    value: e.target.value,
                    isValid: validate(e.target.value, VALIDATOR_REQUIRE),
                  },
                });
              }}
              id="amount"
              type="text"
              placeholder="amount"
            />
          </div>
  
          <div className="btn">
            <button className=" btn--form" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    );
}

export default EditModal