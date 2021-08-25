const { Given, When, Then } = require("@cucumber/cucumber");

const LoginPage = require("../pageobjects/login.page");
const PayPage = require("../pageobjects/pay.page");

const pages = {
  login: LoginPage,
  pay: PayPage,
};

Given(/^I am in the Purchase Foreign Currency page$/, async () => {
  pages["login"].open();
  LoginPage.login("username", "password");
  await pages["pay"].open();
  await PayPage.openPurchaseForeignCurrencyTab();
});

Given(/^I select the currency type as "(.*)"$/, async (currencyType) => {
  const sellingRate = `1 dollar (${currencyType}) = `;
  await PayPage.selectCurrencyType(currencyType);
  await expect(PayPage.labelSellingRate).toHaveTextContaining(sellingRate);
});

When(
  /^I try to calculate the conversion cost for "(.*)" USD$/,
  async (usdAmount) => {
    await PayPage.setAmount(usdAmount);
  }
);

Then(
  /^I should see the conversion amount for "(.*)" USD to "(.*)"$/,
  async (usdAmount, currencyType) => {
    const conversionAmount = ` (${currencyType}) = ${usdAmount}.00 U.S. dollar (USD)`;
    await expect(PayPage.labelConversionAmount).toBeExisting();
    await expect(PayPage.labelConversionAmount).toHaveTextContaining(
      conversionAmount
    );
    pages["login"].close();
  }
);
