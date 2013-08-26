require 'rubygems'
require 'sinatra'

get '/hello' do
  "hello sinatra !";
end

get '/garfield' do
  name="GarfieldLinux"
  "Hello #{name}"
end

get '/:name' do
  name=params[:name]
  "Hi there #{name} !"
end

get '/:one/:two/:three' do
  "one: #{params[:one]} two:#{params[:two]} three:#{params[:three]}"
end


get '/what/time/is/it/in/:number/hours' do
  number=params[:number].to_i
  time=Time.now() + number * 3600
  "the time in #{number} hours will be #{time.strftime('%I:%M %P')}"
end



