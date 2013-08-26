#打印字符串信息
puts "Hello World" 


#获取键盘输入
print("Please input your name:")  
name = gets()  
puts "hello #{name}".upcase


#基本数字运算以及变量取值
puts("#{1*2+3}")
#def 定义函数
def saysomething  
   puts("Hello")  
end  
  
#invoke  
saysomething


#函数定义+传参数
def saysomething(name)  
 puts("Hello #{name}")  
end  
  
#invoke  
saysomething("Ivan")  


#
