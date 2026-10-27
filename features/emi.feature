@ui
Feature: EMI calculator dashboard
  Scenario: Dashboard loads and renders initial repayment details
    Given the user opens the EMI dashboard
    Then the dashboard heading should be visible
    And the repayment chart should contain positive principal and interest data

  Scenario Outline: EMI independently matches the amortization formula
    Given the user opens the EMI dashboard
    When the user calculates a loan of <amount> at <rate> percent over <years> years
    Then the displayed EMI should match the independently computed amount within 1 rupee
    And the repayment chart should contain positive principal and interest data
    Examples:
      | amount  | rate | years |
      | 2500000 | 10   | 10    |
      | 5000000 | 7.5  | 15    |
      | 1000000 | 12   | 5     |
