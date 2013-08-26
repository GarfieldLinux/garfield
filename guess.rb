#!/usr/bin/ruby -w
#
# 脚本名: guess.rb
# 版本号: 1.0
# 描述: 一个猜数字的游戏，尽快猜中Ta
#

##### 自定义类 #####

# 定义代表控制台的类
class Screen
def cls
puts "\n" * 35 # 屏幕滚动至25行
puts "\a" # 响铃，提醒
end

def pause
STDIN.gets # 用户输入字符串回车后结束
end
end

# 定义Ruby猜谜游戏的类
class Game
# 显示游戏开始的页面
def display_greeting
Console_Screen.cls
print "\t\t 欢迎Ruby猜数字游戏！" + "\n\n\n\n\n\n\n\n按回车继续."
Console_Screen.pause
end

# 显示游戏操作方法
def display_instructions
Console_Screen.cls
puts "指令:\n\n"
puts "这个游戏随机产生1到100的数，你应该尽快地猜中Ta。"
puts "每次尝试之后，游戏会分析你的输入并给出建议。"
puts "祝你好运！\n\n\n\n\n"
print "按回车继续."
Console_Screen.pause
end

# 产生游戏所需的数字
	def generate_number
randomNo = 1 + rand(100)
	end

# 游戏控制
	def play_game
	number = generate_number

	loop do
	Console_Screen.cls

	print "\n请输入:"

	reply = STDIN.gets
	reply.chop!
	reply = reply.to_i # 输入的字符串转成整数

	redo if reply < 0 or reply > 100

	if reply == number
	Console_Screen.cls
	print "恭喜你，猜中了！回车继续."
	Console_Screen.pause
	break
	elsif reply < number
	Console_Screen.cls
	print "太小了！回车继续."
	Console_Screen.pause
	elsif reply > number
	Console_Screen.cls
	print "太大了！回车继续."
	Console_Screen.pause
	end
	end
	end

# 关于这个游戏
	def display_credits
	Console_Screen.cls

	puts "\t\t感谢玩这个游戏.\n\n\n"
	puts "\n\t\t由jyfeather开发.\n"
	puts "\t\t网址:http://www.yanjin.info\n\n\n"
	end
	end

##### 实例化脚本对象 #####

	Console_Screen = Screen.new # 实例化Screen对象
	SQ = Game.new # 实例化Game对象

	SQ.display_greeting # 执行Game的display_greeting方法
	answer = "" # 全局变量，用以控制循环

# 无限循环，直到玩家输入'y'或'n'为止
	loop do
	Console_Screen.cls
	print "准备好开始玩游戏了吗?(y/n):"
	answer = STDIN.gets
	answer.chop! # 去掉最后的回车符
	break if answer == 'y' or answer == 'n'
	end

# 分析用户的输入
	if answer == 'n'
	Console_Screen.cls
	puts "换个时间再来玩哟！\n\n"
	else
	SQ.display_instructions # 显示游戏玩法

	loop do
	SQ.play_game
	Console_Screen.cls
	print "再玩一局？(y/n):"
		playAgain = STDIN.gets
		playAgain.chop!
		break if playAgain == 'n'
		end
		SQ.display_credits # 显示游戏信息

		end
