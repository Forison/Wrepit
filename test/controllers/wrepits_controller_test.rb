# frozen_string_literal: true

require 'test_helper'

class WrepitsControllerTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    get wrepits_index_url
    assert_response :success
  end
end
