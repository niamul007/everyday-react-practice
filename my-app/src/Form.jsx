import React from "react";
export function Form() {
  function signUp(formData) {
    const email = formData.get("email");
    const name = formData.get("name");
    const description = formData.get("description");
    const status = formData.get("status");
    const diet = formData.getAll("diet");   
    const color = formData.get("color");    
    console.log({ email, name, description, status, diet ,color});
  }
  return (
    <form action={signUp}>
      <input type="text" placeholder="Name" name="name" />
      <input type="email" placeholder="Email" name="email" />
      <textarea name="description"></textarea>

      <label>
        <input
          type="radio"
          name="status"
          value="Morning"
          defaultChecked={true}
        />
        Morning
      </label>
      <label>
        <input type="radio" name="status" value="Afternoon" />
        Afternoon
      </label>
      <label>
        <input type="radio" name="status" value="Night" />
        Night
      </label>

      <label>
        <input
          type="checkbox"
          name="diet"
          value="chicken"
          defaultChecked={true}
        />
        chicken
      </label>
      <label>
        <input type="checkbox" name="diet" value="Rice" />
        Rice
      </label>
      <label>
        <input type="checkbox" name="diet" value="Meat" />
        Meat
      </label>

      <select name="color" id="">
        <option value="" disabled>--Select Color--</option>
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>  
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}
