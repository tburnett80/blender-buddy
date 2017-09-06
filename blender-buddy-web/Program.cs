using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

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
                .UseKestrel()
                .UseStartup<Startup>()
                .UseConfiguration(cfg)
                .Build();
    }
}
