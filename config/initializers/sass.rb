module Sass::Script::Functions
  module Fibonacci
    def fibonacci(i)
      Sass::Script::Number.new(fib(i.value))
    end

    private

    def fib(i)
      return 0 if i <= 0
      return 1 if i == 1
      fib(i-1) + fib(i-2)
    end
  end

  include Fibonacci
end

