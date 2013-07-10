class PagesController < ApplicationController
  def spiral
    respond_to :html, :svg
  end
  def spiral_for_book
    respond_to :html, :svg
  end
end
