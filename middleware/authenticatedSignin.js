export default function (params) {
  const token = params.store.getters['auth/jwtDecoded'] || null

  if (token && token.exp > Date.now() / 1000) {
    return params.redirect('/dashboard')
  }
}
