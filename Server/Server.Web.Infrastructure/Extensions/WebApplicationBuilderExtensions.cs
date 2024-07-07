namespace Server.Web.Infrastructure.Extensions
{
	using Microsoft.AspNetCore.Builder;
	using Microsoft.EntityFrameworkCore;
	using Microsoft.Extensions.DependencyInjection;
	using Server.Data.Models.Database;
	using Sever.Data;
	using System.Reflection;
	using static Common.GeneralConstants.UserRoles;

	public static class WebApplicationBuilderExtensions
	{
		/// <summary>
		/// This method registers all services with their interfaces and implementations of given assembly.
		/// The assembly is taken from the type of random service interface or implementation provided.
		/// </summary>
		/// <param name="serviceType"></param>
		/// <exception cref="InvalidOperationException"></exception>
		public static void AddApplicationServices(this IServiceCollection services, Type serviceType)
		{
			Assembly? serviceAssembly = Assembly.GetAssembly(serviceType);
			if (serviceAssembly == null)
			{
				throw new InvalidOperationException("Invalid service type provided!");
			}

			Type[] implementationTypes = serviceAssembly
				.GetTypes()
				.Where(t => t.Name.EndsWith("Service") && !t.IsInterface)
				.ToArray();
			foreach (Type implementationType in implementationTypes)
			{
				Type? interfaceType = implementationType
					.GetInterface($"I{implementationType.Name}");
				if (interfaceType == null)
				{
					throw new InvalidOperationException(
						$"No interface is provided for the service with name: {implementationType.Name}");
				}

				services.AddScoped(interfaceType, implementationType);
			}
		}
		//Seed User Role
		public static IApplicationBuilder SeedUserRole(this IApplicationBuilder app)
		{
			using IServiceScope scopedServices = app.ApplicationServices.CreateScope();

			IServiceProvider serviceProvider = scopedServices.ServiceProvider;

			FilesSystemDbContext dbContext = serviceProvider.GetService<FilesSystemDbContext>()!;

			Task.Run(async () =>
			{
				if (await dbContext.Roles.AnyAsync(x => x.Name == UserRoleName))
				{
					return;
				}

				Role role = new Role()
				{
					Id = Guid.NewGuid(),
					Name = "User",
				};

				await dbContext.Roles.AddAsync(role);
				await dbContext.SaveChangesAsync();

			})
				.GetAwaiter()
				.GetResult();

			return app;
		}
	}
}
