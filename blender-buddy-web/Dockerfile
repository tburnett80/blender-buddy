#This is my SDK Dev build container, it will compile my source via a build script

FROM microsoft/dotnet

WORKDIR /app

ENV ASPNETCORE_URLS http://*:8080

#Copy the source
COPY / /app

#build the core api app
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash - && apt-get install -y nodejs && dotnet restore && dotnet publish /app/ -c Release -o out && cp -a /app/out/. /app/ && rm -rf out



#Set the entrypoint that will start the app.
ENTRYPOINT ["dotnet", "blender-buddy-web.dll"]
