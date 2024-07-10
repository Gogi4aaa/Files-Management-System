namespace Server.Data.Models.Response
{
	using Server.Data.Models.Database;

	public class AllSubFoldersResponse
	{
		public AllSubFoldersResponse()
		{
			this.SubFolders = new List<Folder>();
		}
		public ICollection<Folder> SubFolders { get; set; }
	}
}
