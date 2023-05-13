import { cleanup, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import LoginForm from "../pages/Login/LoginForm"
import React from 'react';
import { LoginFormMock, LoginFormMockError } from "../_mocks_/LoginForm.mock";
import axios from "axios";
import DisplayFormValues from "../pages/Login/components/DisplayFormValues";

jest.mock('axios');
jest.mock('../pages/Login/components/DisplayFormValues.jsx', () => ({
    __esModule: true,
    default: () => <div>Mocked DisplayFormValues</div>
}));

describe('LoginForm', () => {
    afterEach(cleanup);
    afterEach(jest.clearAllMocks);
    beforeEach(() => {
        axios.post.mockResolvedValue({data: LoginFormMock})
        render(<LoginForm />)
    });

    it('shoul two input exists at the screen', () => {
        const userNameInput = screen.getByRole('textbox', { name: /Nombre de usuario/i });
        const passwordInput = screen.getByRole('textbox', { name: /Contraseña/i });

        expect(userNameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();

        expect(userNameInput).toHaveValue('');
        expect(passwordInput).toHaveValue('');

    });

    it('should enable the submit button if the form values are valid', async () => {
        const userNameInput = screen.getByRole('textbox', { name: /Nombre de usuario/i });
        const passwordInput = screen.getByRole('textbox', { name: /Contraseña/i });
        const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });


        await userEvent.type(userNameInput, LoginFormMock.username)
        await userEvent.type(passwordInput, LoginFormMock.password)

        await waitFor(() => {
            expect(userNameInput).toHaveValue(LoginFormMock.username);
            expect(passwordInput).toHaveValue(LoginFormMock.password);
            expect(submitButton).not.toBeDisabled();

        });
    });

    it('should disabled the submit button if the form values are invalid', async () => {
        const userNameInput = screen.getByRole('textbox', { name: /Nombre de usuario/i });
        const passwordInput = screen.getByRole('textbox', { name: /Contraseña/i });
        const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });

        await userEvent.type(userNameInput, LoginFormMockError.username)
        await userEvent.type(passwordInput, LoginFormMockError.password)

        await waitFor(() => {
            expect(userNameInput).toHaveValue(LoginFormMockError.username);
            expect(passwordInput).toHaveValue(LoginFormMockError.password);
            expect(screen.getByText(/Username debe ser máximo de 12 caracteres/i)).toBeInTheDocument();
            expect(screen.getByText(/Password debe ser alfanumérico, y contener máximo 12 caracteres, una mayúscula y un caracter especial/i)).toBeInTheDocument();
            expect(submitButton).toBeDisabled();

        });

    });

    it('should call the onSubmit function when the submit button is clicked', async () => {
        const userNameInput = screen.getByRole('textbox', { name: /Nombre de usuario/i });
        const passwordInput = screen.getByRole('textbox', { name: /Contraseña/i });
        const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });


        await userEvent.type(userNameInput, LoginFormMock.username);
        await userEvent.type(passwordInput, LoginFormMock.password);

        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(submitButton).toBeDisabled();
            expect(axios.post).toHaveBeenCalledTimes(1);
        });

    });

    it('should mock DisplayFormValues', () => {
        expect(screen.getByText('Mocked DisplayFormValues')).toBeInTheDocument();
    });

});