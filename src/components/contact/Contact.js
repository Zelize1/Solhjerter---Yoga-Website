import Heading from "../layout/Heading";
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    name: yup.string().required().min(3).max(40),
    email: yup.string().email().required(),
    subject: yup.string().required().min(3).max(30),
    message: yup.string().required().min(10).max(300),

  });

export default function Contact() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      });
  const onSubmit = data => console.log(data);
  console.log(errors);

    return (
        <>

        <div className="split-wrapper">
            <div className="left-container">
            <Heading title="Lurer du på noe? Ta kontakt!" />
            <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
      <input type="text" name="name" placeholder="Ditt navn" className="form-control" {...register("Ditt navn", {required: true, min: 3, maxLength: 40})} />
      {errors.name && <span>Fyll inn navnet ditt</span>}
      <input type="text" name="email" placeholder="Din epost" className="form-control"{...register("Din epost", {required: true, pattern: /^\S+@\S+$/i})} />
      {errors.email && <span>Fyll inn eposten din</span>}
      <input type="text" name="subject" placeholder="Emne" className="form-control" {...register("Emne", {required: true, min: 10, maxLength: 80})} />
      {errors.subject && <span>Fyll inn et emne</span>}
      <textarea className="form-control" name="message" placeholder="Meldingen din..." {...register("message", {required: true, maxLength: 350})} />
      {errors.message && <span>Fyll inn meldingen din</span>}

      <button className="button" type="submit" size="lg" block>
                Send inn
            </button>
    </form>
            </div>
            <div className="right-container">
            <Heading title="Hvor finner du oss?" />
            
            <div className="contact-directions-container">
            <p className="contact-directions">
            Skarmokkvegen 662, 9030 Sjursnses

            Veibeskrivelse: 
            Nordover ut fra Tromsø mot Nordkjosbotn. På Fagernes ta til venstre mot Breivikeidet og ned til Sjursnes
            gjennom Nakkedalen.
            </p>
            
            <iframe className="contact-maps" title="sjursnes" loading="lazy" allowFullScreen src="https://www.google.com/maps/embed/v1/search?q=Sjursnes&key=AIzaSyDpSenFvkglwJKPpgittKgOIk2F8pJN3LE">
            </iframe>
            </div>
            </div>
        </div>

        </>
    )
}