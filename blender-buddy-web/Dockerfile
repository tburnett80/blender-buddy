#This is my SDK Dev build container, it will compile my source via a build script

FROM microsoft/dotnet

WORKDIR /app

ENV ASPNETCORE_URLS http://*:8080

#Copy the source
COPY app/ /app

EXPOSE 8080

#Set the entrypoint that will start the app.
ENTRYPOINT ["dotnet", "blender-buddy-web.dll"]
