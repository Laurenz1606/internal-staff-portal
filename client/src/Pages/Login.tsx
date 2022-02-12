import React, { FormEvent, useContext, useState } from "react";
import { authContext, getErrorMessage, getInputMode } from "../Auth";
import Button from "../Components/Simple/Button";
import Divider from "../Components/Simple/Divider";
import Input from "../Components/Simple/Input";
import StyledLink from "../Components/Simple/StyledLink";
import LoginLayout from "../Layouts/Login";

export default function Login() {
  const { login } = useContext(authContext);

  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<number>();

  async function onLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { code, err, nav } = await login({
      login: loginValue,
      password: password,
    });

    if (err) {
      return setError(code);
    }

    return nav();
  }

  return (
    <LoginLayout heading="Anmelden!">
      <form onSubmit={onLogin} className="space-y-6">
        <Input
          value={loginValue}
          setValue={setLoginValue}
          id="login"
          placeHolder="E-Mail oder Benutzername"
          label="E-Mail oder Benutzername"
          required
          mode={getInputMode([21, 22, 23, 24], error)}
          info={getErrorMessage([21, 22, 23, 24], error)}
        />
        <Input
          value={password}
          setValue={setPassword}
          id="password"
          placeHolder="Passwort"
          label="Passwort"
          required
          mode={getInputMode([21, 22, 23, 24], error)}
          info={getErrorMessage([21, 22, 23, 24], error)}
          type="password"
        />
        <Button type="submit" stretch>
          Anmelden!
        </Button>
        <Divider text="ODER" />
        <div>
          <StyledLink to="/password">Passwort Vergessen?</StyledLink>
        </div>
      </form>
    </LoginLayout>
  );
}
