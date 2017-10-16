FROM reg.timburnett.io/node-dncore/base

WORKDIR /app

ENV ASPNETCORE_URLS http://*:8081

COPY app/ /app

EXPOSE 8081

ENTRYPOINT ["dotnet", "blender-buddy-web.dll"]
