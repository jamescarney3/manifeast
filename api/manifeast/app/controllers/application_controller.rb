class ApplicationController < ActionController::API

  def root
    render plain: 'hello world'
  end
end
