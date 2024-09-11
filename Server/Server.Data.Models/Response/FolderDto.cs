namespace Server.Data.Models.Response
{
	public class FolderDto
	{
		public FolderDto()
		{
			this.Folders = new List<FolderDto>();
		}
		public Guid Id { get; set; }
		public string Name { get; set; }
		public string PhysicalName { get; set; }
		public ICollection<FolderDto> Folders { get; set; }
	}
}
