const currencyFormat = (num, text) => {
  return num ? '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : text ? text : 'Agrega un precio'
}

export default currencyFormat;