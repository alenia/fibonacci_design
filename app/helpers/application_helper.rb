module ApplicationHelper
  def fib(n)
    return 0 if n < 1
    return 1 if n == 1
    fib(n-1) + fib(n-2)
  end

  def spiral_offset(mod,maxfib)
    to_return = (1..maxfib-1).select{|i| i%4 == mod}.inject(0) {|sum,k| sum + fib(k)}
    #not sure why, but I need to add this 1.
    mod == 0 ? to_return + 1 : to_return
  end

  def view_box_offset(fib_count)
    [spiral_offset((fib_count+2)%4,fib_count),spiral_offset((fib_count+1)%4,fib_count)]
  end

  def font_location(fib_count)
    case fib_count
    when 1,2
      [-0.05,0.3]
    when 3
      [-0.25,-0.35]
    when 4
      [0.55,-0]
    when 5
      [0,0.5]
    when 6
      [-0.7,0.6]
    when 10
      [-3,0.5]
    when 11
      [-4,1]
    when 13
      [-15,0]
    when 15
      [-55,0]
    else
      [0,0]
    end
  end
end
