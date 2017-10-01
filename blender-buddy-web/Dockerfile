#This is my SDK Dev build container, it will compile my source via a build script

FROM microsoft/dotnet

WORKDIR /app

#install nodejs
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash - && apt-get install -y nodejs

ENV ASPNETCORE_URLS http://*:8081
#ENV ASPNETCORE_ENVIRONMENT Development

#Copy the source
COPY app/ /app

EXPOSE 8081

#Set the entrypoint that will start the app.
ENTRYPOINT ["dotnet", "blender-buddy-web.dll"]
