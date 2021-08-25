const Page = require("./page");

class PayPage extends Page {
  get tabPurchaseForeignCurrency() {
    return $("//*[@id='tabs']/ul/li[3]/a");
  }

  get dropdownCurrency() {
    return $("#pc_currency");
  }

  get labelSellingRate() {
    return $("#sp_sell_rate");
  }

  get inputAmount() {
    return $("#pc_amount");
  }

  get radioUSD() {
    return $("#pc_inDollars_true");
  }

  get labelConversionAmount() {
    return $("#pc_conversion_amount");
  }

  get buttonCalculateCosts() {
    return $("#pc_calculate_costs");
  }

  async openPurchaseForeignCurrencyTab() {
    await this.tabPurchaseForeignCurrency.click();
  }

  async selectCurrencyType(currencyType) {
    const currency = await this.dropdownCurrency;
    await currency.selectByAttribute("value", currencyType);
  }

  async setAmount(usdAmount) {
    await this.inputAmount.setValue(usdAmount);
    await this.setUSD();
    await this.buttonCalculateCosts.click();
  }

  async setUSD() {
    await this.radioUSD.click();
  }

  open() {
    return super.open("bank/pay-bills.html");
  }
}

module.exports = new PayPage();
