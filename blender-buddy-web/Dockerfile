#This is my SDK Dev build container, it will compile my source via a build script

FROM microsoft/dotnet

WORKDIR /app

ENV ASPNETCORE_URLS http://*:8080

#Copy the source
COPY / /app

#build the core api app
RUN dotnet restore && dotnet publish /app/ -c Release -o out && cp -a /app/out/. /app/ && rm -rf out

#Set the entrypoint that will start the app.
ENTRYPOINT ["dotnet", "blender-buddy-web.dll"]
