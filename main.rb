require 'rubygems'
require 'sinatra'
require 'sinatra/base'
require 'slim'
require 'sass'
require 'sinatra/flash'
require 'v8'
require 'coffee-script'
require 'logger'
require 'net/ldap'
require 'active_directory_user'

require './vacation'
require './employee'
require './department'
require './sinatra/auth'


register Sinatra::Flash

get('/styles.css'){ scss :styles }
get('/javascripts/application.js'){ coffee :application }

configure do
  enable :sessions
  set :username, 'garfield'
  set :password, 'sinatra'
end

def Log(s = "#{$!.message} #{$@[0]} ")
 #判断需写入的日志内容是否为空，如果为空则不需要写入
 return if not s
 #判断需要创建的目录是否为空
 #isExistDir('./log')
 #创建logger实例
 logger = Logger.new("./log/"+(Time.now).strftime("%Y-%m-%d")+"_Vacation.log", 'daily') #daily/weekly/monthly.
 #logger output level is DEBUG  Logs and Terminal 
 logger.level = Logger::DEBUG
 p s
 logger.debug(''){s}
 logger.close
end  

def set_title
  @title ||= "A Simple Vacation Manager System "
end

def send_message
Pony.mail({
    :from => params[:name] + "<" + params[:email] + ">",
    :to => 'garfieldlinux@gmail.com',
    :subject => params[:name] + " has contacted you",
    :body => params[:message],
    :port => '587',
    :via => :smtp,
    :via_options => {
      :address               => 'smtp.gmail.com',
      :port                  => '587',
      :enable_starttls_auto  => true,
      :user_name             => 'garfieldlinux',
      :password              => 'mzlinux863554',
      :authentication        => :plain,
      :domain                => 'localhost.localdomain'
    }
})
end

before do
  set_title
end

get '/' do
  Log("to  log") 
  slim :home
end 

get '/about' do
  @title = "All About This Website from about"
  slim :about
end

get '/contact' do
  slim :contact
end

get '/set/:name' do
  session[:name] = params[:name]
end

get '/get/hello' do
  "Hello #{session[:name]}"
end

get '/login' do
slim :login
end

get '/logout' do
  session.clear
  session[:username] = nil
  redirect to('/login')
end

post '/contact' do
  send_message
  flash[:notice] = "Thank you for your message. We'll be in touch soon."
  redirect to('/')
end

post '/login' do
 # if params[:username] == settings.username && params[:password] == settings.password
 #   session[:admin] = true
 #   redirect to('/songs')
 # else
 #   slim :login
 # end
# AD  server 
user = ActiveDirectoryUser.authenticate(params[:username], params[:password]) #attempt to authenticate
if !user.nil? && user.member_of?
  flash[:notice] = "Login Successful"
  session[:username] = params[:username]
  redirect "/vacations"
else
  flash[:error] = "Login Failed"
  redirect "/login"
end

end

helpers do
  def css(*stylesheets)
    stylesheets.map do |stylesheet|
      "<link href=\"/#{stylesheet}.css\" media=\"screen, projection\" rel=\"stylesheet\" />"
    end.join
  end
  def current?(path='/')
    (request.path==path || request.path==path+'/') ? "current" : nil
  end

end

not_found do
  slim :not_found
end

