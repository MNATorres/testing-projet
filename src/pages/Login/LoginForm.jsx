import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginFormSchema } from './schemas/login-form-schema';
import { Box, Typography } from '@mui/material';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import DisplayFormValues from './components/DisplayFormValues';
import { callEndpoint } from './services/call-endpoint';


export default function LoginForm() {
  const { register, handleSubmit, watch, formState: { errors, isDirty, isValid }, reset } = useForm({
    defaultValues: { userName: '', password: '' },
    mode: 'onChange',
    resolver: yupResolver(LoginFormSchema)
  })

  const userNameWatch = watch('username');
  const passwordWatch = watch('password');

  const onSubmit = async data => {
    const result = await callEndpoint(data);
    console.log(result);
    reset();
  }


  return (
    <>
      <FormProvider {... { register, errors }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            name='username'
            label='Nombre de usuario'
            required={true}
          />
          <CustomInput
            name='password'
            label='Contraseña'
            required={true}
          />
          <CustomButton isDirty={isDirty} isValid={isValid}>
            Iniciar Sesión
          </CustomButton>
        </form>
      </FormProvider>
      <DisplayFormValues isDirty={isDirty} isValid={isValid} values={{ username: userNameWatch, password: userNameWatch }} />
    </>
  )
}
