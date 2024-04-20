// @ts-nocheck
import { useState, useContext } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { signInAuthWithEmailAndPassword } from "../../utils/firebase/firebase.util";
import { useToast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";

import { UserContext } from "../../contexts/user.context";
import { FirebaseError } from "firebase/app";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const { setCurrentUser } = useContext(UserContext);

  const { toast } = useToast();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(formFields);

    try {
      const response = await signInAuthWithEmailAndPassword(email, password);
      //Successfully Toaster

      //UserContext
      setCurrentUser(response?.user);

      toast({
        title: "Successfully Logged In 😄",
      });
    } catch (error) {
      if ((error as FirebaseError).code === "auth/invalid-credential") {
        toast({
          variant: "destructive",
          title: "Please Check You Credentials",
        });
      }
      console.log(error);
    }

    resetFormFields();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="w-fit">
      <h1 className="mb-2 font-semibold text-3xl">Alredy Have An Account</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <Input
          type="text"
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
        <Button type="submit" className="mt-4">
          Sign In
        </Button>
      </form>

      <Toaster />
    </div>
  );
};

export default SignInForm;
