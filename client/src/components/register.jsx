export default function Register() {
  return (
    <>
      <h1>Register</h1>
      <form action="" method="POST">
        <input type="text" placeholder="Username" name="username"></input>
        <input type="password" placeholder="Password" name="password"></input>
        <input type="password" placeholder="Confirm password" name="password-2"></input>
        <input type="submit" value="Register"></input>
      </form>
    </>
  );
}
