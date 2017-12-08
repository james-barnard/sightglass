class AppController < ApplicationController
  def index
    @components = Component.order("id")
  end
end