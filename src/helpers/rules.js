
function email (value, text) {
  return /^(([a-zA-Z0-9][-_.]{0,1}){0,63})([^\W_])+@([a-zA-Z0-9]{1,63})(\.[a-zA-Z0-9]{2,63})+$/i.test(value) || (text || "Formato de email inválido")
}

function cpf (value, text) {
  if (/^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2})$/i.test(value)) {
    let digitosIguais = 1

    for (let i = 0; i < value.length - 1; i++) {
      if (value.charAt(i) !== value.charAt(i + 1)) {
        digitosIguais = 0
        break
      }
    }

    if (!digitosIguais) {
      let Break, Soma, Resto

      Soma = 0
      for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(value.substring(i - 1, i)) * (11 - i)

      Resto = (Soma * 10) % 11
      if ((Resto === 10) || (Resto === 11)) Resto = 0
      if (Resto !== parseInt(value.substring(9, 10))) Break = true

      Soma = 0
      for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(value.substring(i - 1, i)) * (12 - i)

      Resto = (Soma * 10) % 11
      if ((Resto === 10) || (Resto === 11)) Resto = 0
      if (Resto !== parseInt(value.substring(10, 11))) Break = true

      return !Break || (text || "CPF inválido")
    } else {
      return text || "CPF inválido"
    }
  } else {
    return text || "CPF inválido"
  }
}

function phone (value, text) {
  if (/^(0?\(?[0-9]{2}\)?[0-9]{5}-?[0-9]{4})$/i.test(value)) {
    let Break
    let digitosIguais = 1

    for (let i = 3; i < value.length - 1; i++) {
      if (value.charAt(i) !== value.charAt(i + 1)) {
        digitosIguais = 0
        break
      }
    }

    if (!digitosIguais) {
      if (value.charAt(2) !== "9") Break = text || "Digite um número de Celular"

      return !Break || (text || "Telefone inválido")
    } else {
      return text || "Telefone inválido"
    }
  } else {
    return text || "Telefone inválido"
  }
}

module.exports = {
  cpf, 
  email, 
  phone
}