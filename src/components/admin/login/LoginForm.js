import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { baseUrl, authUrl } from "../../../settings/constants/api";
import LoginError from "./LoginError";
import AuthContext from "../../../context/AuthContext";
import { useHistory } from "react-router-dom";

const url = baseUrl + authUrl;

const schema = yup.object().shape({
    identifier: yup.string().required("Fyll inn ditt brukernavn"),
    password: yup.string().required("Fyll inn ditt passord"),
});

export default function LoginForm() {
    const [submitting, setSubmitting] = useState(false);
    const [loginError, setLoginError] = useState(null);
    
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const history = useHistory();
    const [, setAuth] = useContext(AuthContext);
    
    async function onSubmit(data) {
        setSubmitting(true);
        setLoginError(null);

        console.log(data);

        try {
            const response = await axios.post(url, data);
            console.log(response.data);
            setAuth(response.data);
            history.push("/admin-page")
        } catch (error) {
            console.log("error", error);
            setLoginError(error.toString());
        } finally {
            setSubmitting(false);

        }
    }

    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        {loginError && <LoginError>{loginError}</LoginError>}
        <fieldset disabled={submitting} className="login-fieldset">
            <div>
            <input name="identifier" type="text" placeholder="Ditt brukernavn" className="login-input" {...register("identifier")} /> 
            {errors.identifier && <span>Fyll inn brukernavnet ditt</span>}
            </div>

            <div>
            <input name="password" type="password" placeholder="Ditt passord" className="login-input" {...register("password")} />
            {errors.password && <span>Fyll inn passordet ditt</span>}
            </div>
            <button className="button" type="submit" size="lg" block>
                {submitting ? "Logger inn..." : "Logg inn"}
            </button>
        </fieldset>
        </form>
        </>
    );
}