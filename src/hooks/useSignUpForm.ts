import {
  signUpSchema,
  type signUpSchemaType,
} from "@/lib/validations/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const useSignUpForm = () => {
  const form = useForm<signUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  return {
    form,
  };
};

export default useSignUpForm;
