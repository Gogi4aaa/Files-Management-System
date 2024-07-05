namespace Server.Data.Models.Database
{
	using System.ComponentModel.DataAnnotations.Schema;
	using System.ComponentModel.DataAnnotations;

	public class User
	{
		public User()
		{
			this.Id = new Guid();
		}

		[Key]
		public Guid Id { get; set; }

		[Required]
		public string FirstName { get; set; } = null!;

		[Required]
		public string LastName { get; set; } = null!;

		[Required]
		public string Username { get; set; } = null!;

		[Required]
		public string Email { get; set; } = null!;

		[Required]
		public string Password { get; set; } = null!;

		[ForeignKey(nameof(Role))]
		public Guid RoleId { get; set; }
		public Role Role { get; set; }
	}
}
