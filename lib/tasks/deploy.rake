
# To deploy, set SIGHTGLASS_DEPLOY environment variable to the target folder
# (usually ../sightglass_deploy) and run rake deploy from the root directory

directories = FileList['app', 'bin', 'config', 'db', 'public', 'Gemfile', 'Gemfile.lock', 'config.ru']

desc "Deploy"
task :deploy do
  Rake::Task[:build].invoke
  target = ENV['SIGHTGLASS_DEPLOY']
  directories.each do |dir|
    sh %{cp -a "#{dir}" "#{target}"}
  end
  puts "Sightglass was deployed to #{target}"
  sh %{ls -al "#{target}"}
end


desc "Build"
task :build do
  sh %{cd client && npm run build}
  sh %{cp -a client/build/* public}
  puts "Sightglass was built in client and copied to public"
end

desc "Copy Only"
task :copy do
  puts "Copying files to #{ENV['SIGHTGLASS_DEPLOY']}"
  target = ENV['SIGHTGLASS_DEPLOY']
  directories.each do |dir|
    sh %{cp -a "#{dir}" "#{target}"}
  end
  puts "Sightglass was deployed to #{target}"
  sh %{ls -al "#{target}"}
end