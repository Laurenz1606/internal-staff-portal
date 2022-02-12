import React, { useContext, useState } from "react";
import { authContext } from "../Auth";

export default function Login() {
  const { login } = useContext(authContext);

  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");

  async function onLogin() {
    const { code, err, nav } = await login({
      login: loginValue,
      password: password,
    });

    if (err) {
      return console.log(code);
    }

    return nav();
  }

  return (
    <div>
      <input
        placeholder="Benutzername oder E-Mail"
        onChange={(e) => setLoginValue(e.target.value)}
        value={loginValue}
      />
      <input
        placeholder="Passwort"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={onLogin}>Login!</button>
    </div>
  );
}
