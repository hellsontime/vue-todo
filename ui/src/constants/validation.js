const validation = {
  name: {
    rule: /^[a-zA-Z]{2,32}$/,
    message: "Name must contain only letters",
  },
  email: {
    rule: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
    message: "Email is invalid",
  },
  password: {
    rule: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    message:
      "Password must include minimum 8 characters, at least one letter and one number",
  },
};

export default validation;
