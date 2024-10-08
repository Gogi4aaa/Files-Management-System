﻿namespace Server.Data.Models.Database
{
	using System.ComponentModel.DataAnnotations;
	using System.ComponentModel.DataAnnotations.Schema;

	public class Folder
	{
		public Folder()
		{
			this.Files = new HashSet<File>();
			this.Folders = new HashSet<Folder>();
		}

		[Key]
		public Guid Id { get; set; }

		public Guid? ParentId { get; set; }

		public string Name { get; set; } = null!;

		public string PhysicalName { get; set; } = null!;

		public ICollection<Folder> Folders { get; set; }
		public ICollection<File> Files { get; set; }

		public Folder? Parent { get; set; }
	}
}
