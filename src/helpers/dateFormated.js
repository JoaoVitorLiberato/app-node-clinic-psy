const date = new Date()
const formattedDate = date.toLocaleString('pt-BR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
})

module.exports = {
  formattedDate
}
