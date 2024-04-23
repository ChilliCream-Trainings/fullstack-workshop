namespace Lesson2.Types;

public class Comment
{
    public string Id { get; set; }
    public string Body { get; set; }
    public User Author { get; set; }
    public DateTime Date { get; set; }
    public int Likes { get; set; }
    public int Dislikes { get; set; }
    public bool IsLiked { get; set; }
    public bool IsDisliked { get; set; }
}