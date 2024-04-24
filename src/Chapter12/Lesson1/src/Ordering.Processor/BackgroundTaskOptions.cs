public sealed class BackgroundTaskOptions
{
    /// <summary>
    /// Gets or sets the grace period in seconds.
    /// </summary>
    public int GracePeriodTime { get; set; }

    /// <summary>
    /// Gets or sets the checkup time in seconds.
    /// </summary>
    public int CheckUpdateTime { get; set; }
}