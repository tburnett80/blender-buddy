//This will enable unit tests to moq internal types
#if DEBUG
using System.Runtime.CompilerServices;
[assembly: InternalsVisibleTo("core.bb.tests")]
[assembly: InternalsVisibleTo("DynamicProxyGenAssembly2")]
#endif