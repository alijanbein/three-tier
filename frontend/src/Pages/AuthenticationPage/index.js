import React, { useContext, useEffect, useState } from "react";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  validate,
} from "../../utils/validators";
import UseHttp from "../../hooks/http-hook"
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";
import Input from "../../components/Input";
const AuthPage = () => {
  const [isLogginMode, setIsLoginMode] = useState(true);
  const [isProcced, setIsProcced] = useState(false);
  const navigator = useNavigate();
  const auth = useContext(AuthContext);
  const [data, setData] = useState({
    username: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false,
    },
    rePassword: {
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
    e.preventDefault();
    if (!isLogginMode) {
      if (
        data.username.isValid &&
        data.password.isValid &&
        data.password.value == data.rePassword.value
      ) {
        const userData = {
          username : data.username.value,
          password : data.password.value,
          re_password : data.rePassword.value,
        }
        const requestData = await sendRequest(
          "auth/register",
          "POST",
          userData,
          {
            "content-type": "application/json"
          }
        );
        console.log(requestData);
        window.location.reload();

      }
    } else {
      if (data.username.isValid && data.password.isValid) {
        const userData = {
          username : data.username.value,
          password : data.password.value,
        }
        const requestData = await sendRequest(
          "auth/login",
          "POST",
          userData,{
            "content-type": "application/json"
          }
        );
        if (requestData.status == "sucess") {
          auth.login(requestData.token, requestData.user.username);
          navigator("/");
        }
        else {
          window.location.reload()
        }
      }
    }
  };
  return (
    <div className="container">

      <form onSubmit={submitHandler} className="form">
      <h2 className="title">{isLogginMode ? "Log in" : "Register"}</h2>
        <div>
          <Input
            label="Username"
            isValid={data.username.isValid}
            isProcced={isProcced}
            onChange={(e) => {
              setIsProcced(false);

              setData({
                ...data,
                username: {
                  value: e.target.value,
                  isValid: validate(e.target.value, VALIDATOR_REQUIRE()),
                },
              });
            }}
            id="Username"
            type="text"
            placeholder="Enter your Username"
          />
        </div>
        <div>
          <Input
            label="Password"
            isValid={data.password.isValid}
            isProcced={isProcced}
            onChange={(e) => {
              setIsProcced(false);
              setData({
                ...data,
                password: {
                  value: e.target.value,
                  isValid: validate(e.target.value, VALIDATOR_MINLENGTH(6)),
                },
              });
            }}
            id="password"
            type="password"
            placeholder="password"
          />
        </div>
        {!isLogginMode && (
          <div>
            <Input
              label="Confirm Password"
              isValid={data.rePassword.isValid}
              isProcced={isProcced}
              onChange={(e) => {
                setIsProcced(false);

                setData({
                  ...data,
                  rePassword: {
                    value: e.target.value,
                    isValid: validate(e.target.value, VALIDATOR_REQUIRE),
                  },
                });
              }}
              id="Re-password"
              type="password"
              placeholder="Please Confirm Your Password"
            />
          </div>
        )}

       <div className="btn">
       <button className=" btn--form" type="submit">
          {isLogginMode ? "Log in" : "Register"}
        </button>
       </div>
        {!isLogginMode && (
          <p className="switch-text">
            Already have an acount?{" "}
            <span onClick={toggleLoginMode} className="switch">
              Login
            </span>
          </p>
        )}
        {isLogginMode && (
          <p className="switch-text">
            Don't have an acount?{" "}
            <span onClick={toggleLoginMode} className="switch">
              Create acount
            </span>
          </p>
        )}
      </form>
    </div>
  );
}

export default AuthPage