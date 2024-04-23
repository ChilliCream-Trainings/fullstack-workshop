namespace Lesson2.Types;

public class NewsStory
{
    public string Id { get; set; }
    public string Title { get; set; }
    public string Body { get; set; }
    public User Author { get; set; }
    public DateTime Date { get; set; }
    public Picture Image { get; set; }
    public List<string> Tags { get; set; }
    public int Likes { get; set; }
    public int Dislikes { get; set; }
    public int Shares { get; set; }
    public int Bookmarks { get; set; }
    public int Views { get; set; }
    public bool IsPublished { get; set; }
    public bool IsFeatured { get; set; }
    public bool IsBreaking { get; set; }
    public bool IsSponsored { get; set; }
    public bool IsTrending { get; set; }
    public bool IsPopular { get; set; }
    public bool IsRecommended { get; set; }
    public bool IsSaved { get; set; }
    public bool IsLiked { get; set; }
    public bool IsDisliked { get; set; }
    public bool IsShared { get; set; }
    public bool IsBookmarked { get; set; }
    public bool IsViewed { get; set; }
    public List<Comment> Comments { get; set; }
}
