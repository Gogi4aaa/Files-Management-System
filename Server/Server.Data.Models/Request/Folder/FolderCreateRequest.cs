namespace Server.Data.Models.Request.Folder
{
	public class FolderCreateRequest
	{
		public string Name { get; set; } = null!;

		public Guid? ParentId { get; set; }//TODO: could be Parent Folder Id
	}
}
