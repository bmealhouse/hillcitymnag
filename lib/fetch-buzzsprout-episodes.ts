export async function fetchBuzzsproutEpisodes(): Promise<BuzzsproutEpisode[]> {
  return fetch(
    `https://www.buzzsprout.com/api/${process.env.HCAG_BUZZSPROUT_PODCAST_ID}/episodes.json`,
    {
      headers: {
        Authorization: `Token token=${process.env.HCAG_BUZZSPROUT_API_KEY}`,
      },
    }
  ).then((response) => response.json());
}

export type BuzzsproutEpisode = {
  id: number;
  title: string;
  audio_url: string;
  artwork_url: string;
  description: string;
  summary: string;
  artist: string;
  tags: string;
  published_at: string;
  duration: number | null;
  hq: boolean;
  magic_mastering: boolean;
  guid: string;
  inactive_at: string | null;
  custom_url: string;
  episode_number: null;
  season_number: null;
  episode_type: string;
  explicit: boolean;
  private: boolean;
  total_plays: number;
};
