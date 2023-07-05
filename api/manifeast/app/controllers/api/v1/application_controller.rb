class Api::V1::ApplicationController < ApplicationController
  def index
    render plain: 'hello world from v1 api'
  end
end
