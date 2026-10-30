@ui
Feature: Demo shop UI

  @smoke
  Scenario: Login and view products
    Given I open the demo shop
    When I log in with valid credentials
    Then I should see the product list

  Scenario: Add a product to the cart
    Given I am logged in to the demo shop
    When I add the first product to the cart
    And I open the cart
    Then the cart should contain one product