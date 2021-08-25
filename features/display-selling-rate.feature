Feature: Purchase foreign currency

#As a user, I want to purchase foreign currencies to be able to take local money with me when I travel

  Scenario Outline: Displaying the current selling rate

    Given I am in the Purchase Foreign Currency page
    And I select the currency type as "<currencyType>" 
    When I try to calculate the conversion cost for "<usdAmount>" USD 
    Then I should see the conversion amount for "<usdAmount>" USD to "<currencyType>" 

    Examples:
    | currencyType  | usdAmount | 
    | AUD           | 100       | 
    | CAD           | 50        | 
    | HKD           | 100       | 
