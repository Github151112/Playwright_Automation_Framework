@api
Feature: Public API testing

  @smoke
  Scenario: Get an existing post
    When I request post 1
    Then API status should be 200
    And the response should have a title and user ID

  Scenario: Chain create, update and delete requests
    When I create a post titled "qa-assignment"
    Then API status should be 201
    When I update the created post title to "updated-qa-assignment"
    Then API status should be 200
    And the response title should be "updated-qa-assignment"
    When I delete the created post
    Then API status should be 200