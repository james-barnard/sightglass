require 'test_helper'

class TestRunControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get test_run_index_url
    assert_response :success
  end

  test "should get show" do
    get test_run_show_url
    assert_response :success
  end

end
