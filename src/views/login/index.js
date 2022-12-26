export const validationPassword = password => {
  if (!password) {
    return { status: true, message: 'password harus di isi' }
  } else if (password.length > 20) {
    return { status: true, message: 'password tidak boleh lebih dari 20 karakter' }
  } else if (password.length < 8) {
    return { status: true, message: 'password tidak boleh kurang dari 8 karakter' }
  } else {
    return { status: false, message: null }
  }
}
