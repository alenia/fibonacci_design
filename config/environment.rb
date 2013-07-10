# Load the rails application
require File.expand_path('../application', __FILE__)

Mime::Type.register "image/svg+xml", :svg
# Initialize the rails application
FibonacciDesign::Application.initialize!
