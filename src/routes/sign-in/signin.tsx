// @ts-nocheck
import { Button } from "@/components/ui/button";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.util";
import SignUp from "@/components/signup/signup";
import SignInForm from "@/components/signin/signin";

const SignIn = () => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response.user);
    await createUserDocumentFromAuth(response.user);
  };

  return (
    <div className="flex justify-evenly mt-20">
      <div>
        <SignInForm />
        <Button
          className="mt-5 bg-blue-600 text-white "
          onClick={logGoogleUser}
        >
          Sign In With Google
        </Button>
      </div>
      <div className="items-center justify-center">
        <h1 className="mb-2 font-semibold text-3xl">
          I do not have an account
        </h1>
        <SignUp />
      </div>
    </div>
  );
};

export default SignIn;
