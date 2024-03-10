import { useState } from "react";

type Props = {
    title: string;
    isSignUp?: boolean,
    onSubmit: (login: string, password: string) => void,
    onFlip: () => void;
};

export default function AuthCard({ title, isSignUp, onSubmit, onFlip }: Props) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const reset = () => {
        setLogin("")
        setPassword("")
        setRepeatPassword("")
    }
    const submit = (e: React.MouseEvent) => {
        e.preventDefault();
        onSubmit(login, password)
        reset();
    }
    const flip = (e: React.MouseEvent) => {
        e.preventDefault();
        onFlip();
        reset();
    }
    return <>
        <section className="card card-body flex-initial bg-base-100 shadow-xl">
            <h3 className="app-title-3 text-center mb-3">{title}</h3>
            <input type="text" className="input mb-3" placeholder="Логин" value={login} onChange={e => setLogin(e.target.value)}/>
            <input placeholder="Пароль" className="input mb-3" value={password} onChange={e => setPassword(e.target.value)} type="password" />
            {isSignUp && <input className="input mb-3" placeholder="Повторить пароль" value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} type="password" />}
            <div className="flex items-center">
                <button className="btn btn-primary" onClick={submit}>{isSignUp ? 'Зарегистрироваться' : 'Войти'}</button>
                <button className="btn btn-link"  onClick={flip}>{isSignUp ? 'Логин' : 'Регистрация'}</button>
            </div>
        </section>
    </>
}