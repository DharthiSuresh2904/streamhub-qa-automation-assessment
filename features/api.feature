@api
Feature: JSONPlaceholder POST boundary exploration
  Scenario Outline: Probe invalid POST inputs without server-side failure
    When I send JSONPlaceholder a POST with the <case> payload
    Then I record the HTTP status and check the response is not a server error
    Examples:
      | case             |
      | excessively long |
      | special chars    |
      | missing userId   |
