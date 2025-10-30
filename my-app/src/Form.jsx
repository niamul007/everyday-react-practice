import React from "react";
export function Form() {
    function signUp(formData) {
        const email = formData.get("email");
        const name = formData.get("name");
        console.log({ email, name });
    } 
    return (
        <form action={signUp} >
            <input type="text" placeholder="Name" name="name" />
            <input type="email" placeholder="Email" name="email" />
            <button type="submit">Submit</button>
        </form>
    )
}