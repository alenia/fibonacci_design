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
end
