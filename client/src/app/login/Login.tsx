"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (
      formData.email.trim().length < 1 ||
      formData.password.trim().length < 1
    ) {
      if (
        formData.email.trim().length < 1 &&
        formData.password.trim().length < 1
      ) {
        setFormError({
          email: "Email is required",
          password: "Password is required",
        });
      } else if (formError.email.trim().length < 1) {
        setFormError({
          email: "Email is required",
          password: "",
        });
      } else {
        setFormError({
          email: "Password is required",
          password: "",
        });
      }
      return;
    }
    fetch(
      "https://av7exfnoz1.execute-api.us-east-1.amazonaws.com/dev/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      }
    );
  }

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState<FormData>({
    email: "",
    password: "",
  });

  const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };

  return (
    <div className="border shadow-md">
      <form
        onSubmit={onSubmit}
        className="space-y-8 flex flex-col justify-center items-center "
      >
        <div className="flex flex-col min-h-screen gap-2 items-center justify-center ">
          <div className="bg-white shadow-md p-5 flex flex-col gap-3">
            <Input
              placeholder="Email"
              value={formData.email}
              onChange={emailHandler}
            />
            {formError.email && (
              <p className="text-red-400">{formError.email}</p>
            )}
            <Input
              placeholder="Password"
              value={formData.password}
              onChange={passwordHandler}
            />
            {formError.password && (
              <p className="text-red-400">{formError.password}</p>
            )}
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
