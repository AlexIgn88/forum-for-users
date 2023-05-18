import { useContext } from "react";
import DataContext from "../dataContext.js";

export default function Registration() {
    const { user } = useContext(DataContext);
    if (!user) return <form method="post" className='bg-blue-100 flex items-center flex-col gap-3 p-3'>
        <label>Name<input name="username" /></label>
        <label>Realname<input name="realname" /></label>
        <label>Password<input name="psw" type="password" /></label>
        <input type="hidden" name="action" value="registration" />
        <input type="submit" value="registration" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
    </form>
}