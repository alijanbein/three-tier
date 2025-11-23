import React, { useContext, useEffect, useState } from "react";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  validate,
} from "../../utils/validators";
import UseHttp from "../../hooks/http-hook";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";
import Input from "../../components/Input";

const AddTask = () => {
  const [isLogginMode, setIsLoginMode] = useState(true);
  const [isProcced, setIsProcced] = useState(false);
  const navigator = useNavigate();
  const auth = useContext(AuthContext);
  const [data, setData] = useState({
    title: {
      value: "",
      isValid: false,
    },
    due_date: {
      value: "",
      isValid: false,
    },
    amount: {
      value: "",
      isValid: false,
    },
  });
  const [isLoading, error, sendRequest] = UseHttp();
  const toggleLoginMode = () => {
    setIsLoginMode(!isLogginMode);
  };

  const submitHandler = async (e) => {
    setIsProcced(true);
    console.log(data);
    e.preventDefault();
    if (data.title.isValid && data.due_date.isValid && data.amount.isValid) {
      const userData = {
        title: data.title.value,
        due_date: data.due_date.value,
        amount: data.amount.value,
      };
      const requestData = await sendRequest("user/add_task", "POST", userData, {
        "content-type": "application/json",
        "authorization" : "Bearer "+ auth.token
      });
      console.log(requestData);
      navigator('/');
    }
  };
  return (
    <div className="container">
      <form onSubmit={submitHandler} className="form">
        <h2 className="title">Add Task</h2>
        <div>
          <Input
            label="Title"
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
            type="number"
            placeholder="amount"
          />
        </div>

        <div className="btn">
          <button className=" btn--form" type="submit">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
