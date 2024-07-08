namespace Server.Data.Models.Database
{
	using System.ComponentModel.DataAnnotations;
	using System.ComponentModel.DataAnnotations.Schema;

	public class File
	{
		[Key]
		public Guid Id { get; set; }

		public string Name { get; set; } = null!;

		public string Extension { get; set; } = null!;

		public Guid? FolderId { get; set; }

		[ForeignKey(nameof(FolderId))]
		public Folder Folder { get; set; } = null!;
		
	}
}
