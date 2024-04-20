// @ts-nocheck
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.util";

import { useState, useContext } from "react";
import { UserContext } from "@/contexts/user.context";

const defaultFormField = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormField);
  const { displayName, email, password, confirmPassword } = formFields;

  const { setCurrentUser } = useContext(UserContext);

  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const resetFormFields = () => {
      setFormFields(defaultFormField);
    };

    if (password !== confirmPassword) {
      alert("Password & confirm Password Must Be Same");
      return;
    }

    try {
      const user = await createAuthUserWithEmailAndPassword(email, password);
      console.log(user);

      await createUserDocumentFromAuth(user.user, {
        displayName,
      });

      toast({
        title: `Account Successfully Created, ${displayName}`,
      });

      setCurrentUser(user.user);

      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast({
          variant: "destructive",
          title: `Cannot Create Account, Email Already Exist Try SignIn`,
        });
        // alert("Cannot Create User, Email Alredy Used Try Sign IN");
      }
      console.log("User Creation encountered an error " + error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="w-fit">
      <h1 className="mb-5">Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <Input
          type="text"
          required
          name="displayName"
          value={displayName}
          onChange={handleChange}
        />
        <label>Email</label>
        <Input
          type="email"
          required
          name="email"
          value={email}
          onChange={handleChange}
        />
        <label>Password</label>
        <Input
          type="password"
          required
          name="password"
          value={password}
          onChange={handleChange}
        />
        <label>Confirm Password</label>
        <Input
          type="password"
          required
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
        />
        <Button className="mt-4" type="submit">
          Sign Up
        </Button>
      </form>
      <Toaster />
    </div>
  );
};

export default SignUp;
