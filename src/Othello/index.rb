require 'debug'
require 'erubi'

src = Erubi::Engine.new(File.read("/app/src/Othello/index.html.erb")).src
File.open("/app/src/Othello/index.html", "w") do |file|
  file.puts eval(src)
end