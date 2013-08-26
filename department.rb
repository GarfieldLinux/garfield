require 'rubygems'
require 'data_mapper'

class Department
include DataMapper::Resource
property :id , Serial 
property :department_id, Integer 
property :name, String
property :manager, String
end
DataMapper.finalize 


get '/departments' do
  Log("access department  page ")
  @departments = Department.all
  slim :departments
end


get '/departments/new' do
  protected!
  halt(401,'Not Authorized') unless session[:admin]
  @department = Department.new
  slim :new_department
end

post '/departments' do
flash[:notice] = "Department  successfully added" if create_department
redirect to("/departments/#{@department.id}")
end

get '/departments/:id' do
  @department = find_department
  slim :show_department
end

 get '/departments/:id/edit' do
   @department = find_department
   slim :edit_department
 end

put '/departments/:id' do
protected!
department = find_department
if department.update(params[:department])
flash[:notice] = "department successfully updated"
end
redirect to("/departments/#{department.id}")
end


delete '/departments/:id' do
if find_department.destroy
flash[:notice] = "Department deleted"
end
redirect to('/departments')
end




module DepartmentHelpers
  def find_departments 
    @departments = Department.all
  end
  def find_department 
    #Department.get(params[:id])
     Department.first(:department_id=>params[:id])  
end
  def create_department
    @department = Department.create(params[:department])
  end
end

helpers DepartmentHelpers





