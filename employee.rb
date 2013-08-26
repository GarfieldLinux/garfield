require 'rubygems'
require 'data_mapper'

class Employee
include DataMapper::Resource
property :id , Serial 
property :employee_id , Integer
property :name, String
property :department_id, Integer
end

DataMapper.finalize

get '/employees' do
  Log("access employee  page ")
  @employees = Employee.all
  slim :employees
end

get '/employees/new' do
  protected!
  halt(401,'Not Authorized') unless session[:admin]
  @employee = Employee.new
  slim :new_employee
end

get '/employees/:id' do
  @employee = find_employee
  slim :show_employee
end

 get '/employees/:id/edit' do
   @employee = find_employee
   slim :edit_employee
 end

post '/employees' do
flash[:notice] = "Employee  successfully added" if create_employee
redirect to("/employees/#{@employee.id}")
end

put '/employees/:id' do
protected!
employee = find_employee
if employee.update(params[:employee])
flash[:notice] = "employee successfully updated"
end
redirect to("/employees/#{employee.id}")
end

delete '/employees/:id' do
if find_employee.destroy
flash[:notice] = "Employee deleted"
end
redirect to('/employees')
end

module EmployeeHelpers
  def find_employees 
    @employees = Employee.all
  end
  def find_employee 
    Employee.first(:employee_id=>params[:id])
  end
  def create_employee
    @employee = Employee.create(params[:employee])
  end
end

helpers EmployeeHelpers


