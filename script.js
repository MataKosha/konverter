document.addEventListener("DOMContentLoaded", () => {
  const apiUrl =
    "https://v6.exchangerate-api.com/v6/a699453142d0db9b0a3e0ed1/latest/";
  const amountInput = document.getElementById("amount");
  const fromCurrency = document.getElementById("fromCurrency");
  const toCurrency = document.getElementById("toCurrency");
  const result = document.getElementById("result");
  const convertButton = document.getElementById("convert");

  convertButton.addEventListener("click", async () => {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount) || amount <= 0) {
      result.textContent = "Введите корректную сумму";
      return;
    }

    try {
      const response = await fetch(`${apiUrl}${from}`);
      const data = await response.json();
      if (data.result === "success") {
        const rate = data.conversion_rates[to];
        const convertedAmount = (amount * rate).toFixed(2);
        result.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
      } else {
        result.textContent = "Ошибка при получении данных";
      }
    } catch (error) {
      result.textContent = "Ошибка при запросе к API";
    }
  });
});
