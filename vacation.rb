require 'rubygems'
require 'data_mapper'

# If you want the logs displayed you have to do this before the call to setup
#   DataMapper::Logger.new($stdout, :debug)

# A Postgres connection:
DataMapper.setup(:default, 'postgres://jiafei:jiafei@10.110.162.153/garfielddb')

class Vacation
include DataMapper::Resource
property :id, Serial 
property :employee_id, Integer
property :start_time, Date
property :end_time, Date
property :reason, Text
property :status, Integer


def end_time=date
  super Date.strptime(date, '%m/%d/%Y')
end

def start_time=date
  super Date.strptime(date, '%m/%d/%Y')
end

end
DataMapper.finalize

get '/vacations' do
  find_vacations
  slim :vacations
end


get '/vacations/json' do
  str='{"page":1,"total":239,"rows":[{"id":"jake","cell":["jakeiiiiiiiiiiiiiiiiiiiii","1/8/2013","3/8/2013","some reason","old"]}]}'   
  str


end


get '/vacations/new' do
  protected!
  halt(401,'Not Authorized') unless session[:admin]
  @vacation = Vacation.new
  slim :new_vacation
end


get '/vacations/:id' do
  @vacation = find_vacation
  slim :show_vacation
end

get '/vacations/:id/edit' do
  @vacation = find_vacation
  slim :edit_vacation
end



post '/vacations' do
flash[:notice] = "Vacation successfully added" if create_vacation
redirect to("/vacations/#{@vacation.id}")
end


put '/vacations/:id' do
protected!
vacation = find_vacation
if vacation.update(params[:vacation])
flash[:notice] = "Vacation successfully updated"
end
redirect to("/vacations/#{vacation.id}")
end

delete '/vacations/:id' do
if find_vacation.destroy 
flash[:notice] = "Vacation deleted"
end
redirect to('/vacations')
end


module VacationHelpers
  def find_vacations 
    @vacations = Vacation.all
  end
  def find_vacation 
    Vacation.get(params[:id])
  end
  def create_vacation
    @vacation = Vacation.create(params[:vacation])
		  end
end

helpers VacationHelpers




