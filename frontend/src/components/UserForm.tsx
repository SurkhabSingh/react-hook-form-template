import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

import { z } from "zod";
const schema = z.object({
  name: z.string().min(5, { message: "Name must have atleast 5 characters." }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters long." }),
  phone: z
    .string()
    .min(10, { message: "Enter a valid phone number." })
    .max(10, { message: "Enter a valid phone number." }),
});

type FormFields = z.infer<typeof schema>;

const UseForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (!data) {
      return;
    }

    const result = await axios.post("http://localhost:5000/create-post", data);
    console.log(result);
  };

  return (
    <div>
      <h1 className="flex text-slate-300 text-3xl justify-center m-4">
        Registration Form
      </h1>

      <form className="tutorial gap-2" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", {
            required: "Name should not be empty",
          })}
          type="text"
          placeholder="Enter name"
        />
        {errors.name && (
          <div className="text-red-500">{errors.name.message}</div>
        )}
        <input {...register("email")} type="email" placeholder="Enter email" />
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}

        <input
          {...register("phone")}
          type="number"
          placeholder="Enter phone number"
        />
        {errors.phone && (
          <div className="text-red-500">{errors.phone.message}</div>
        )}
        <input
          {...register("password")}
          type="password"
          placeholder="Enter password"
        />
        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default UseForm;
