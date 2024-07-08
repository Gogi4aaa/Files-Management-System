namespace Sever.Data
{
	using Microsoft.EntityFrameworkCore;
	using Server.Data.Models.Database;

	public class FilesSystemDbContext : DbContext
	{
		public FilesSystemDbContext(DbContextOptions<FilesSystemDbContext> options) 
			: base(options)
		{

		}
		public DbSet<User> Users { get; set; } = null!;

		public DbSet<Role> Roles { get; set; } = null!;

		public DbSet<Claim> Claims { get; set; } = null!;

		public DbSet<RoleClaim> RoleClaims { get; set; } = null!;

		public DbSet<Folder> Folders { get; set; } = null!;

		public DbSet<File> Files { get; set; } = null!;
	}
}
