@ui @intentional-failure
Feature: Deliberately broken selectors for AI self-healing demonstration
  Scenario: Broken submit control locator
    Given the user opens the EMI dashboard
    Then the deliberately outdated submit selector should fail
  Scenario: Broken EMI result locator
    Given the user opens the EMI dashboard
    Then the deliberately outdated result selector should fail
  Scenario: Broken chart locator
    Given the user opens the EMI dashboard
    Then the deliberately outdated chart selector should fail
