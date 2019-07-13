export interface TweetModel {
  url?: String;
  user?: {
    name?: String;
    profile_background_color?: String;
    profile_image_url_https?: String;
    profile_image_url?: String;
  };
  screen_name?: String;
  text: String;
  timestamp_ms?: String;
  lang?: String;
}
