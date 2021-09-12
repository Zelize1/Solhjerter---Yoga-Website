import React from 'react';
import { useForm } from 'react-hook-form';
import Heading from "../layout/Heading";
import SignupOptions from "./SignupOptions";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  name: yup.string().required().min(3).max(40),
  email: yup.string().email().required(),
});

export default function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <>

    <Heading title="Meld deg på nå!" />

    <form onSubmit={handleSubmit(onSubmit)} className="form-row">
      <select {...register("Velg kurs", { required: true })} className="form-control">
      <SignupOptions />
      </select>
      <input type="text" name="name" placeholder="Fullt navn" className="form-control"{...register("navn")} />
      {errors.name && <span>Fyll inn navnet ditt</span>}
      <input type="text" name="email" placeholder="Email" className="form-control"{...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
      {errors.email && <span>Fyll inn eposten din</span>}
      <button variant="primary" type="submit" className="button" size="lg" block>
                Send inn
            </button>
    </form>
    </>
  );
}