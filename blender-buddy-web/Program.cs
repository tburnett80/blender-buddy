using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace blender_buddy_web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var config = new ConfigurationBuilder()
                .AddCommandLine(args)
                .Build();

            BuildWebHost(args, config).Run();
        }

        public static IWebHost BuildWebHost(string[] args, IConfigurationRoot cfg) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                //.UseKestrel()
                .UseConfiguration(cfg)
                .Build();
    }
}
