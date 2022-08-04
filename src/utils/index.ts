export const setTitle = (title: string) => window.document.title = title
export const generateId = () => Math.floor(Math.random() * (10000 - 1)) + 1
export const formValidate = (email: string, password: string): boolean => {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return Boolean(email.match(regexEmail)) && password.length > 7
}