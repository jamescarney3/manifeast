class Api::V1::EventsController < Api::V1::ApplicationController
  def create
    # instantiate an event (Event.build) with:
      # user id for current user
      # name from params or default string like "start date - end date Event"
      # start date from params
      # end date from params
    # save event
    # render event json
  end
end
