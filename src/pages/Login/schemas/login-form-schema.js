import * as yup from "yup";

export const LoginFormSchema = Yup.objet({
  username: yup
    .string()
    .required("Username es requerido")
    .max(12, "Username no puede tener mas de 12 caracteres"),
  password: yup
    .string()
    .required("Password es requerido")
    .max(12, "Password no puede tener mas de 12 caracteres")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password debe tener al menos una mayuscula, una minuscula, un numero y un caracter especial"
    ).required()
});
