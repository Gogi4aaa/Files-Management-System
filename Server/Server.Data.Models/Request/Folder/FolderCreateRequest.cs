namespace Server.Data.Models.Request.Folder
{
	public class FolderCreateRequest
	{
		public string Name { get; set; } = null!;

		public string? ParentFolderName { get; set; }//TODO: could be Parent Folder Id
	}
}
